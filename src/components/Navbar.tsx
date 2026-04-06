"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LogIn, Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith('/dashboard')) return null;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "py-3 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-md" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
            <Image 
              src="/logo_klein (1).png" 
              alt="Arnold Kuthe Logo" 
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-black italic leading-none tracking-tighter">ARNOLD KUTHE</span>
            <span className="text-[7px] md:text-[8px] font-bold text-primary uppercase tracking-[0.05em] leading-tight">IMMOBILIENVERWALTUNGS GMBH</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { name: t.nav.home, href: "/" },
            { name: t.nav.portfolio, href: "/#portfolio" },
            { name: t.nav.about, href: "/#about" },
            { name: t.nav.contact, href: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] font-black uppercase tracking-[0.15em] text-black/60 hover:text-primary transition-colors italic"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex bg-gray-100/80 rounded-full p-1 border border-black/5">
            <button 
              onClick={() => setLocale("de")}
              className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${locale === 'de' ? 'bg-white text-primary shadow-sm' : 'text-black/40 hover:text-black'}`}
            >
              DE
            </button>
            <button 
              onClick={() => setLocale("en")}
              className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${locale === 'en' ? 'bg-white text-primary shadow-sm' : 'text-black/40 hover:text-black'}`}
            >
              EN
            </button>
          </div>

          <Link href="/login" className="hidden sm:block">
            <button className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg hover:shadow-primary/20 active:scale-95 italic">
              <LogIn className="w-4 h-4" />
              {t.nav.dashboard}
            </button>
          </Link>
          
          <button 
            className="md:hidden p-2 text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-black/5 p-6 animate-in slide-in-from-top duration-300 shadow-2xl">
          <div className="flex flex-col gap-6">
            {[
              { name: t.nav.home, href: "/" },
              { name: t.nav.portfolio, href: "/#portfolio" },
              { name: t.nav.about, href: "/#about" },
              { name: t.nav.contact, href: "/contact" },
              { name: t.nav.dashboard, href: "/login" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-black uppercase tracking-wider text-black/60 hover:text-primary italic"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex bg-gray-100 rounded-full p-1 border border-black/5 w-fit">
              <button 
                onClick={() => { setLocale("de"); setMobileMenuOpen(false); }}
                className={`px-6 py-2 rounded-full text-xs font-black transition-all ${locale === 'de' ? 'bg-white text-primary shadow-sm' : 'text-black/40'}`}
              >
                DEUTSCH
              </button>
              <button 
                onClick={() => { setLocale("en"); setMobileMenuOpen(false); }}
                className={`px-6 py-2 rounded-full text-xs font-black transition-all ${locale === 'en' ? 'bg-white text-primary shadow-sm' : 'text-black/40'}`}
              >
                ENGLISH
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
