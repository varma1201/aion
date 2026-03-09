export const dynamic = "force-dynamic";
import { verifyAdminAPI } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Package } from "@/models/Package";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const authError = verifyAdminAPI(req);
  if (authError) return authError;
  try {
    await connectDB();
    const body = await req.json();
    const updatedPackage = await Package.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!updatedPackage) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }
    
    return NextResponse.json(updatedPackage);
  } catch (error) {
    console.error("Failed to update package:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authError = verifyAdminAPI(req);
  if (authError) return authError;
  try {
    await connectDB();
    const deletedPackage = await Package.findByIdAndDelete(params.id);
    
    if (!deletedPackage) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete package:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
