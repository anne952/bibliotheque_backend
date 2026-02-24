import { prisma } from "../src/config/prisma";

async function main() {
  console.log("📋 Génération du fichier de vérification des comptes...\n");

  // Récupérer TOUS les comptes
  const allAccounts = await prisma.account.findMany({
    select: { id: true, accountNumber: true, name: true, type: true },
    orderBy: { accountNumber: "asc" },
  });

  console.log(`✅ Trouvé ${allAccounts.length} comptes en BD`);

  // Créer un fichier JSON de vérification
  const verificationFile = {
    totalAccounts: allAccounts.length,
    timestamp: new Date().toISOString(),
    sample: allAccounts.slice(0, 50), // First 50
    byType: {
      ASSET: allAccounts.filter((a) => a.type === "ASSET").length,
      LIABILITY: allAccounts.filter((a) => a.type === "LIABILITY").length,
      EQUITY: allAccounts.filter((a) => a.type === "EQUITY").length,
      REVENUE: allAccounts.filter((a) => a.type === "REVENUE").length,
      EXPENSE: allAccounts.filter((a) => a.type === "EXPENSE").length,
      CONTINGENT: allAccounts.filter((a) => a.type === "CONTINGENT").length,
    },
  };

  // Écrire le fichier
  console.log("\n📊 Résumé par type:");
  console.log(`  ASSET: ${verificationFile.byType.ASSET}`);
  console.log(`  LIABILITY: ${verificationFile.byType.LIABILITY}`);
  console.log(`  EQUITY: ${verificationFile.byType.EQUITY}`);
  console.log(`  REVENUE: ${verificationFile.byType.REVENUE}`);
  console.log(`  EXPENSE: ${verificationFile.byType.EXPENSE}`);
  console.log(`  CONTINGENT: ${verificationFile.byType.CONTINGENT}`);

  // Tester une écriture avec plusieurs comptes
  console.log("\n🧪 Test - création d'une écriture avec comptes variés...");

  const fy = await prisma.fiscalYear.findFirst({
    where: { isClosed: false },
  });

  if (!fy) {
    console.log("❌ Pas d'exercice comptable actif");
    return;
  }

  // Prendre quelques comptes différents
  const accounts = [
    allAccounts.find((a) => a.type === "ASSET"),
    allAccounts.find((a) => a.type === "REVENUE"),
    allAccounts.find((a) => a.type === "EXPENSE"),
  ].filter((a): a is typeof allAccounts[number] => a !== undefined);

  if (accounts.length < 2) {
    console.log("❌ Pas assez de comptes");
    return;
  }

  const entry = await prisma.journalEntry.create({
    data: {
      entryNumber: `TEST-${Date.now()}`,
      fiscalYearId: fy.id,
      date: new Date(),
      journalType: "GENERAL",
      description: "Test de vérification en masse",
      lines: {
        create: [
          {
            accountId: accounts[0]!.id,
            debit: 1000,
            credit: 0,
            description: `Débit - ${accounts[0]!.name}`,
          },
          {
            accountId: accounts[1]!.id,
            debit: 0,
            credit: 1000,
            description: `Crédit - ${accounts[1]!.name}`,
          },
        ],
      },
    },
    include: { lines: true },
  });

  console.log(`✅ Écriture créée: ${entry.entryNumber}`);
  console.log(`   Comptes utilisés:`);
  entry.lines.forEach((line) => {
    const acc = accounts.find((a) => a.id === line.accountId);
    console.log(
      `   - ${acc?.accountNumber} (${line.debit || line.credit} ${line.debit ? "D" : "C"})`
    );
  });
}

main()
  .catch((error) => {
    console.error("❌ Erreur:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
