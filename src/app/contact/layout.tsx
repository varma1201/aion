import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire a Web Developer | Get a Website within 24 Hours",
  description: "Ready to build your digital presence? Contact AionWeb for affordable web design, e-commerce, or mobile app development projects. Fast quotes and instant replies.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
