import { NextFunction, Request, RequestHandler, Response } from "express";
export declare class AppError extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode?: number);
}
export declare function asyncHandler(handler: RequestHandler): RequestHandler;
export declare function notImplemented(req: Request, res: Response): void;
export declare function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void;
//# sourceMappingURL=http.d.ts.map