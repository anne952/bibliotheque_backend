import { Router } from "express";
import { asyncHandler, AppError } from "../../common/http";
import { AccountInitService } from "../common/business.service";

export const initRoutes = Router();

/**
 * Initialize database with default data
 * Should only be called once during setup
 */
initRoutes.post(
  "/setup",
  asyncHandler(async (_req, res) => {
    try {
      await AccountInitService.createDefaultAccounts();
      await AccountInitService.createInitialFiscalYear();

      res.status(200).json({
        message: "Initialisation complétée",
        timestamp: new Date(),
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erreur d'initialisation";
      res.status(500).json({ error: message });
    }
  }),
);

/**
 * Health check endpoint
 */
initRoutes.get(
  "/health",
  asyncHandler(async (_req, res) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date(),
    });
  }),
);
