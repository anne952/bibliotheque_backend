import { config as loadEnv } from "dotenv";

loadEnv();

const portRaw = process.env.PORT ?? "4000";
const port = Number(portRaw);

if (!Number.isInteger(port) || port <= 0) {
  throw new Error(`PORT invalide: ${portRaw}`);
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL est obligatoire");
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port,
  databaseUrl: process.env.DATABASE_URL,
};
