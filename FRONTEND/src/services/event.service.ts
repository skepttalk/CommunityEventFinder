import api from "./api";

export const getEvents = async (params?: any) => {
  const res = await api.get("/events", { params });
  return res.data.data;
};

export const getEventById = async (id: string) => {
  const res = await api.get(`/events/${id}`);
  return res.data.data;
};

export const createEvent = async (data: any) => {
  const res = await api.post("/events", data);
  return res.data.data;
};

export const updateEvent = async ({ id, data }: { id: string; data: any }) => {
  const res = await api.put(`/events/${id}`, data);
  return res.data.data;
};

export const closeEvent = async (id: string) => {
  const res = await api.patch(`/events/${id}/close`);
  return res.data.data;
};

export const deleteEvent = async (id: string) => {
  const res = await api.delete(`/events/${id}`);
  return res.data.data;
};

export const joinEvent = async (id: string) => {
  const res = await api.post(`/events/${id}/join`);
  return res.data.data;
};

export const approveParticipant = async (eventId: string, userId: string) => {
  const res = await api.patch(`/events/${eventId}/approve/${userId}`);
  return res.data.data;
};

export const getMyEvents = async () => {
  const res = await api.get("/events/my-events");
  return res.data.data;
};

export const getPopularEvents = async () => {
  const res = await api.get("/events/popular");
  return res.data.data;
};

export const getCalendarEvents = async (month: number, year: number) => {
  const res = await api.get("/events/calendar", {
    params: { month, year },
  });
  return res.data.data;
};
