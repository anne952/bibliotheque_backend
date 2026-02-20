"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.asyncHandler = asyncHandler;
exports.notImplemented = notImplemented;
exports.errorHandler = errorHandler;
class AppError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
function asyncHandler(handler) {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
}
function notImplemented(req, res) {
    res.status(501).json({
        message: `Endpoint non implemente: ${req.method} ${req.originalUrl}`,
    });
}
function errorHandler(err, _req, res, _next) {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }
    const message = err instanceof Error ? err.message : "Erreur interne";
    res.status(500).json({ message });
}
//# sourceMappingURL=http.js.map