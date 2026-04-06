"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Mail, MapPin, Phone, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-black/5 pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/logo_klein (1).png" 
                  alt="Arnold Kuthe Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-black italic leading-none tracking-tighter uppercase">ARNOLD KUTHE</span>
                <span className="text-[7px] font-bold text-primary uppercase tracking-[0.1em] leading-tight">IMMOBILIENVERWALTUNGS GMBH</span>
              </div>
            </Link>
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs font-medium uppercase italic tracking-wider">
               Mittelständische Immobilienverwaltung in Berlin - Kontinuität, Qualität, Unabhängigkeit.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary italic">Navigation</h4>
            <div className="flex flex-col gap-4">
              {[t.nav.home, t.nav.portfolio, t.nav.about, t.nav.contact].map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold text-gray-400 hover:text-black transition-colors uppercase italic tracking-widest leading-none">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary italic">Kontakt</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-[10px] font-black text-black uppercase tracking-widest italic">{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black text-black uppercase tracking-widest italic">+49 (030) 5 88 43 - 0</span>
              </div>
              <div className="flex items-center gap-3">
                <Printer className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black text-black uppercase tracking-widest italic">+49 (030) 5 88 43 - 292</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black text-black uppercase tracking-widest italic">kontakt@kuthe.de</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary italic">Newsletter</h4>
            <div className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-gray-50 border border-black/5 rounded-full px-6 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary transition-all placeholder:text-gray-300"
              />
              <button className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all italic shadow-lg active:scale-95">
                Abonnieren
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-8">
            <Link href="/impressum" className="text-[10px] font-black text-gray-400 hover:text-black uppercase tracking-widest italic">Impressum</Link>
            <Link href="/datenschutz" className="text-[10px] font-black text-gray-400 hover:text-black uppercase tracking-widest italic">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
