import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://aionweb.io"),
  title: {
    default: "AionWeb | Custom Web Development & Digital Solutions in 24 Hours",
    template: "%s | AionWeb",
  },
  description:
    "AionWeb builds high-converting marketing websites, highly scalable web applications, and stunning e-commerce stores tailored to grow your business - delivered in just 24 hours.",
  keywords: [
    "Custom Web Development",
    "24-Hour Website Delivery",
    "Professional Marketing Websites",
    "High-Converting Landing Pages",
    "Next.js React Developers",
    "Affordable Business Web Design",
    "Custom E-Commerce Stores",
    "SaaS Application Development",
    "UI/UX Design Agency",
    "Remote Web Developers",
  ],
  authors: [{ name: "AionWeb Team", url: "https://aionweb.io" }],
  creator: "AionWeb",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aionweb.io",
    siteName: "AionWeb Digital Solutions",
    title: "AionWeb | Get Your Custom Business Website in 24 Hours",
    description:
      "AionWeb is a premier web development agency building robust marketing websites, mobile apps, and Next.js digital platforms rapidly.",
    images: [
      {
        url: "/og-image.jpg", // Assuming an illustrative OG image path
        width: 1200,
        height: 630,
        alt: "AionWeb - Professional Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AionWeb | Fast, Custom Web Development",
    description: "Launch your custom marketing site or product today. We build tailored digital ecosystems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col transition-colors duration-300 bg-surface dark:bg-[#0A0F1C] text-dark dark:text-slate-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
