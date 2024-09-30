import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../database";

export const getBoardRouteSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
});

export const getBoardRoute = async (req: Request, res: Response) => {
	const { id } = req.params;

	const board = await prisma.board.findFirst({
		where: { id },
	});

	if (!board) {
		res.sendStatus(404);
		return;
	}
	res.send(board);
};
