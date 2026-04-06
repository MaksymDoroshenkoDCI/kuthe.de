"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Quote } from "lucide-react";

export default function CompanySection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 bg-white flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-4 self-start">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-12 h-[2px] bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Philosophy</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-black leading-[0.9] tracking-tighter italic uppercase">
                  {t.company.title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h2>
              </div>
            </div>

            <div className="lg:col-span-8 relative">
              <Quote className="absolute -top-10 -left-10 w-24 h-24 text-gray-50 -z-10" />
              <div className="space-y-8">
                <p className="text-2xl md:text-3xl font-medium text-gray-800 leading-tight tracking-tight italic">
                  "{t.company.text}"
                </p>
                
                <div className="pt-10 border-t border-black/5 flex flex-wrap gap-12">
                   {t.company.values.split(' · ').map((value, i) => (
                     <div key={i} className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-2 select-none italic">Value 0{i+1}</span>
                        <span className="text-2xl font-black text-black tracking-tighter uppercase italic">{value}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
