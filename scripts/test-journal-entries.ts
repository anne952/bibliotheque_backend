import { prisma } from "../src/config/prisma";

async function testJournalEntries() {
  try {
    // 1. Récupérer un fiscal year
    const fiscalYear = await prisma.fiscalYear.findFirst({
      where: { isClosed: false },
    });

    if (!fiscalYear) {
      console.log("❌ Aucun exercice fiscal trouvé");
      process.exit(1);
    }

    console.log(`✅ Exercice fiscal: ${fiscalYear.name} (${fiscalYear.id})\n`);

    // 2. Créer une écriture avec accountNumber
    console.log("📝 Test 1: Création d'écriture avec accountNumber...");
    
    const createPayload = {
      fiscalYearId: fiscalYear.id,
      date: new Date().toISOString().slice(0, 10),
      journalType: "GENERAL",
      description: "Test avec accountNumber",
      lines: [
        { accountNumber: "57", debit: 5000, credit: 0, description: "Entrée caisse" },
        { accountNumber: "701", debit: 0, credit: 5000, description: "Vente" }
      ]
    };

    const created = await prisma.$transaction(async (tx) => {
      // Résoudre les comptes
      const resolvedLines = await Promise.all(
        createPayload.lines.map(async (line) => {
          const account = await tx.account.findFirst({
            where: { accountNumber: line.accountNumber, isActive: true },
          });
          if (!account) throw new Error(`Compte ${line.accountNumber} introuvable`);
          
          return {
            accountId: account.id,
            debit: line.debit,
            credit: line.credit,
            description: line.description,
          };
        })
      );

      const count = await tx.journalEntry.count({ where: { fiscalYearId: fiscalYear.id } });
      const entryNumber = `${fiscalYear.name}-${String(count + 1).padStart(5, "0")}`;

      return tx.journalEntry.create({
        data: {
          entryNumber,
          fiscalYearId: fiscalYear.id,
          date: new Date(createPayload.date),
          journalType: createPayload.journalType as any,
          description: createPayload.description,
          lines: {
            create: resolvedLines.map(l => ({
              ...l,
              debit: l.debit,
              credit: l.credit,
            })),
          },
        },
        include: { lines: { include: { account: true } } },
      });
    });

    console.log(`✅ Écriture créée: ${created.entryNumber}`);
    created.lines.forEach((line: any) => {
      console.log(`   - ${line.account.accountNumber} (${line.account.name}): D=${line.debit} C=${line.credit}`);
    });

    // 3. Modifier l'écriture
    console.log(`\n📝 Test 2: Modification avec accountNumber...`);
    
    const updated = await prisma.$transaction(async (tx) => {
      // Résoudre les nouveaux comptes
      const newLines = [
        { accountNumber: "57", debit: 3000, credit: 0, description: "Caisse (modifié)" },
        { accountNumber: "702", debit: 0, credit: 3000, description: "Dons financiers (modifié)" }
      ];

      const resolvedLines = await Promise.all(
        newLines.map(async (line) => {
          const account = await tx.account.findFirst({
            where: { accountNumber: line.accountNumber, isActive: true },
          });
          if (!account) throw new Error(`Compte ${line.accountNumber} introuvable`);
          
          return {
            accountId: account.id,
            debit: line.debit,
            credit: line.credit,
            description: line.description,
          };
        })
      );

      // Supprimer anciennes lignes et créer nouvelles
      await tx.journalLine.deleteMany({ where: { entryId: created.id } });

      return tx.journalEntry.update({
        where: { id: created.id },
        data: {
          description: "Test MODIFIÉ avec accountNumber",
          lines: {
            create: resolvedLines.map(l => ({
              ...l,
              debit: l.debit,
              credit: l.credit,
            })),
          },
        },
        include: { lines: { include: { account: true } } },
      });
    });

    console.log(`✅ Écriture modifiée: ${updated.entryNumber}`);
    updated.lines.forEach((line: any) => {
      console.log(`   - ${line.account.accountNumber} (${line.account.name}): D=${line.debit} C=${line.credit}`);
    });

    // 4. Nettoyage
    console.log(`\n🧹 Nettoyage...`);
    await prisma.journalEntry.delete({ where: { id: created.id } });
    console.log(`✅ Test terminé avec succès!\n`);

    await prisma.$disconnect();
  } catch (error) {
    console.error("❌ Erreur:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

testJournalEntries();
