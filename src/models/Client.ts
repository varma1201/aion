import mongoose, { Document, Schema } from "mongoose";

export interface IClient extends Document {
  name: string;
  logo: string;
  industry: string;
  website: string;
  testimonial: string;
  testimonialAuthor: string;
  featured: boolean;
  createdAt: Date;
}

const ClientSchema = new Schema<IClient>({
  name: { type: String, required: true, trim: true },
  logo: { type: String, default: "" },
  industry: { type: String, default: "" },
  website: { type: String, default: "" },
  testimonial: { type: String, default: "" },
  testimonialAuthor: { type: String, default: "" },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Client = mongoose.models.Client || mongoose.model<IClient>("Client", ClientSchema);
