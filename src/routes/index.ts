import { Router } from "express";
import { boardRoutes } from "./boards";
import { postRoutes } from "./posts";

export const routes = Router();
routes.use("/boards", boardRoutes);
routes.use("/posts", postRoutes);
