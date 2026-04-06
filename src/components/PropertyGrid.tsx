"use client";

import { useState } from "react";
import PropertyCard from "./PropertyCard";
import { useLanguage } from "@/lib/LanguageContext";

const REAL_PROPERTIES = [
  { id: "1", name: "Potsdamer Straße 77-87", address: "Tiergarten", type: "Büro & Gewerbe", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400" },
  { id: "2", name: "Brunsbütteler Damm 120", address: "Spandau", type: "Gewerbehof", image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=400" },
  { id: "3", name: "Pfuelstraße 5", address: "Kreuzberg", type: "Fabrikhof", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=400" },
  { id: "4", name: "Paul-Lincke-Ufer 42", address: "Kreuzberg", type: "Bürolofts", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400" },
  { id: "5", name: "Bessemerstraße 78", address: "Tempelhof", type: "Industriepark", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400" },
  { id: "6", name: "Landhausstraße 33", address: "Wilmersdorf", type: "Wohnhaus", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=400" },
  { id: "7", name: "Am Postbahnhof 15", address: "Friedrichshain", type: "Loft-Büro", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400" },
  { id: "8", name: "Kurfürstendamm 182", address: "Charlottenburg", type: "Gewerbe", image: "https://images.unsplash.com/photo-1449156001935-d28bc3df7245?q=80&w=400" },
  { id: "9", name: "Friedrichstraße 200", address: "Mitte", type: "Bürohaus", image: "https://images.unsplash.com/photo-1554995207-c18c20360a59?q=80&w=400" },
  { id: "10", name: "Leipziger Platz 15", address: "Mitte", type: "Gewerbe", image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=400" },
  { id: "11", name: "Wilhelmsruher Damm 142", address: "Wittenau", type: "Gewerbe", image: "https://images.unsplash.com/photo-1430285561322-782c4b27c672?q=80&w=400" },
  { id: "12", name: "Charlottenstraße 59", address: "Mitte", type: "Büro & Gewerbe", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400" },
  { id: "13", name: "Stresemannstraße 72", address: "Kreuzberg", type: "Gewerbebau", image: "https://images.unsplash.com/photo-1459767129954-151026779484?q=80&w=400" },
  { id: "14", name: "Alt-Moabit 91", address: "Moabit", type: "Bürozentrum", image: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=400" },
  { id: "15", name: "Oranienstraße 183", address: "Kreuzberg", type: "Gewerbehof", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400" },
  { id: "16", name: "Kantstraße 150", address: "Charlottenburg", type: "Büro", image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=400" },
  { id: "17", name: "Hauptstraße 11", address: "Schöneberg", type: "Gewerbehaus", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400" },
  { id: "18", name: "Ringbahnstraße 34", address: "Tempelhof", type: "Industriebau", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=400" },
  { id: "19", name: "Sonnenallee 223", address: "Neukölln", type: "Gewerbe", image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=400" },
  { id: "20", name: "Eichborndamm 167", address: "Reinickendorf", type: "Büropark", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=400" },
  { id: "21", name: "Kniprodestraße 113", address: "Prenzlauer Berg", type: "Fabrikgebäude", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=400" }
];

export default function PropertyGrid() {
  const [filter, setFilter] = useState("All");
  const { t } = useLanguage();

  const filteredProperties = filter === "All" 
    ? REAL_PROPERTIES 
    : REAL_PROPERTIES.filter(p => p.type.includes(filter) || p.name.includes(filter));

  return (
    <section id="portfolio" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center justify-center mb-20 space-y-6 text-center">
            <div className="flex items-center gap-2">
              <span className="w-12 h-[2px] bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Portfolio</span>
              <span className="w-12 h-[2px] bg-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter italic uppercase">
              {t.properties.title}
            </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-12">
          {filteredProperties.map((property, i) => (
            <div 
              key={property.id} 
              className="opacity-0 animate-in fade-in zoom-in duration-500 fill-mode-forwards"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
           <button className="px-10 py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all italic active:scale-95 shadow-xl">
              Ganzes Portfolio laden (21+)
           </button>
        </div>
      </div>
    </section>
  );
}
