export const dynamic = "force-dynamic";
import { verifyAdminAPI } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const authError = verifyAdminAPI(req);
  if (authError) return authError;
  try {
    await connectDB();
    const contact = await Contact.findByIdAndUpdate(params.id, { read: true }, { new: true });
    if (!contact) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(contact);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authError = verifyAdminAPI(req);
  if (authError) return authError;
  try {
    await connectDB();
    await Contact.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
