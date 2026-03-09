import { Router } from "express";
import { AppError, asyncHandler } from "../../common/http";
import { prisma } from "../../config/prisma";

export const visitorsRoutes = Router();

function parseVisitDate(value: unknown): Date | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) throw new AppError("visitDate invalide", 400);
  return date;
}

visitorsRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(String(req.query.limit ?? "50"), 10) || 50, 500);
    const offset = parseInt(String(req.query.offset ?? "0"), 10) || 0;

    const logs = await prisma.visitorLog.findMany({
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
  }),
);

visitorsRoutes.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const log = await prisma.visitorLog.findUnique({
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

    if (!log) throw new AppError("Visite introuvable", 404);
    res.status(200).json(log);
  }),
);

visitorsRoutes.post(
  "/",
  asyncHandler(async (req, res) => {
    const body = req.body as {
      personId?: string;
      fullName?: string;
      phone?: string;
      email?: string;
      address?: string;
      church?: string;
      visitDate?: string;
      notes?: string;
    };

    const visitDate = parseVisitDate(body.visitDate);

    const created = await prisma.$transaction(async (tx) => {
      if (!body.personId && !body.fullName) {
        throw new AppError("personId ou fullName obligatoire", 400);
      }

      let personId: string | null = null;

      if (body.personId) {
        const person = await tx.person.findFirst({ where: { id: body.personId, deletedAt: null } });
        if (!person) throw new AppError("Personne introuvable", 404);

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
  }),
);
