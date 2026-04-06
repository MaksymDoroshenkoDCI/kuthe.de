"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
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
    <div className="group flex flex-col items-center text-center space-y-4 hover:scale-105 transition-all duration-300">
      <div className="relative w-[150px] h-[150px] rounded-2xl overflow-hidden shadow-lg border border-black/5 group-hover:shadow-primary/20 group-hover:border-primary/20 transition-all duration-500">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <Maximize2 className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <div className="space-y-1">
        <h4 className="text-[10px] font-black text-black uppercase tracking-widest leading-tight group-hover:text-primary transition-colors italic line-clamp-1">
          {name}
        </h4>
        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider line-clamp-1">
          {address}
        </p>
        <span className="inline-block text-[7px] font-black text-primary uppercase tracking-[0.2em] italic">
          {type}
        </span>
      </div>
    </div>
  );
}
