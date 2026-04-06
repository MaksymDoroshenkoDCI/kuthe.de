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
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-black italic tracking-tighter uppercase leading-none">Liegenschaften</h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Gesamtübersicht Ihres Immobilienportfolios</p>
        </div>
        <button className="bg-primary text-white border-2 border-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95 italic">
          <Plus className="w-5 h-5" /> Objekt Hinzufügen
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {properties.map((property) => (
          <div key={property.id} className="bg-white border-2 border-black rounded-[3rem] p-8 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 group">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-48 h-48 bg-gray-50 rounded-[2rem] border-2 border-black flex items-center justify-center overflow-hidden shrink-0">
                {property.imageUrl[0] ? (
                  <img src={property.imageUrl[0]} alt={property.name} className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-12 h-12 text-gray-300" />
                )}
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-md border border-primary/20">
                      {property.type.replace('_', ' ')}
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full border border-green-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      {property.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-black italic mt-4 uppercase tracking-tight">{property.name}</h3>
                  <p className="text-gray-500 flex items-center gap-1.5 text-sm font-bold mt-1">
                    <MapPin className="w-4 h-4" />
                    {property.address}, {property.zipCode} {property.city}
                  </p>
                </div>

                <div className="flex items-center gap-6 mt-8">
                  <div className="flex items-center gap-2 bg-gray-50 px-5 py-3 rounded-2xl border border-black/5">
                    <Home className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-black text-black italic">{property.units.length}</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Einheiten</span>
                  </div>
                  
                  <Link href={`/dashboard/properties/${property.id}`} className="ml-auto">
                    <button className="p-4 bg-black text-white rounded-2xl hover:bg-primary border-2 border-black transition-all active:scale-95 group-hover:rotate-12">
                      <ArrowUpRight className="w-6 h-6" />
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
