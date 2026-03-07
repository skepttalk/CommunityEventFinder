import express from "express";
import {
  createEvent,
  joinEvent,
  getEvent,
  getPopularEvents,
  updateEvent,
  deleteEvent,
  closeEvent,
  getCalendarEvents,
  getSingleEvent,
  getMyEvents,
  approveParticipant,
} from "../controllers/event.controller";

import { validate } from "../middleware/validate.middleware";
import { createEventSchema } from "../dto/event.dto";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, validate(createEventSchema), createEvent);

router.get("/", getEvent);
router.get("/popular", getPopularEvents);
router.get("/calendar", getCalendarEvents);
router.get("/my-events", protect, getMyEvents);

router.post("/:eventId/join", protect, joinEvent);
router.patch("/:eventId/approve/:userId", protect, approveParticipant);

router.put("/:eventId", protect, updateEvent);
router.patch("/:eventId/close", protect, closeEvent);
router.delete("/:eventId", protect, deleteEvent);

router.get("/:eventId", getSingleEvent);

export default router;
