import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Package } from "@/models/Package";

const defaultPackages = [
  {
    name: "1 Page Development",
    price: 2999,
    features: [
      "Custom unique design",
      "Mobile responsive layout",
      "Contact form integration",
      "Basic SEO optimization",
      "Fast loading speeds",
    ],
    order: 1,
    isPopular: false,
  },
  {
    name: "3 Page Development",
    price: 4999,
    features: [
      "Everything in 1 Page, plus:",
      "Up to 3 distinct pages (e.g., Home, About, Contact)",
      "Dynamic components",
      "Advanced SEO setup",
      "Social media integration",
    ],
    order: 2,
    isPopular: true,
  },
  {
    name: "5 Page Development",
    price: 6999,
    features: [
      "Everything in 3 Page, plus:",
      "Up to 5 distinct pages",
      "Content Management System (CMS)",
      "Performance optimization",
      "1 month free support",
    ],
    order: 3,
    isPopular: false,
  },
  {
    name: "Custom Plan",
    price: 0,
    features: [
      "Custom application logic",
      "API integrations",
      "User authentication",
      "Complex databases",
      "Scalable infrastructure",
    ],
    order: 4,
    isPopular: false,
  },
];

export async function GET() {
  try {
    await connectDB();
    let packages = await Package.find().sort({ order: 1 });

    // Auto-seed if empty
    if (packages.length === 0) {
      packages = await Package.insertMany(defaultPackages);
    }

    return NextResponse.json(packages);
  } catch (error) {
    console.error("Failed to fetch packages:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, price, features, order, isPopular } = body;

    if (!name || price === undefined) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    const newPackage = await Package.create({ name, price, features, order, isPopular });
    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    console.error("Failed to create package:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
