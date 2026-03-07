import type { Metadata } from "next";
import {
  HeroSection,
  ProcessSection,
  TestimonialsSection,
  ClientsSection,
  CtaSection,
  PricingSection,
} from "@/components/HomeSections";

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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/clients`, { cache: "no-store" });
    if (!res.ok) return fallbackClients;
    const data = await res.json();
    return Array.isArray(data) && data.length ? data : fallbackClients;
  } catch {
    return fallbackClients;
  }
}

async function getPackages() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/packages`, { cache: "no-store", next: { revalidate: 0 } });
    if (!res.ok) return [];
    return await res.json();
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
