import { prisma } from "../src/config/prisma";

async function checkAccounts() {
  try {
    const count = await prisma.account.count();
    console.log(`\n✅ Base de données connectée`);
    console.log(`📊 Nombre de comptes dans la base: ${count}`);

    if (count > 0) {
      const sample = await prisma.account.findMany({
        take: 10,
        orderBy: { accountNumber: "asc" },
        select: { accountNumber: true, name: true, isActive: true },
      });

      console.log("\n📝 Premiers comptes:");
      sample.forEach((acc) => {
        console.log(`   ${acc.accountNumber} - ${acc.name} (${acc.isActive ? "actif" : "inactif"})`);
      });
    } else {
      console.log("\n⚠️  Aucun compte trouvé. Lancez POST /api/init/setup pour créer les comptes.");
    }

    await prisma.$disconnect();
  } catch (error) {
    console.error("❌ Erreur:", error);
    process.exit(1);
  }
}

checkAccounts();
