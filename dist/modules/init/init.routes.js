"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoutes = void 0;
const express_1 = require("express");
const http_1 = require("../../common/http");
const business_service_1 = require("../common/business.service");
exports.initRoutes = (0, express_1.Router)();
/**
 * Initialize database with default data
 * Should only be called once during setup
 */
exports.initRoutes.post("/setup", (0, http_1.asyncHandler)(async (_req, res) => {
    try {
        await business_service_1.AccountInitService.createDefaultAccounts();
        await business_service_1.AccountInitService.createInitialFiscalYear();
        res.status(200).json({
            message: "Initialisation complétée",
            timestamp: new Date(),
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Erreur d'initialisation";
        res.status(500).json({ error: message });
    }
}));
/**
 * Health check endpoint
 */
exports.initRoutes.get("/health", (0, http_1.asyncHandler)(async (_req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date(),
    });
}));
//# sourceMappingURL=init.routes.js.map