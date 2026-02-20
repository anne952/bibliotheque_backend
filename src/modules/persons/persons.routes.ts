import { Router } from "express";
import { asyncHandler, AppError } from "../../common/http";
import { PersonService } from "./persons.service";

export const personsRoutes = Router();

// Get all persons
personsRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const filters = {
      isBorrower: req.query.isBorrower === "true",
      isBuyer: req.query.isBuyer === "true",
      isDonor: req.query.isDonor === "true",
      isSupplier: req.query.isSupplier === "true",
      isVisitor: req.query.isVisitor === "true",
    };

    // Only apply filters if at least one is true
    const hasFilters = Object.values(filters).some((v) => v === true);
    const persons = await PersonService.getAll(hasFilters ? filters : undefined);
    res.status(200).json(persons);
  }),
);

// Get a person by ID
personsRoutes.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const person = await PersonService.getById(String(req.params.id));
    res.status(200).json(person);
  }),
);

// Get loans for a person
personsRoutes.get(
  "/:id/loans",
  asyncHandler(async (req, res) => {
    const loans = await PersonService.getLoans(String(req.params.id));
    res.status(200).json(loans);
  }),
);

// Get purchases for a person
personsRoutes.get(
  "/:id/purchases",
  asyncHandler(async (req, res) => {
    const purchases = await PersonService.getPurchases(String(req.params.id));
    res.status(200).json(purchases);
  }),
);

// Get sales for a person
personsRoutes.get(
  "/:id/sales",
  asyncHandler(async (req, res) => {
    const sales = await PersonService.getSales(String(req.params.id));
    res.status(200).json(sales);
  }),
);

// Create a new person
personsRoutes.post(
  "/",
  asyncHandler(async (req, res) => {
    const body = req.body as Record<string, unknown>;

    if (!body.firstName) throw new AppError("firstName obligatoire", 400);
    if (!body.lastName) throw new AppError("lastName obligatoire", 400);

    const person = await PersonService.create({
      firstName: String(body.firstName),
      lastName: String(body.lastName),
      phone: body.phone ? String(body.phone) : undefined,
      email: body.email ? String(body.email) : undefined,
      address: body.address ? String(body.address) : undefined,
      church: body.church ? String(body.church) : undefined,
      isBorrower: typeof body.isBorrower === "boolean" ? body.isBorrower : undefined,
      isBuyer: typeof body.isBuyer === "boolean" ? body.isBuyer : undefined,
      isDonor: typeof body.isDonor === "boolean" ? body.isDonor : undefined,
      isSupplier: typeof body.isSupplier === "boolean" ? body.isSupplier : undefined,
      isVisitor: typeof body.isVisitor === "boolean" ? body.isVisitor : undefined,
    });
    res.status(201).json(person);
  }),
);

// Update a person
personsRoutes.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const body = req.body as Record<string, unknown>;

    const person = await PersonService.update(String(req.params.id), {
      firstName: body.firstName ? String(body.firstName) : undefined,
      lastName: body.lastName ? String(body.lastName) : undefined,
      phone: body.phone ? String(body.phone) : undefined,
      email: body.email ? String(body.email) : undefined,
      address: body.address ? String(body.address) : undefined,
      church: body.church ? String(body.church) : undefined,
      isBorrower: typeof body.isBorrower === "boolean" ? body.isBorrower : undefined,
      isBuyer: typeof body.isBuyer === "boolean" ? body.isBuyer : undefined,
      isDonor: typeof body.isDonor === "boolean" ? body.isDonor : undefined,
      isSupplier: typeof body.isSupplier === "boolean" ? body.isSupplier : undefined,
      isVisitor: typeof body.isVisitor === "boolean" ? body.isVisitor : undefined,
    });
    res.status(200).json(person);
  }),
);

// Delete a person (soft delete)
personsRoutes.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await PersonService.delete(String(req.params.id));
    res.status(204).send();
  }),
);
