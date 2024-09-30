import { Router } from "express";
import { validationMiddleware } from "../../middleware/validation";
import { createPostRoute, createPostRouteSchema } from "./create";

export const postRoutes = Router();
postRoutes.post(
	"/",
	validationMiddleware(createPostRouteSchema),
	createPostRoute,
);
