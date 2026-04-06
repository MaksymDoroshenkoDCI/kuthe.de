"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { ArrowRight, Building2, MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50 skew-x-12 translate-x-24" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-8 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">Established in Berlin</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-black mb-8 leading-[0.9] tracking-tighter italic">
              {t.hero.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? "text-primary block" : "block"}>
                  {word}
                </span>
              ))}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed font-medium">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-6">
              <button className="bg-black text-white px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-3 shadow-2xl hover:shadow-primary/40 group active:scale-95 italic">
                {t.hero.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <a href="#about" className="bg-white text-black border-2 border-black/5 px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:border-primary transition-all active:scale-95 italic flex items-center gap-2">
                Über uns <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </a>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mt-24 border-t border-black/5 pt-12">
              {[
                { label: "Gegründet", value: "1972", icon: ShieldCheck },
                { label: "Portfolio", value: "Eigener Bestand", icon: Building2 },
                { label: "Standort", value: "Berlin", icon: MapPin },
                { label: "Anspruch", value: "Premium", icon: ShieldCheck },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">{stat.label}</span>
                  <span className="text-2xl font-black text-black tracking-tight">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block flex-1 relative h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-black/5">
            <Image 
               src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
               alt="Berlin Architecture"
               fill
               className="object-cover"
               priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
