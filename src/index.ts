import express from "express";

const app = express();

app.use(express.json());

app.listen(Bun.env.PORT ?? 3000, () =>
	console.log(`Listening on port ${Bun.env.PORT ?? 3000}.`),
);
