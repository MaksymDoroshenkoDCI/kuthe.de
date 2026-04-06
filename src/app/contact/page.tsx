"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Mail, MapPin, Phone, Printer, Clock } from "lucide-react";

export default function ContactPage() {
  const { t } = useLanguage();

  const CONTACT_INFO = [
    { label: t.contact.firma, value: "Arnold Kuthe Immobilienverwaltungs- GmbH" },
    { label: t.contact.sitz, value: "Berlin" },
    { label: t.contact.anschrift, value: "Brunsbütteler Damm 120-130, 13581 Berlin" },
    { label: t.contact.telefon, value: "+49 (030) 5 88 43 - 0" },
    { label: t.contact.telefax, value: "+49 (030) 5 88 43 - 292" },
    { label: t.contact.email, value: "kontakt@kuthe.de" },
    { label: t.contact.gericht, value: "Berlin-Charlottenburg, HRB 21843" },
    { label: t.contact.geschaeftsfuehrer, value: "Dipl.-Ing. Stefan Freymuth, Dipl.-Ing. Mathias Bialas, M. Sc. Sebastian Curth" },
    { label: t.contact.gerichtsstand, value: "Berlin" },
    { label: t.contact.behoerde, value: "zugelassen gem. § 34c GewO durch das Bezirksamt Spandau von Berlin" },
    { label: t.contact.ustid, value: "DE 242 310 997" },
  ];

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="flex-1 space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                  <Clock className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">{t.contact.notice}</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-black leading-[0.9] tracking-tighter italic uppercase">
                  {t.contact.title}
                </h1>
                <p className="text-xl text-gray-500 font-medium italic max-w-xl">
                  {t.contact.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-black/5 pt-12">
                <div className="flex items-start gap-4 p-8 bg-gray-50 rounded-[2.5rem] border border-black/5">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-black/5">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Call Us</h4>
                    <p className="text-lg font-black text-black italic">+49 (030) 5 88 43 - 0</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-8 bg-gray-50 rounded-[2.5rem] border border-black/5">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-black/5">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Email Us</h4>
                    <p className="text-lg font-black text-black italic">kontakt@kuthe.de</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-black p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -z-0 group-hover:bg-primary/30 transition-all duration-700" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-10 italic">Company Registry</h3>
                 <div className="space-y-6 relative z-10">
                   {CONTACT_INFO.map((item, i) => (
                     <div key={i} className="flex flex-col gap-1 border-b border-white/10 pb-4 last:border-0">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic">{item.label}</span>
                        <span className="text-sm font-bold text-white tracking-tight">{item.value}</span>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
