import type { NextFunction, Request, Response } from "express";
import { ZodError, type AnyZodObject } from "zod";

export const validationMiddleware =
	(schema: AnyZodObject) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params,
			});

			next();
		} catch (error) {
			if (error instanceof ZodError) {
				res.status(400).send(error.errors);
				return;
			}

			res.status(500).send({ message: "Error running input validation" });
		}
	};
