import type { Metadata } from "next";
import {
  HeroSection,
  ProcessSection,
  TestimonialsSection,
  ClientsSection,
  CtaSection,
  PricingSection,
} from "@/components/HomeSections";
import { connectDB } from "@/lib/mongodb";
import { Client } from "@/models/Client";
import { Package } from "@/models/Package";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Custom Marketing Websites & Web Apps in 24 Hours | AionWeb",
  description:
    "Launch your business online instantly. AionWeb delivers 100% custom, high-converting marketing websites, e-commerce stores, and React apps guaranteed in just 24 hours.",
};

const fallbackClients = [
  { _id: "1", name: "GymFit Studio", logo: "", industry: "Fitness" },
  { _id: "2", name: "Prime Salon", logo: "", industry: "Beauty" },
  { _id: "3", name: "Urban Clinic", logo: "", industry: "Healthcare" },
  { _id: "4", name: "LocalMart", logo: "", industry: "Retail" },
  { _id: "5", name: "TechVault", logo: "", industry: "Technology" },
  { _id: "6", name: "BuildCo", logo: "", industry: "Construction" },
];

async function getClients() {
  try {
    await connectDB();
    const data = await Client.find().sort({ createdAt: -1 }).lean();
    return data.length ? JSON.parse(JSON.stringify(data)) : fallbackClients;
  } catch {
    return fallbackClients;
  }
}

async function getPackages() {
  try {
    await connectDB();
    const data = await Package.find().sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(data));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const clients = await getClients();
  const packages = await getPackages();

  return (
    <>
      <HeroSection />
      <ProcessSection />
      <PricingSection packages={packages} />
      <TestimonialsSection />
      <ClientsSection clients={clients} />
      <CtaSection />
    </>
  );
}
