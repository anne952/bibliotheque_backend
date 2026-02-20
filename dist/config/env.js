"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const portRaw = process.env.PORT ?? "4000";
const port = Number(portRaw);
if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`PORT invalide: ${portRaw}`);
}
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL est obligatoire");
}
exports.env = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port,
    databaseUrl: process.env.DATABASE_URL,
};
//# sourceMappingURL=env.js.map