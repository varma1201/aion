import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Pages: [
    { label: "Home", href: "/" },
    { label: "Our Work", href: "/our-work" },
    { label: "Clients", href: "/clients" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Admin", href: "/admin/contacts" },
  ],
  "What I Build": [
    { label: "Marketing Websites", href: "/contact" },
    { label: "Mobile Apps", href: "/contact" },
    { label: "Web Applications", href: "/contact" },
    { label: "E-Commerce Stores", href: "/contact" },
    { label: "Landing Pages", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark text-slate-400">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Image src="/webicon.png" alt="AionWeb Logo" width={32} height={32} className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold text-white">
                Aion<span className="text-secondary">Web</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-2">
              I build <span className="text-white font-semibold">custom marketing websites</span> for businesses — delivered in 24 hours. No templates, no waiting.
            </p>
            <p className="text-xs text-primary font-semibold mb-6 uppercase tracking-wide">⚡ Website in 24 hrs — Guaranteed</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:aionwebdevelopers@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-secondary" />
                aionwebdevelopers@gmail.com
              </a>
              <a href="tel:+919444341599" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-secondary" />
                +91 9444341599
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                Remote — Available Worldwide
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {category}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} AionWeb — Custom Business Websites in 24 Hours
          </p>
          {/* <div className="flex items-center gap-4">
            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" aria-label="GitHub" className="hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
