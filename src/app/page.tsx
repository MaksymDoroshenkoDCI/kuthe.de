"use client";

import Hero from "@/components/Hero";
import PropertyGrid from "@/components/PropertyGrid";
import CompanySection from "@/components/CompanySection";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent z-10" />
        <PropertyGrid />
        <CompanySection />
      </div>
    </div>
  );
}
