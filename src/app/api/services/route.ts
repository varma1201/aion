export const dynamic = "force-dynamic";
import { verifyAdminAPI } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(services);
  } catch (error) {
    console.error("GET Services Error:", error);
    return NextResponse.json({ error: "Failed to fetch services", details: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = verifyAdminAPI(req);
  if (authError) return authError;

  try {
    await connectDB();
    const body = await req.json();
    const service = await Service.create(body);
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("POST Service Error:", error);
    return NextResponse.json({ error: "Failed to create service", details: (error as Error).message }, { status: 500 });
  }
}
