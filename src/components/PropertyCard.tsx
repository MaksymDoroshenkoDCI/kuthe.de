"use client";

import Image from "next/image";
import { Building2, MapPin, Maximize2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface PropertyCardProps {
  name: string;
  address: string;
  type: string;
  image: string;
}

export default function PropertyCard({ name, address, type, image }: PropertyCardProps) {
  const { t } = useLanguage();

  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-black/5 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-6 left-6">
          <span className="px-5 py-2 bg-white/95 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-black rounded-full shadow-lg border border-black/5">
            {type}
          </span>
        </div>
      </div>
      
      <div className="p-10">
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-black leading-tight tracking-tight group-hover:text-primary transition-colors italic">
              {name}
            </h3>
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">{address}</span>
            </div>
          </div>
        </div>

        <button className="w-full py-4 bg-gray-50 text-black rounded-2xl text-[11px] font-black uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-all duration-300 italic flex items-center justify-center gap-2">
          {t.properties.viewDetails}
          <Maximize2 className="w-3 h-3 group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
}
