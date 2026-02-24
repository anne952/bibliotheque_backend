import { prisma } from "../src/config/prisma";
import fs from "fs";

async function main() {
  console.log("📦 Génération du fichier JSON avec tous les comptes...\n");

  const allAccounts = await prisma.account.findMany({
    select: { id: true, accountNumber: true, name: true, type: true },
    orderBy: { accountNumber: "asc" },
  });

  const accountsJson = {
    metadata: {
      total: allAccounts.length,
      timestamp: new Date().toISOString(),
      description:
        "Fichier combinant tous les comptes SYSCOHADA + comptes locaux",
    },
    accounts: allAccounts,
  };

  // Écrire le fichier
  const filePath = "scripts/accounts-verification.json";
  fs.writeFileSync(filePath, JSON.stringify(accountsJson, null, 2));

  console.log(`✅ Fichier ${filePath} créé avec ${allAccounts.length} comptes`);

  // Créer aussi un fichier de test d'écritures en masse
  const fy = await prisma.fiscalYear.findFirst({
    where: { isClosed: false },
  });

  if (!fy) {
    console.log("❌ Pas d'exercice comptable actif");
    return;
  }

  // Créer 5 écritures test avec des comptes variés
  const testEntries = [];

  // Groupe les comptes par type pour création d'écritures équilibrées
  const byType = {
    ASSET: allAccounts.filter((a) => a.type === "ASSET"),
    REVENUE: allAccounts.filter((a) => a.type === "REVENUE"),
    EXPENSE: allAccounts.filter((a) => a.type === "EXPENSE"),
  };

  for (let i = 0; i < 5; i++) {
    const assetAcc = byType.ASSET[i];
    const revenueAcc =
      byType.REVENUE[i % byType.REVENUE.length] ||
      byType.REVENUE[byType.REVENUE.length - 1];

    const testEntry = {
      entry: `Test-${i + 1}`,
      fiscalYearId: fy.id,
      date: new Date(2026, 1, 24).toISOString().split("T")[0],
      journalType: "GENERAL",
      description: `Écriture test ${i + 1}`,
      lines: [
        {
          account: assetAcc!.id,
          debit: 1000 * (i + 1),
          credit: 0,
          description: `${assetAcc!.accountNumber} - ${assetAcc!.name}`,
        },
        {
          account: revenueAcc!.id,
          debit: 0,
          credit: 1000 * (i + 1),
          description: `${revenueAcc!.accountNumber} - ${revenueAcc!.name}`,
        },
      ],
    };

    testEntries.push(testEntry);
  }

  const testFile = {
    metadata: {
      total: testEntries.length,
      timestamp: new Date().toISOString(),
      description: "Écritures comptables de test en masse",
    },
    entries: testEntries,
  };

  const testFilePath = "scripts/test-entries-bulk.json";
  fs.writeFileSync(testFilePath, JSON.stringify(testFile, null, 2));

  console.log(`✅ Fichier ${testFilePath} créé avec ${testEntries.length} écritures`);
  console.log("\n📋 Aperçu des écritures test:");
  testEntries.forEach((entry) => {
    console.log(`\n  ${entry.entry}: ${entry.description}`);
    entry.lines.forEach((line) => {
      const amount = line.debit || line.credit;
      const type = line.debit ? "D" : "C";
      console.log(`    - ${line.description} (${amount} ${type})`);
    });
  });
}

main()
  .catch((error) => {
    console.error("❌ Erreur:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
