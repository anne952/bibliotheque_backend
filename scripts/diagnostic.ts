import { env } from "../src/config/env";

console.log("\n🔍 DIAGNOSTIC BACKEND\n");
console.log("=".repeat(60));

// 1. Configuration CORS
console.log("\n📡 CONFIGURATION CORS:");
console.log(`   Origines autorisées:`);
env.corsAllowedOrigins.forEach(origin => console.log(`      - ${origin}`));
console.log(`   Null origin autorisé: ${env.corsAllowNullOrigin}`);

// 2. Routes principales disponibles
console.log("\n🛣️  ROUTES PRINCIPALES:");

const routes = [
  { prefix: "/api/init", endpoints: ["POST /setup", "GET /health"] },
  { prefix: "/api/auth", endpoints: ["GET /register-status", "POST /register", "POST /login", "POST /refresh"] },
  { prefix: "/api/materials", endpoints: ["GET /", "GET /:id", "POST /", "PUT /:id", "DELETE /:id"] },
  { prefix: "/api/persons", endpoints: ["GET /", "GET /:id", "POST /", "PUT /:id", "DELETE /:id"] },
  { prefix: "/api/transactions", endpoints: ["POST /purchase", "POST /sale", "POST /loan", "POST /donation", "GET /:id"] },
  { prefix: "/api/accounting", endpoints: [
    "GET /entries", 
    "GET /entries/:id", 
    "POST /entries", 
    "PUT /entries/:id", 
    "DELETE /entries/:id",
    "PUT /entries/:id/validate",
    "GET /trial-balance",
    "GET /balance-sheet",
    "GET /income-statement",
    "GET /cash-journal",
    "GET /accounts/resolve",
    "GET /export/excel"
  ]},
  { prefix: "/api/reports", endpoints: ["GET /summary"] },
  { prefix: "/api/deleted-items", endpoints: ["GET /", "POST /:id/restore"] },
];

routes.forEach(({ prefix, endpoints }) => {
  console.log(`\n   ${prefix}:`);
  endpoints.forEach(endpoint => console.log(`      ${endpoint}`));
});

// 3. Informations environnement
console.log("\n⚙️  CONFIGURATION:");
console.log(`   NODE_ENV: ${env.nodeEnv}`);
console.log(`   PORT: ${env.port}`);
console.log(`   DATABASE: ${env.databaseUrl?.includes('localhost') ? '🏠 Local' : '☁️  Render'}`);

// 4. Recommandations
console.log("\n💡 RECOMMANDATIONS:");

if (!env.corsAllowedOrigins.includes("*")) {
  console.log("   ✅ CORS configuré avec des origines spécifiques (sécurisé)");
} else {
  console.log("   ⚠️  CORS ouvert à toutes les origines (* détecté)");
}

console.log("\n📝 Pour ajouter une origine CORS:");
console.log("   Ajoutez dans .env: CORS_ALLOWED_ORIGINS=http://localhost:5173,https://votre-domaine.com");

console.log("\n" + "=".repeat(60));
console.log("✅ Diagnostic terminé\n");

