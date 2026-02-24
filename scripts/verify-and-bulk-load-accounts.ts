import { prisma } from "../src/config/prisma";
import fs from "fs";
import path from "path";

type ParsedAccount = { accountNumber: string; name: string; type: string };

async function parseAccountsFromFile(): Promise<ParsedAccount[]> {
  const candidates = [
    path.join(__dirname, "../prisma/data/nCompte.txt"),
    path.join(__dirname, "../prisma/data/nCompte"),
    path.join(__dirname, "../src/generated/prisma/models/nCompte"),
  ];

  const filePath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!filePath) return [];

  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split(/\r?\n/);
  const startIndex = lines.findIndex((line) =>
    line.toLowerCase().includes("liste des numero de compte comptable"),
  );

  const accounts: ParsedAccount[] = [];
  if (startIndex === -1) return accounts;

  for (let i = startIndex + 1; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line) continue;

    const cleaned = line.replace(/\*\*/g, "").replace(/\s{2,}/g, " ").trim();
    const candidate = cleaned.replace(/^[-�]\s*/, "");

    let match = candidate.match(/^(\d{2,6})\s*[-�]\s*(.+)$/);
    if (!match) {
      match = candidate.match(/^(\d{2,6})\s+(.+)$/);
    }

    if (!match) continue;

    const number = match[1];
    const name = match[2].trim();

    if (!number || !name) continue;
    if (name.startsWith("|")) continue;
    if (name.includes("FCFA")) continue;

    accounts.push({ accountNumber: number, name, type: "PARSED" });
  }

  return accounts;
}

function resolveAccountType(
  accountNumber: string,
): "ASSET" | "LIABILITY" | "EQUITY" | "REVENUE" | "EXPENSE" | "CONTINGENT" {
  switch (accountNumber.trim()[0]) {
    case "1":
      return "EQUITY";
    case "2":
    case "3":
    case "4":
    case "5":
      return "ASSET";
    case "6":
      return "EXPENSE";
    case "7":
      return "REVENUE";
    case "8":
      return "CONTINGENT";
    default:
      return "ASSET";
  }
}

function resolveAccountClass(accountNumber: string): number {
  const firstDigit = Number(accountNumber.trim()[0]);
  return Number.isFinite(firstDigit) ? firstDigit : 0;
}

async function main() {
  console.log("Verification et chargement des comptes...\n");

  const currentCount = await prisma.account.count();
  console.log(`Comptes actuels en BD: ${currentCount}`);

  const accountsFromFile = await parseAccountsFromFile();
  console.log(`Comptes dans le fichier: ${accountsFromFile.length}`);

  const existingNumbers = await prisma.account
    .findMany({ select: { accountNumber: true } })
    .then((accounts) => new Set(accounts.map((a) => a.accountNumber)));

  const missingAccounts = accountsFromFile.filter(
    (acc) => !existingNumbers.has(acc.accountNumber),
  );

  console.log(`\nComptes manquants: ${missingAccounts.length}`);

  if (missingAccounts.length === 0) {
    console.log("Tous les comptes existent deja.");
  } else {
    const data = missingAccounts.map((acc) => ({
      accountNumber: acc.accountNumber,
      name: acc.name,
      type: resolveAccountType(acc.accountNumber),
      accountClass: resolveAccountClass(acc.accountNumber),
      isActive: true,
    }));

    await prisma.account.createMany({ data, skipDuplicates: true });
    console.log(`${data.length} comptes crees (createMany).`);
  }

  const finalCount = await prisma.account.count();
  console.log(`\nTotal final: ${finalCount} comptes en BD`);
}

main()
  .catch((error) => {
    console.error("Erreur:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
