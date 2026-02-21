import { config as loadEnv } from "dotenv";

loadEnv();

const defaultCorsAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
];

const portRaw = process.env.PORT ?? "4000";
const port = Number(portRaw);

if (!Number.isInteger(port) || port <= 0) {
  throw new Error(`PORT invalide: ${portRaw}`);
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL est obligatoire");
}

const corsAllowedOriginsRaw = process.env.CORS_ALLOWED_ORIGINS;
const corsAllowedOrigins = (
  corsAllowedOriginsRaw
    ? corsAllowedOriginsRaw.split(",")
    : defaultCorsAllowedOrigins
).map((origin) => origin.trim()).filter(Boolean);

const corsAllowNullOrigin =
  (process.env.CORS_ALLOW_NULL_ORIGIN ?? "false").toLowerCase() === "true";

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port,
  databaseUrl: process.env.DATABASE_URL,
  corsAllowedOrigins,
  corsAllowNullOrigin,
};
