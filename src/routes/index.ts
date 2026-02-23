import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { materialsRoutes } from "../modules/materials/materials.routes";
import { transactionsRoutes } from "../modules/transactions/transactions.routes";
import { personsRoutes } from "../modules/persons/persons.routes";
import { accountingRoutes } from "../modules/accounting/accounting.routes";
import { reportsRoutes } from "../modules/reports/reports.routes";
import { initRoutes } from "../modules/init/init.routes";
import { deletedItemsRoutes } from "../modules/deleted-items/deleted-items.routes";

export const apiRoutes = Router();

apiRoutes.use("/init", initRoutes);
apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/materials", materialsRoutes);
apiRoutes.use("/bibliotheque", materialsRoutes);
apiRoutes.use("/materiel", materialsRoutes);
apiRoutes.use("/transactions", transactionsRoutes);
apiRoutes.use("/persons", personsRoutes);
apiRoutes.use("/accounting", accountingRoutes);
apiRoutes.use("/comptabilite", accountingRoutes);
apiRoutes.use("/reports", reportsRoutes);
apiRoutes.use("/rapport", reportsRoutes);
apiRoutes.use("/deleted-items", deletedItemsRoutes);
apiRoutes.use("/corbeille", deletedItemsRoutes);
