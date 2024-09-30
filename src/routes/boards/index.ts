import { Router } from "express";
import { getAllBoardsRoute } from "./getAll";
import { validationMiddleware } from "../../middleware/validation";
import { getBoardRoute, getBoardRouteSchema } from "./get";

export const boardRoutes = Router();
boardRoutes.get("/", getAllBoardsRoute);
boardRoutes.get(
	"/:id",
	validationMiddleware(getBoardRouteSchema),
	getBoardRoute,
);
