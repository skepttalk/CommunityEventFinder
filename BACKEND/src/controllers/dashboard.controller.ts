import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { getDashboardStats } from "../services/dashboard.service";
import { Unauthorized } from "../ERRORHANDLER/httpError";

export const getDashboard = asyncHandler(
  async (req: Request, res: Response) => {

    if (!req.user) {
      throw new Unauthorized("Not authorized");
    }

    const stats = await getDashboardStats(req.user._id.toString());

    return successResponse(
      res,
      "Dashboard details fetched successfully",
      stats
    );
  }
);