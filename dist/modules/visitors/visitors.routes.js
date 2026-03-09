"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitorsRoutes = void 0;
const express_1 = require("express");
const http_1 = require("../../common/http");
const prisma_1 = require("../../config/prisma");
exports.visitorsRoutes = (0, express_1.Router)();
function parseVisitDate(value) {
    if (value === undefined || value === null || value === "")
        return undefined;
    const date = new Date(String(value));
    if (Number.isNaN(date.getTime()))
        throw new http_1.AppError("visitDate invalide", 400);
    return date;
}
exports.visitorsRoutes.get("/", (0, http_1.asyncHandler)(async (req, res) => {
    const limit = Math.min(parseInt(String(req.query.limit ?? "50"), 10) || 50, 500);
    const offset = parseInt(String(req.query.offset ?? "0"), 10) || 0;
    const logs = await prisma_1.prisma.visitorLog.findMany({
        include: {
            person: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    email: true,
                },
            },
        },
        orderBy: { visitDate: "desc" },
        take: limit,
        skip: offset,
    });
    res.status(200).json(logs);
}));
exports.visitorsRoutes.get("/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const id = String(req.params.id);
    const log = await prisma_1.prisma.visitorLog.findUnique({
        where: { id },
        include: {
            person: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    email: true,
                },
            },
        },
    });
    if (!log)
        throw new http_1.AppError("Visite introuvable", 404);
    res.status(200).json(log);
}));
exports.visitorsRoutes.post("/", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    const visitDate = parseVisitDate(body.visitDate);
    const created = await prisma_1.prisma.$transaction(async (tx) => {
        if (!body.personId && !body.fullName) {
            throw new http_1.AppError("personId ou fullName obligatoire", 400);
        }
        let personId = null;
        if (body.personId) {
            const person = await tx.person.findFirst({ where: { id: body.personId, deletedAt: null } });
            if (!person)
                throw new http_1.AppError("Personne introuvable", 404);
            personId = person.id;
            if (!person.isVisitor) {
                await tx.person.update({
                    where: { id: person.id },
                    data: { isVisitor: true },
                });
            }
        }
        return tx.visitorLog.create({
            data: {
                personId,
                fullName: body.fullName,
                phone: body.phone,
                email: body.email,
                address: body.address,
                church: body.church,
                visitDate,
                notes: body.notes,
            },
            include: {
                person: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        email: true,
                    },
                },
            },
        });
    });
    res.status(201).json(created);
}));
//# sourceMappingURL=visitors.routes.js.map