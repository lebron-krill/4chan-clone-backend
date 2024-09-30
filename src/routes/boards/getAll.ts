import type { NextFunction, Request, Response } from "express";
import { prisma } from "../../database";

export const getAllBoardsRoute = async (req: Request, res: Response) => {
	res.send(await prisma.board.findMany());
};
