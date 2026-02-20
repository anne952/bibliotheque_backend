import { AppError, asyncHandler, notImplemented } from "../http";
import { Request, Response, NextFunction } from "express";

describe("HTTP Utilities", () => {
  describe("AppError", () => {
    it("should create error with default status", () => {
      const error = new AppError("Test error");

      expect(error.message).toBe("Test error");
      expect(error.statusCode).toBe(400);
    });

    it("should create error with custom status", () => {
      const error = new AppError("Not found", 404);

      expect(error.message).toBe("Not found");
      expect(error.statusCode).toBe(404);
    });

    it("should be instanceof Error", () => {
      const error = new AppError("Test");

      expect(error instanceof Error).toBe(true);
      expect(error instanceof AppError).toBe(true);
    });
  });

  describe("asyncHandler", () => {
    it("should wrap async handler and catch errors", async () => {
      const mockReq = {} as Request;
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const mockNext = jest.fn() as NextFunction;

      const handler = asyncHandler(async (_req, res) => {
        throw new AppError("Test error", 500);
      });

      await handler(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it("should call next on success", async () => {
      const mockReq = {} as Request;
      const mockRes = { json: jest.fn() } as unknown as Response;
      const mockNext = jest.fn() as NextFunction;

      const handler = asyncHandler(async (_req, res) => {
        res.json({ success: true });
      });

      await handler(mockReq, mockRes, mockNext);

      expect(mockRes.json).toHaveBeenCalledWith({ success: true });
    });
  });

  describe("notImplemented", () => {
    it("should return 501 and endpoint info", () => {
      const mockReq = {
        method: "POST",
        originalUrl: "/api/test",
      } as unknown as Request;

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      notImplemented(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(501);
      expect(mockRes.json).toHaveBeenCalled();
    });
  });
});
