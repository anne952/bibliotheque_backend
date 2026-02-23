"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportsRoutes = void 0;
const express_1 = require("express");
const http_1 = require("../../common/http");
const reports_service_1 = require("./reports.service");
exports.reportsRoutes = (0, express_1.Router)();
// Dashboard overview (optimized KPIs)
exports.reportsRoutes.get("/dashboard/overview", (0, http_1.asyncHandler)(async (req, res) => {
    const from = req.query.from ? String(req.query.from) : undefined;
    const to = req.query.to ? String(req.query.to) : undefined;
    const fiscalYearId = req.query.fiscalYearId
        ? String(req.query.fiscalYearId)
        : undefined;
    const report = await reports_service_1.ReportsService.getDashboardOverview({
        from,
        to,
        fiscalYearId,
    });
    res.status(200).json(report);
}));
// Dashboard activity feed (optimized)
exports.reportsRoutes.get("/dashboard/activity", (0, http_1.asyncHandler)(async (req, res) => {
    const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 20;
    const report = await reports_service_1.ReportsService.getDashboardActivity(limit);
    res.status(200).json(report);
}));
// Dashboard stock alerts (optimized)
exports.reportsRoutes.get("/dashboard/stock-alerts", (0, http_1.asyncHandler)(async (req, res) => {
    const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 10;
    const report = await reports_service_1.ReportsService.getDashboardStockAlerts(limit);
    res.status(200).json(report);
}));
// Daily report
exports.reportsRoutes.get("/daily", (0, http_1.asyncHandler)(async (req, res) => {
    const date = req.query.date ? String(req.query.date) : undefined;
    const report = await reports_service_1.ReportsService.getDailyReport(date);
    res.status(200).json(report);
}));
// Donors report
exports.reportsRoutes.get("/donors", (0, http_1.asyncHandler)(async (_req, res) => {
    const report = await reports_service_1.ReportsService.getDonorsReport();
    res.status(200).json(report);
}));
// Most borrowed materials report
exports.reportsRoutes.get("/most-borrowed", (0, http_1.asyncHandler)(async (req, res) => {
    const limit = req.query.limit
        ? parseInt(String(req.query.limit), 10)
        : 10;
    const report = await reports_service_1.ReportsService.getMostBorrowedReport(limit);
    res.status(200).json(report);
}));
// Inventory report
exports.reportsRoutes.get("/inventory", (0, http_1.asyncHandler)(async (_req, res) => {
    const report = await reports_service_1.ReportsService.getInventoryReport();
    res.status(200).json(report);
}));
//# sourceMappingURL=reports.routes.js.map