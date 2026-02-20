import express from "express";
import { apiRoutes } from "./routes";
import { errorHandler } from "./common/http";

export const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", apiRoutes);
app.use(errorHandler);
