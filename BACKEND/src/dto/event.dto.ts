import { z } from "zod";

export const createEventSchema = z.object({

  title: z.string().min(3),

  description: z.string().min(5),

  date: z.string(),

  maxParticipants: z.number().optional(),

  location: z.object({
    address: z.string().min(3),
    street: z.string().min(2),
    city: z.string().min(2),
    state: z.string().min(2),
    pincode: z.number().optional()
  })

});