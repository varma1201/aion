import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  client: string;
  techStack: string[];
  projectUrl: string;
  featured: boolean;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true },
  longDescription: { type: String, default: "" },
  image: { type: String, default: "" },
  client: { type: String, required: true },
  techStack: [{ type: String }],
  projectUrl: { type: String, default: "" },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Project = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
