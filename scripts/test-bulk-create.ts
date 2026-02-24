import fs from "fs";
import axios from "axios";

async function main() {
  console.log("🚀 Test des écritures comptables en masse...\n");

  const testFile = JSON.parse(
    fs.readFileSync("scripts/test-entries-bulk.json", "utf-8")
  );

  const baseUrl = "http://localhost:4000/api";
  let successCount = 0;
  let errorCount = 0;

  for (const entry of testFile.entries) {
    try {
      const response = await axios.post(`${baseUrl}/accounting/entries`, entry);

      console.log(
        `✅ ${entry.entry}: ${response.data.entryNumber} créée avec succès`
      );
      successCount++;
    } catch (error: any) {
      console.log(
        `❌ ${entry.entry}: ${error.response?.data?.message || error.message}`
      );
      errorCount++;
    }
  }

  console.log(`\n📊 Résumé:`);
  console.log(`  ✅ Succès: ${successCount}/${testFile.entries.length}`);
  console.log(`  ❌ Erreurs: ${errorCount}/${testFile.entries.length}`);
}

main().catch(console.error);
