"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
const http_1 = require("./common/http");
const env_1 = require("./config/env");
exports.app = (0, express_1.default)();
const corsMethods = "GET,POST,PUT,PATCH,DELETE,OPTIONS";
const corsDefaultHeaders = "Authorization,Content-Type";
const resolveAllowedOrigin = (origin) => {
    if (!origin) {
        return null;
    }
    if (env_1.env.corsAllowedOrigins.includes("*")) {
        return "*";
    }
    if (origin === "null" && env_1.env.corsAllowNullOrigin) {
        return "null";
    }
    return env_1.env.corsAllowedOrigins.includes(origin) ? origin : null;
};
exports.app.use((req, res, next) => {
    const originHeader = req.header("Origin");
    const allowedOrigin = resolveAllowedOrigin(originHeader);
    if (allowedOrigin) {
        res.header("Access-Control-Allow-Origin", allowedOrigin);
        if (allowedOrigin !== "*") {
            res.header("Vary", "Origin");
        }
    }
    res.header("Access-Control-Allow-Methods", corsMethods);
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers") ?? corsDefaultHeaders);
    res.header("Access-Control-Max-Age", "86400");
    if (req.method === "OPTIONS") {
        res.status(204).end();
        return;
    }
    next();
});
exports.app.use(express_1.default.json());
exports.app.use((0, morgan_1.default)(":method :url :status :response-time ms - :res[content-length] - :remote-addr"));
exports.app.get("/", (_req, res) => {
    res.status(200).json({
        message: "Bibliothèque VGR API",
        status: "running",
        version: "1.0.0",
        endpoints: {
            health: "/health",
            api: "/api",
        },
    });
});
exports.app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
exports.app.use("/api", routes_1.apiRoutes);
exports.app.use(http_1.errorHandler);
//# sourceMappingURL=app.js.map