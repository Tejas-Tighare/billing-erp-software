import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { logger } from "./middleware/logger.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api", routes);

app.use(errorHandler);

export default app;