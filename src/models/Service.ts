import mongoose, { Document, Schema } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  order: number;
  createdAt: Date;
}

const ServiceSchema = new Schema<IService>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  icon: { type: String, default: "Code2" },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Service = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
