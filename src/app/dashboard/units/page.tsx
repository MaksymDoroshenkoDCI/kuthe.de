import prisma from "@/lib/prisma";
import { Home, MapPin, Euro, ArrowUpRight, Plus, Search, Filter, Users } from "lucide-react";
import Link from "next/link";

export default async function UnitsPage() {
  const units = await prisma.unit.findMany({
    include: {
      property: true,
      tenants: true,
    },
    orderBy: { property: { name: 'asc' } }
  });

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-black italic tracking-tighter uppercase leading-none">Einheiten</h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Detaillierte Verwaltung aller Wohn- und Gewerbeeinheiten</p>
        </div>
        <button className="bg-primary text-white border-2 border-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95 italic">
          <Plus className="w-5 h-5" /> Einheit Hinzufügen
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-[2.5rem] border-2 border-black">
        <div className="flex-1 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Suche Einheiten..." className="w-full bg-gray-50 border-2 border-black/5 hover:border-black/20 focus:border-black rounded-2xl py-4 pl-14 pr-6 text-sm font-bold italic transition-all outline-none" />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-gray-50 border-2 border-black rounded-2xl hover:bg-black hover:text-white transition-all font-black text-xs uppercase tracking-widest italic">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="bg-white rounded-[3.5rem] border-2 border-black overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black bg-gray-50">
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Einheit</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Liegenschaft</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Größe & Miete</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Status & Mieter</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black/5">
            {units.map((unit) => (
              <tr key={unit.id} className="hover:bg-gray-50/70 transition-colors group">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border-2 border-black/5 group-hover:border-black transition-all">
                      <Home id={`unit-icon-${unit.id}`} className="w-6 h-6 text-gray-400 group-hover:text-primary" />
                    </div>
                    <div>
                      <span className="text-lg font-black text-black italic tracking-tighter uppercase leading-none block">{unit.number}</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">{unit.floor || 'EG'} . Etage</span>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-black italic leading-none">{unit.property.name}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{unit.property.city}</span>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-black text-black italic leading-none">{Number(unit.area).toFixed(2)} m²</span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">€ {Number(unit.baseRent).toFixed(2)} Kalt</span>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex flex-col gap-2">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit border ${
                      unit.status === 'RENTED' ? 'bg-green-50 text-green-600 border-green-200' : 
                      unit.status === 'VACANT' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'
                    }`}>
                      {unit.status}
                    </span>
                    {unit.tenants[0] && (
                      <span className="text-[11px] font-black text-black italic flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {unit.tenants[0].firstName} {unit.tenants[0].lastName}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-10 py-8 text-right">
                  <button className="p-3 bg-white hover:bg-black hover:text-white border-2 border-black/10 hover:border-black rounded-xl transition-all shadow-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-90">
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

