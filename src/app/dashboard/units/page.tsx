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
    <div className="space-y-12">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-2">
          <h2 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Einheiten</h2>
          <p className="text-slate-400 text-sm font-medium">Detaillierte Verwaltung aller Wohn- und Gewerbeeinheiten</p>
        </div>
        <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl active:scale-95 italic">
          <Plus className="w-5 h-5" /> Einheit Hinzufügen
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-6 bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-50">
        <div className="flex-1 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
          <input type="text" placeholder="Suche Einheiten, Etage, Gebäude..." className="w-full bg-slate-50 border border-slate-100 group-hover:border-slate-200 focus:border-primary/30 rounded-2xl py-4.5 pl-14 pr-6 text-sm font-bold italic transition-all outline-none" />
        </div>
        <button className="flex items-center gap-2 px-8 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-900 hover:text-white transition-all font-black text-[11px] uppercase tracking-widest italic shadow-sm">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="bg-white rounded-[3.5rem] shadow-xl shadow-slate-200/40 border border-slate-50 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Einheit</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Liegenschaft</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Größe & Miete</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest italic text-right">Aktion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {units.map((unit: any) => (
              <tr key={unit.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-12 py-10">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-primary/20 transition-all shadow-sm">
                      <Home className="w-7 h-7 text-slate-400 group-hover:text-primary" />
                    </div>
                    <div>
                      <span className="text-xl font-black text-slate-900 italic tracking-tight uppercase leading-none block">{unit.number}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mt-1.5 inline-block bg-slate-100 px-3 py-1 rounded-lg">{unit.floor || 'EG'} . Etage</span>
                    </div>
                  </div>
                </td>
                <td className="px-12 py-10">
                  <div className="flex flex-col">
                    <span className="text-base font-black text-slate-900 italic leading-none uppercase tracking-tight">{unit.property.name}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{unit.property.city}</span>
                  </div>
                </td>
                <td className="px-12 py-10">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-base font-black text-slate-900 italic leading-none">{Number(unit.area).toFixed(2)} m²</span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full w-fit border border-primary/10">€ {Number(unit.baseRent).toFixed(2)} Kalt</span>
                  </div>
                </td>
                <td className="px-12 py-10 text-right">
                  <div className="flex items-center justify-end gap-6">
                    <div className="flex flex-col items-end">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        unit.status === 'RENTED' ? 'bg-green-50 text-green-600 border-green-100' : 
                        unit.status === 'VACANT' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                      }`}>
                        {unit.status}
                      </span>
                    </div>
                    <button className="p-4 hover:bg-slate-900 hover:text-white bg-slate-50 text-slate-400 rounded-2xl transition-all duration-300 shadow-sm active:scale-90 group-hover:rotate-6 border border-slate-100">
                      <ArrowUpRight className="w-6 h-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
