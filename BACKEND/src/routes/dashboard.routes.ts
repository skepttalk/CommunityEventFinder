import Express from "express";
import { getDashboard } from "../controllers/dashboard.controller";
import { protect } from "../middleware/auth.middleware";

const router = Express.Router();

router.get("/", protect, getDashboard);

export default router;
