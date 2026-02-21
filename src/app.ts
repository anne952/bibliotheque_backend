import express from "express";
import morgan from "morgan";
import { apiRoutes } from "./routes";
import { errorHandler } from "./common/http";
import { env } from "./config/env";

export const app = express();

const corsMethods = "GET,POST,PUT,PATCH,DELETE,OPTIONS";
const corsDefaultHeaders = "Authorization,Content-Type";

const resolveAllowedOrigin = (origin: string | undefined): string | null => {
  if (!origin) {
    return null;
  }

  if (env.corsAllowedOrigins.includes("*")) {
    return "*";
  }

  if (origin === "null" && env.corsAllowNullOrigin) {
    return "null";
  }

  return env.corsAllowedOrigins.includes(origin) ? origin : null;
};

app.use((req, res, next) => {
  const originHeader = req.header("Origin");
  const allowedOrigin = resolveAllowedOrigin(originHeader);

  if (allowedOrigin) {
    res.header("Access-Control-Allow-Origin", allowedOrigin);

    if (allowedOrigin !== "*") {
      res.header("Vary", "Origin");
    }
  }

  res.header("Access-Control-Allow-Methods", corsMethods);
  res.header(
    "Access-Control-Allow-Headers",
    req.header("Access-Control-Request-Headers") ?? corsDefaultHeaders,
  );
  res.header("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  next();
});

app.use(express.json());
app.use(morgan(":method :url :status :response-time ms - :res[content-length] - :remote-addr"));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", apiRoutes);
app.use(errorHandler);
