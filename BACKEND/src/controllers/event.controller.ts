import { Request, Response } from "express";
import Event from "../models/event.model";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      email,
      date,
      address,
      city,
      state,
      latitude,
      longitude,
      userId,
    } = req.body;

    const newEvent = await Event.create({
      title,
      description,
      email,
      date,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
        address,
        city,
        state,
      },
      createdBy: userId,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating event" });
  }
};

export const joinEvent = async (req: Request, res: Response) => {};
