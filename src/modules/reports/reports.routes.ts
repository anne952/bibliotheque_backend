import { Router } from "express";
import { asyncHandler } from "../../common/http";
import { ReportsService } from "./reports.service";

export const reportsRoutes = Router();

// Dashboard overview (optimized KPIs)
reportsRoutes.get(
  "/dashboard/overview",
  asyncHandler(async (req, res) => {
    const from = req.query.from ? String(req.query.from) : undefined;
    const to = req.query.to ? String(req.query.to) : undefined;
    const fiscalYearId = req.query.fiscalYearId
      ? String(req.query.fiscalYearId)
      : undefined;

    const report = await ReportsService.getDashboardOverview({
      from,
      to,
      fiscalYearId,
    });
    res.status(200).json(report);
  }),
);

// Dashboard activity feed (optimized)
reportsRoutes.get(
  "/dashboard/activity",
  asyncHandler(async (req, res) => {
    const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 20;
    const report = await ReportsService.getDashboardActivity(limit);
    res.status(200).json(report);
  }),
);

// Dashboard stock alerts (optimized)
reportsRoutes.get(
  "/dashboard/stock-alerts",
  asyncHandler(async (req, res) => {
    const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 10;
    const report = await ReportsService.getDashboardStockAlerts(limit);
    res.status(200).json(report);
  }),
);

// Daily report
reportsRoutes.get(
  "/daily",
  asyncHandler(async (req, res) => {
    const date = req.query.date ? String(req.query.date) : undefined;
    const report = await ReportsService.getDailyReport(date);
    res.status(200).json(report);
  }),
);

// Donors report
reportsRoutes.get(
  "/donors",
  asyncHandler(async (_req, res) => {
    const report = await ReportsService.getDonorsReport();
    res.status(200).json(report);
  }),
);

// Most borrowed materials report
reportsRoutes.get(
  "/most-borrowed",
  asyncHandler(async (req, res) => {
    const limit = req.query.limit
      ? parseInt(String(req.query.limit), 10)
      : 10;
    const report = await ReportsService.getMostBorrowedReport(limit);
    res.status(200).json(report);
  }),
);

// Inventory report
reportsRoutes.get(
  "/inventory",
  asyncHandler(async (_req, res) => {
    const report = await ReportsService.getInventoryReport();
    res.status(200).json(report);
  }),
);
