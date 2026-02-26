import mongoose, { Schema, Document } from "mongoose";

interface ILocation {
  type: "Point";
  coordinates: [number, number];
  address: string;
  city: string;
  state: string;
}

export interface IEvent extends Document {
  title: string;
  description: string;
  email: string;
  date: Date;
  status: "open" | "closed";
  location: ILocation;
  createdBy: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

eventSchema.index({ location: "2dsphere" });

export default mongoose.model<IEvent>("Event", eventSchema);
