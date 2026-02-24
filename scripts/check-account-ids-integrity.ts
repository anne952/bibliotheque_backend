import { prisma } from "../src/config/prisma";

async function main() {
  const ids = await prisma.journalLine.findMany({
    select: { accountId: true },
    distinct: ["accountId"],
  });

  const existing = await prisma.account.findMany({
    where: { id: { in: ids.map((i) => i.accountId) } },
    select: { id: true },
  });

  const existingSet = new Set(existing.map((e) => e.id));
  const missing = ids
    .map((i) => i.accountId)
    .filter((id) => !existingSet.has(id));

  console.log(JSON.stringify({
    referencedAccountIds: ids.length,
    existing: existing.length,
    missingCount: missing.length,
    missing,
  }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
