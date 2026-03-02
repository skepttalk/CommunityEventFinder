import express from "express";
import cors from "cors";
import eventRouter from "./routes/event.routes";
import "./models/user.model";
import { errorMiddleware } from "./middleware/error.middleware";


const app = express();

app.set("json spaces", 2);

app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

app.use("/api", eventRouter);


export default app;