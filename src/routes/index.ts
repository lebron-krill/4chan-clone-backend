import { Router } from "express";
import { boardRoutes } from "./boards";

export const routes = Router();
routes.use("/boards", boardRoutes);
