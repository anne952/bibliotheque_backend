"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personsRoutes = void 0;
const express_1 = require("express");
const http_1 = require("../../common/http");
const persons_service_1 = require("./persons.service");
exports.personsRoutes = (0, express_1.Router)();
// Get all persons
exports.personsRoutes.get("/", (0, http_1.asyncHandler)(async (req, res) => {
    const filters = {
        isBorrower: req.query.isBorrower === "true",
        isBuyer: req.query.isBuyer === "true",
        isDonor: req.query.isDonor === "true",
        isSupplier: req.query.isSupplier === "true",
        isVisitor: req.query.isVisitor === "true",
    };
    // Only apply filters if at least one is true
    const hasFilters = Object.values(filters).some((v) => v === true);
    const persons = await persons_service_1.PersonService.getAll(hasFilters ? filters : undefined);
    res.status(200).json(persons);
}));
// Get a person by ID
exports.personsRoutes.get("/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const person = await persons_service_1.PersonService.getById(String(req.params.id));
    res.status(200).json(person);
}));
// Get loans for a person
exports.personsRoutes.get("/:id/loans", (0, http_1.asyncHandler)(async (req, res) => {
    const loans = await persons_service_1.PersonService.getLoans(String(req.params.id));
    res.status(200).json(loans);
}));
// Get purchases for a person
exports.personsRoutes.get("/:id/purchases", (0, http_1.asyncHandler)(async (req, res) => {
    const purchases = await persons_service_1.PersonService.getPurchases(String(req.params.id));
    res.status(200).json(purchases);
}));
// Get sales for a person
exports.personsRoutes.get("/:id/sales", (0, http_1.asyncHandler)(async (req, res) => {
    const sales = await persons_service_1.PersonService.getSales(String(req.params.id));
    res.status(200).json(sales);
}));
// Create a new person
exports.personsRoutes.post("/", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    if (!body.firstName)
        throw new http_1.AppError("firstName obligatoire", 400);
    if (!body.lastName)
        throw new http_1.AppError("lastName obligatoire", 400);
    const person = await persons_service_1.PersonService.create({
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
}));
// Update a person
exports.personsRoutes.put("/:id", (0, http_1.asyncHandler)(async (req, res) => {
    const body = req.body;
    const person = await persons_service_1.PersonService.update(String(req.params.id), {
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
}));
// Delete a person (soft delete)
exports.personsRoutes.delete("/:id", (0, http_1.asyncHandler)(async (req, res) => {
    await persons_service_1.PersonService.delete(String(req.params.id));
    res.status(204).send();
}));
//# sourceMappingURL=persons.routes.js.map