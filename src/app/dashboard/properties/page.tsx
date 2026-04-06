import prisma from "@/lib/prisma";
import { Building2, MapPin, Home, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({
    include: {
      units: true,
    },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-2">
          <h2 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Liegenschaften</h2>
          <p className="text-slate-400 text-sm font-medium">Gesamtübersicht Ihres Immobilienportfolios</p>
        </div>
        <button className="bg-primary text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-primary/25 active:scale-95 italic">
          <Plus className="w-5 h-5" /> Objekt Hinzufügen
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 group border border-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-3xl -z-0 group-hover:bg-primary/10 transition-all duration-700"></div>
            
            <div className="flex flex-col md:flex-row gap-10 relative z-10">
              <div className="w-full md:w-56 h-56 bg-slate-50 rounded-[2.5rem] flex items-center justify-center overflow-hidden shrink-0 shadow-inner border border-slate-100/50">
                {property.imageUrl[0] ? (
                  <img src={property.imageUrl[0]} alt={property.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <Building2 className="w-16 h-16 text-slate-200" />
                )}
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-5 py-1.5 bg-white text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-100 shadow-sm">
                      {property.type.replace('_', ' ')}
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-4 py-1.5 rounded-full border border-green-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      AKTIV
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 italic uppercase tracking-tight leading-tight">{property.name}</h3>
                  <p className="text-slate-400 flex items-center gap-2 text-sm font-bold italic">
                    <MapPin className="w-4 h-4 text-primary/40" />
                    {property.address}, {property.zipCode} {property.city}
                  </p>
                </div>

                <div className="flex items-center gap-6 mt-10">
                  <div className="flex items-center gap-3 bg-slate-50/80 px-6 py-4 rounded-[1.5rem] border border-slate-100 shadow-sm group-hover:bg-white transition-all">
                    <Home className="w-5 h-5 text-primary/40" />
                    <span className="text-lg font-black text-slate-900 italic tracking-tight">{property.units.length}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Einheiten</span>
                  </div>
                  
                  <Link href={`/dashboard/properties/${property.id}`} className="ml-auto">
                    <button className="p-5 bg-slate-900 text-white rounded-2xl hover:bg-primary transition-all duration-300 shadow-lg active:scale-95 group-hover:rotate-6">
                      <ArrowUpRight className="w-7 h-7" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
