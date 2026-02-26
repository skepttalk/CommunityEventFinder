import Express from "express";
import {
  createEvent,
  joinEvent,
  getEvent,
  getPopularEvents
} from "../controllers/event.controller";

const eventRouter = Express.Router();

eventRouter.post("/createEvent", createEvent);
eventRouter.post("/join", joinEvent);
eventRouter.get("/events", getEvent);
eventRouter.get("/events/popular", getPopularEvents);

export default eventRouter;