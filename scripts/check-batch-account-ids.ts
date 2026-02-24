import { prisma } from "../src/config/prisma";
import fs from "fs";

async function main() {
  const raw = fs.readFileSync("scripts/test-entries-bulk.json", "utf8");
  const payload = JSON.parse(raw) as { entries?: Array<{ lines?: Array<{ account?: string }> }> };

  const ids = Array.from(
    new Set(
      (payload.entries ?? [])
        .flatMap((e) => e.lines ?? [])
        .map((l) => l.account)
        .filter((v): v is string => typeof v === "string" && v.length > 0),
    ),
  );

  const existing = await prisma.account.findMany({
    where: { id: { in: ids } },
    select: { id: true },
  });

  const existingSet = new Set(existing.map((a) => a.id));
  const missing = ids.filter((id) => !existingSet.has(id));

  console.log(JSON.stringify({
    batchAccountIds: ids.length,
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
