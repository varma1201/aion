import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import ClientLogo from "@/components/ClientLogo";
import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Trusted Web Developers | Client Success Stories",
  description: "Read 5-star web design customer reviews and explore how businesses from startups to real-estate scale their digital presence seamlessly with AionWeb's fast engineering.",
};

const defaultClients = [
  { _id: "1", name: "GymFit Studio", industry: "Fitness & Wellness", testimonial: "AionWeb transformed our online presence completely. Our bookings increased by 40% in the first month!", testimonialAuthor: "Sarah M., Owner" },
  { _id: "2", name: "Prime Salon", industry: "Beauty & Grooming", testimonial: "The booking platform they built for us is flawless. Clients love it and so does our staff.", testimonialAuthor: "James K., Manager" },
  { _id: "3", name: "Urban Clinic", industry: "Healthcare", testimonial: "Professional, fast, and exactly what we needed. They understood our requirements immediately.", testimonialAuthor: "Dr. Anita R." },
  { _id: "4", name: "LocalMart", industry: "Retail", testimonial: "Our e-commerce store is beautiful and super fast. Sales have been great since launch!", testimonialAuthor: "Raj P., CEO" },
  { _id: "5", name: "TechVault", industry: "Technology", testimonial: "Excellent technical expertise and great communication throughout the entire project.", testimonialAuthor: "Mike L., CTO" },
  { _id: "6", name: "BuildCo", industry: "Construction", testimonial: "The real-estate platform exceeded our expectations. Highly recommend AionWeb!", testimonialAuthor: "Emma T., Director" },
];

async function getClients() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/clients`, { cache: "no-store" });
    if (!res.ok) return defaultClients;
    const data = await res.json();
    return data.length ? data : defaultClients;
  } catch {
    return defaultClients;
  }
}

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-primary/5 via-surface to-secondary/5 dark:via-[#0A0F1C]">
        <div className="absolute -bottom-40 right-0 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="section-container relative z-10 text-center">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            Clients
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-dark dark:text-white mb-6 text-balance">
            Trusted by Amazing<br />
            <span className="gradient-text">Businesses</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            We are proud to have worked alongside businesses that are building something meaningful.
          </p>
        </div>
      </section>

      {/* Client Grid */}
      <section className="py-24 bg-white dark:bg-[#0A0F1C]">
        <div className="section-container">
          <SectionTitle badge="Our Clients" title="Companies We Have " highlight="Helped" />
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {clients.map((client: { _id: string; name: string; logo: string; industry: string }, i: number) => (
              <ClientLogo key={client._id} name={client.name} logo={client.logo} industry={client.industry} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface dark:bg-slate-900/50">
        <div className="section-container">
          <SectionTitle badge="Testimonials" title="What Our " highlight="Clients Say" subtitle="Real feedback from the businesses we have partnered with." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients
              .filter((c: { testimonial?: string }) => c.testimonial)
              .map((client: { _id: string; name: string; testimonial: string; testimonialAuthor: string }, i: number) => (
                <div key={client._id + i} className="card p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{client.testimonial}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-dark dark:text-white">{client.name}</div>
                      <div className="text-xs text-slate-400">{client.testimonialAuthor}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
