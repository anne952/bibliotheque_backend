import { prisma } from './src/config/prisma';

(async () => {
  const test = await prisma.account.findMany({
    where: { accountNumber: { in: ['601', '602', '611', '521', '571'] } },
    select: { accountNumber: true, name: true },
  });
  console.log('✅ Comptes vérifiés:', test);
  await prisma.$disconnect();
})();
