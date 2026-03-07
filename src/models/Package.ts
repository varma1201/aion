import mongoose, { Document, Schema } from "mongoose";

export interface IPackage extends Document {
  name: string;
  price: number;
  features: string[];
  order: number;
  isPopular?: boolean;
}

const PackageSchema = new Schema<IPackage>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  features: [{ type: String }],
  order: { type: Number, default: 0 },
  isPopular: { type: Boolean, default: false },
});

export const Package = mongoose.models.Package || mongoose.model<IPackage>("Package", PackageSchema);
