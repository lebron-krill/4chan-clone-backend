import { Router } from "express";
import { validationMiddleware } from "../../middleware/validation";
import { createPostRoute, createPostRouteSchema } from "./create";
import { getBoardPostsRoute, getBoardPostsRouteSchema } from "./getBoardPosts";

export const postRoutes = Router();
postRoutes.post(
	"/",
	validationMiddleware(createPostRouteSchema),
	createPostRoute,
);
postRoutes.get(
	"/:boardId",
	validationMiddleware(getBoardPostsRouteSchema),
	getBoardPostsRoute,
);
