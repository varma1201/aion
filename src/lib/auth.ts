import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export function verifyAdminAPI(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized: Missing token" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Not an admin" }, { status: 403 });
    }
    return null; // Signals success
  } catch {
    return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
  }
}
