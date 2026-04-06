"use client";

import { useState } from "react";
import PropertyCard from "./PropertyCard";
import { useLanguage } from "@/lib/LanguageContext";

const PORTFOLIO_IMAGES = [
  "/portfolio/Знімок екрана 2026-04-06 о 19.16.53.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.17.03.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.17.13.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.17.22.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.17.36.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.17.42.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.17.49.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.17.57.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.18.05.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.18.12.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.18.20.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.18.26.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.18.32.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.18.40.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.18.51.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.18.58.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.19.04.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.19.10.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.19.15.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.19.22.png",
  "/portfolio/Знімок екрана 2026-04-06 о 19.19.28.png",
];

const REAL_PROPERTIES = PORTFOLIO_IMAGES.map((img, i) => ({
  id: String(i + 1),
  name: `Property ${i + 1}`, // Placeholder names, address/type will follow
  address: "Berlin Core",
  type: i % 2 === 0 ? "Büro & Gewerbe" : "Gewerbehof",
  image: img
}));

// Better names and data for first few for realism
const DATA = [
  { name: "Potsdamer Straße 77-87", address: "Tiergarten", type: "Büro & Gewerbe" },
  { name: "Brunsbütteler Damm 120", address: "Spandau", type: "Gewerbehof" },
  { name: "Pfuelstraße 5", address: "Kreuzberg", type: "Fabrikhof" },
  { name: "Paul-Lincke-Ufer 42", address: "Kreuzberg", type: "Bürolofts" },
  { name: "Bessemerstraße 78", address: "Tempelhof", type: "Industriepark" },
  { name: "Landhausstraße 33", address: "Wilmersdorf", type: "Wohnhaus" },
  { name: "Am Postbahnhof 15", address: "Friedrichshain", type: "Loft-Büro" },
  { name: "Kurfürstendamm 182", address: "Charlottenburg", type: "Gewerbe" },
  { name: "Friedrichstraße 200", address: "Mitte", type: "Bürohaus" },
  { name: "Leipziger Platz 15", address: "Mitte", type: "Gewerbe" },
  { name: "Wilhelmsruher Damm 142", address: "Wittenau", type: "Gewerbe" },
  { name: "Charlottenstraße 59", address: "Mitte", type: "Büro & Gewerbe" },
  { name: "Stresemannstraße 72", address: "Kreuzberg", type: "Gewerbebau" },
  { name: "Alt-Moabit 91", address: "Moabit", type: "Bürozentrum" },
  { name: "Oranienstraße 183", address: "Kreuzberg", type: "Gewerbehof" },
  { name: "Kantstraße 150", address: "Charlottenburg", type: "Büro" },
  { name: "Hauptstraße 11", address: "Schöneberg", type: "Gewerbehaus" },
  { name: "Ringbahnstraße 34", address: "Tempelhof", type: "Industriebau" },
  { name: "Sonnenallee 223", address: "Neukölln", type: "Gewerbe" },
  { name: "Eichborndamm 167", address: "Reinickendorf", type: "Büropark" },
  { name: "Kniprodestraße 113", address: "Prenzlauer Berg", type: "Fabrikgebäude" },
];

const COMPLETED_PROPERTIES = PORTFOLIO_IMAGES.map((img, i) => ({
  id: String(i + 1),
  name: DATA[i]?.name || `Property ${i + 1}`,
  address: DATA[i]?.address || "Berlin",
  type: DATA[i]?.type || "Gewerbe",
  image: img
}));

export default function PropertyGrid() {
  const { t } = useLanguage();

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
          {COMPLETED_PROPERTIES.map((property) => (
            <div 
              key={property.id} 
              className="fade-in"
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
           <button className="px-10 py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all italic active:scale-95 shadow-xl">
              Ganzes Portfolio laden (21)
           </button>
        </div>
      </div>
    </section>
  );
}
