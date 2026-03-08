import Event from "../models/event.model";
import { fetchPopularEvents } from "./event.service";

export const getDashboardStats = async (userId: string) => {
  const totalEvents = await Event.countDocuments({
    createdBy: userId,
  });

  const openEvents = await Event.countDocuments({
    createdBy: userId,
    status: "open",
  });

  const closedEvents = await Event.countDocuments({
    createdBy: userId,
    status: "closed",
  });

  const participantAg = await Event.aggregate([
    {
      $match: {
        createdBy: userId,
      },
    },
    {
      $project: {
        participantsCount: { $size: { $ifNull: ["$participants", []] } },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$participantsCount" },
      },
    },
  ]);

  const totalParticipant = participantAg[0]?.total || 0;

  const popularEvent = await fetchPopularEvents(5);

  return {
    totalEvents,
    openEvents,
    closedEvents,
    totalParticipant,
    popularEvent,
  };
};
