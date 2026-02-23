import { prisma } from "../src/config/prisma";

async function checkAccount() {
  try {
    const account = await prisma.account.findFirst({
      where: { accountNumber: "57" },
    });

    if (account) {
      console.log("✅ Compte 57 trouvé:", account);
    } else {
      console.log("❌ Compte 57 introuvable");
      
      // Chercher des comptes similaires
      const similar = await prisma.account.findMany({
        where: {
          accountNumber: {
            startsWith: "57",
          },
        },
        take: 10,
        orderBy: { accountNumber: "asc" },
      });
      
      console.log("\n📋 Comptes commençant par 57:");
      similar.forEach((acc) => {
        console.log(`   ${acc.accountNumber} - ${acc.name} (${acc.isActive ? "actif" : "inactif"})`);
      });
    }

    await prisma.$disconnect();
  } catch (error) {
    console.error("❌ Erreur:", error);
    process.exit(1);
  }
}

checkAccount();
