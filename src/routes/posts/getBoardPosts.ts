import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../database";

const paramsSchema = z.object({
	boardId: z.string(),
});

const querySchema = z.object({
	limit: z.optional(z.number({ coerce: true }).min(0).max(50)),
	after: z.optional(z.number({ coerce: true }).min(0)),
});

export const getBoardPostsRouteSchema = z.object({
	params: paramsSchema,
	query: querySchema,
});

export const getBoardPostsRoute = async (
	req: Request<
		z.infer<typeof paramsSchema>,
		unknown,
		unknown,
		z.infer<typeof querySchema>
	>,
	res: Response,
) => {
	const { boardId } = req.params;
	const { limit, after } = req.query;

	const board = await prisma.board.findFirst({
		where: {
			id: boardId,
		},
	});

	if (!board) {
		res.status(400).send({ message: "Invalid board ID" });
		return;
	}

	res.send(
		await prisma.post.findMany({
			where: { boardId },
			// These are very weird because I couldn't be bothered to actually
			// figure out how to use zod properly :/
			skip: Number.parseInt(after?.toString() ?? "0"),
			take: Number.parseInt(limit?.toString() ?? "50"),
		}),
	);
};
