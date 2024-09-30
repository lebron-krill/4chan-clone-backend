import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../database";

export const createPostRouteSchema = z.object({
	body: z.object({
		username: z.string().min(3).max(20),
		content: z.string().min(1).max(2000),
		boardId: z.string(),
		replyingToId: z.optional(z.number()),
	}),
});

export const createPostRoute = async (req: Request, res: Response) => {
	const { username, content, boardId } = req.body;
	let { replyingToId } = req.body;
	console.log(replyingToId);

	const board = await prisma.board.findFirst({
		where: {
			id: boardId,
		},
	});

	if (!board) {
		res.status(400).send({ message: "Invalid board ID" });
		return;
	}

	if (replyingToId) {
		console.log(replyingToId);
		const replyingToPost = await prisma.post.findFirst({
			where: { id: replyingToId, boardId },
		});

		replyingToId = replyingToPost?.id;
	}

	const post = await prisma.post.create({
		data: {
			username,
			content,
			replyingToId,
			boardId,
		},
	});

	res.send(post);
};
