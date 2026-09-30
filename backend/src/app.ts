import { env } from "./config/env.js";
import express from "express";
import cors from "cors";

import { briefingRouter } from "./routes/briefing.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api", briefingRouter);

export default app;
