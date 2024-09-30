import express from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use("/api", routes);

app.listen(Bun.env.PORT ?? 3000, () =>
	console.log(`Listening on port ${Bun.env.PORT ?? 3000}.`),
);
