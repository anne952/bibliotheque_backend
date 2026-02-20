import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
declare global {
    var prisma: PrismaClient | undefined;
}
export declare const prisma: PrismaClient;
//# sourceMappingURL=prisma.d.ts.map