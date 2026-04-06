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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/5 pt-12">
                <div className="flex items-start gap-5 p-10 bg-gray-50 rounded-[3rem] border border-black/5 hover:border-primary/20 transition-colors">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md border border-black/5">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1 italic">Telefonisch</h4>
                    <p className="text-xl font-black text-black italic leading-none">+49 (030) 5 88 43 - 0</p>
                    <span className="text-[10px] text-gray-400 font-bold uppercase mt-2 block">Mo-Fr: 09:00 - 17:00</span>
                  </div>
                </div>
                <div className="flex items-start gap-5 p-10 bg-gray-50 rounded-[3rem] border border-black/5 hover:border-primary/20 transition-colors">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md border border-black/5">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1 italic">Digital</h4>
                    <p className="text-xl font-black text-black italic leading-none">kontakt@kuthe.de</p>
                    <span className="text-[10px] text-gray-400 font-bold uppercase mt-2 block">24/7 Erreichbar</span>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-[3.5rem] border border-black/5 p-10 md:p-12 shadow-xl">
                <div className="mb-10">
                  <h3 className="text-2xl font-black text-black italic uppercase tracking-tighter mb-2">Nachricht senden</h3>
                  <p className="text-xs text-gray-500 font-medium">Wir werden uns so schnell wie möglich bei Ihnen melden.</p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 italic">Anrede</label>
                    <select className="w-full bg-gray-50 border border-black/5 rounded-full px-6 py-4 text-xs font-bold outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                      <option>Herr</option>
                      <option>Frau</option>
                      <option>Divers</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 italic">Vollständiger Name</label>
                    <input type="text" placeholder="Max Mustermann" className="w-full bg-gray-50 border border-black/5 rounded-full px-6 py-4 text-xs font-bold outline-none focus:border-primary transition-all placeholder:text-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 italic">E-Mail Adresse</label>
                    <input type="email" placeholder="name@beispiel.de" className="w-full bg-gray-50 border border-black/5 rounded-full px-6 py-4 text-xs font-bold outline-none focus:border-primary transition-all placeholder:text-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 italic">Telefon (Optional)</label>
                    <input type="tel" placeholder="+49..." className="w-full bg-gray-50 border border-black/5 rounded-full px-6 py-4 text-xs font-bold outline-none focus:border-primary transition-all placeholder:text-gray-300" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 italic">Betreff</label>
                    <input type="text" placeholder="Worum geht es?" className="w-full bg-gray-50 border border-black/5 rounded-full px-6 py-4 text-xs font-bold outline-none focus:border-primary transition-all placeholder:text-gray-300" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 italic">Ihre Nachricht</label>
                    <textarea rows={5} placeholder="Wie können wir Ihnen helfen?" className="w-full bg-gray-50 border border-black/5 rounded-[2rem] px-6 py-5 text-xs font-bold outline-none focus:border-primary transition-all placeholder:text-gray-300 resize-none"></textarea>
                  </div>
                  <div className="md:col-span-2 flex items-start gap-3 px-4">
                    <input type="checkbox" id="dsgvo" className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" />
                    <label htmlFor="dsgvo" className="text-[10px] text-gray-400 font-medium leading-tight cursor-pointer">
                      Ich stimme zu, dass meine Angaben aus dem Kontaktformular zur Beantwortung meiner Anfrage erhoben und verarbeitet werden. Die Daten werden nach abgeschlossener Bearbeitung Ihrer Anfrage gelöscht. Hinweis: Sie können Ihre Einwilligung jederzeit für die Zukunft per E-Mail an kontakt@kuthe.de widerrufen. *
                    </label>
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <button type="submit" className="w-full md:w-auto bg-black text-white px-12 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl hover:shadow-primary/20 active:scale-95 italic">
                      Nachricht Senden
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:w-[400px] flex flex-col">
              <div className="bg-black p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group flex-1">
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
