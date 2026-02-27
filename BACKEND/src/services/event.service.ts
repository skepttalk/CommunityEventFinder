import Event from "../models/event.model";

export const fetchPopularEvents = async (limit = 10) => {
  return Event.aggregate([
    { $match: { status: "open" } },
    {
      $addFields: {
        participantsCount: { $size: { $ifNull: ["$participants", []] } },
      },
    },
    { $sort: { participantsCount: -1 } },
    { $limit: limit },
  ]);
};
