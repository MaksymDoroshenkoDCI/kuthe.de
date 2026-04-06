"use client";

import { useState } from "react";
import PropertyCard from "./PropertyCard";
import { useLanguage } from "@/lib/LanguageContext";

const REAL_PROPERTIES = [
  {
    id: "1",
    name: "Potsdamer Straße 77-87 & 96",
    address: "10785 Berlin-Tiergarten",
    type: "Büro & Gewerbe",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Brunsbütteler Damm 120-130",
    address: "13581 Berlin-Spandau",
    type: "Gewerbehof",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Pfuelstraße 5",
    address: "10997 Berlin-Kreuzberg",
    type: "Fabrikhof",
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Paul-Lincke-Ufer 42/43",
    address: "10999 Berlin-Kreuzberg",
    type: "Bürolofts",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Bessemerstraße 78 & 80",
    address: "12103 Berlin-Tempelhof",
    type: "Industriepark",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Landhausstraße 33-35",
    address: "10717 Berlin-Wilmersdorf",
    type: "Wohn- & Geschäftshaus",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2670&auto=format&fit=crop"
  }
];

export default function PropertyGrid() {
  const [filter, setFilter] = useState("All");
  const { t } = useLanguage();

  const filteredProperties = filter === "All" 
    ? REAL_PROPERTIES 
    : REAL_PROPERTIES.filter(p => p.type.includes(filter));

  const categories = [
    { label: t.properties.filterAll, value: "All" },
    { label: t.properties.filterOffice, value: "Büro" },
    { label: t.properties.filterCommercial, value: "Gewerbe" },
    { label: t.properties.filterResidential, value: "Wohnen" },
  ];

  return (
    <section id="portfolio" className="py-32 bg-gray-50/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 px-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-12 h-[2px] bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-black tracking-tighter italic">
              {t.properties.title}
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-black/5 shadow-sm overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  filter === cat.value 
                    ? "bg-black text-white" 
                    : "text-gray-400 hover:text-black hover:bg-gray-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
          {filteredProperties.map((property, i) => (
            <div 
              key={property.id} 
              className="opacity-0 animate-in fade-in slide-in-from-bottom-10 duration-700 fill-mode-forwards"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
           <button className="px-12 py-5 bg-white border-2 border-black text-black rounded-full text-sm font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all italic active:scale-95 shadow-xl">
              Ganzes Portfolio laden
           </button>
        </div>
      </div>
    </section>
  );
}
