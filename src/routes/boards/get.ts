import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../database";

const paramsSchema = z.object({
	id: z.string(),
});

export const getBoardRouteSchema = z.object({
	params: paramsSchema,
});

export const getBoardRoute = async (
	req: Request<z.infer<typeof paramsSchema>>,
	res: Response,
) => {
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
