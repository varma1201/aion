export const dynamic = "force-dynamic";
import { verifyAdminAPI } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Client } from "@/models/Client";

export async function GET() {
  try {
    await connectDB();
    const clients = await Client.find().sort({ createdAt: -1 });
    return NextResponse.json(clients);
  } catch {
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = verifyAdminAPI(req);
  if (authError) return authError;

  try {
    await connectDB();
    const body = await req.json();
    const client = await Client.create(body);
    return NextResponse.json(client, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}
