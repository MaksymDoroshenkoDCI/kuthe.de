import prisma from "@/lib/prisma";
import { Gauge, Droplets, Zap, Thermometer, Plus, Calendar, ArrowUpRight, Filter } from "lucide-react";

export default async function MetersPage() {
  const meters = await prisma.meter.findMany({
    include: {
      unit: {
        include: {
          property: true
        }
      },
      readings: {
        orderBy: { readingDate: 'desc' },
        take: 1
      }
    },
    orderBy: { type: 'asc' }
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'WATER': return Droplets;
      case 'ELECTRICITY': return Zap;
      case 'HEAT': return Thermometer;
      default: return Gauge;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'WATER': return 'text-blue-500 bg-blue-50 border-blue-100';
      case 'ELECTRICITY': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'HEAT': return 'text-red-500 bg-red-50 border-red-100';
      default: return 'text-slate-400 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-2">
          <h2 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Zählerstände</h2>
          <p className="text-slate-400 text-sm font-medium">Monitoring und Erfassung von Verbrauchswerten</p>
        </div>
        <button className="bg-primary text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-lg active:scale-95 italic shadow-primary/20">
          <Plus className="w-5 h-5" /> Neuer Ablesewert
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {meters.map((meter) => {
          const Icon = getIcon(meter.type);
          const colorClass = getColor(meter.type);
          const latestReading = meter.readings[0];

          return (
            <div key={meter.id} className="bg-white rounded-[3.5rem] p-10 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 group border border-slate-50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-0"></div>
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="flex items-center gap-6">
                  <div className={`p-5 rounded-[1.5rem] shadow-sm border ${colorClass} transition-all duration-500 group-hover:scale-110`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 italic uppercase tracking-tight">{meter.type} Zähler</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary transition-colors" />
                      SN: {meter.serialNumber}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-end group-hover:bg-white transition-all">
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Letzte Ablesung</span>
                  <span className="text-sm font-black text-slate-900 italic">{latestReading?.readingDate.toLocaleDateString('de-DE') || 'Keine Daten'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 relative z-10">
                <div className="bg-slate-50/50 p-6 rounded-[1.5rem] border border-slate-100 group-hover:bg-white transition-all">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3 italic">Aktueller Stand</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 italic tracking-tighter">{latestReading ? Number(latestReading.value).toLocaleString('de-DE', { minimumFractionDigits: 1 }) : '0,0'}</span>
                    <span className="text-xs font-black text-slate-400 uppercase italic">Units</span>
                  </div>
                </div>

                <div className="bg-slate-50/50 p-6 rounded-[1.5rem] border border-slate-100 group-hover:bg-white transition-all flex flex-col justify-between">
                  <div className="space-y-1">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest italic">Liegenschaft</p>
                    <p className="text-xs font-black text-slate-900 italic uppercase tracking-tight truncate">{meter.unit.property.name}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">Unit {meter.unit.number}</span>
                    <button className="p-3 bg-slate-900 text-white rounded-xl hover:bg-primary transition-all shadow-sm active:scale-95 group-hover:rotate-6">
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

               <div className="mt-8 pt-8 border-t border-slate-100 relative z-10">
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Verbrauchskurve (Trend)</p>
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest italic bg-green-50 px-3 py-1 rounded-full border border-green-100 shadow-sm">-2.4% vs. Vormonat</span>
                 </div>
                 <div className="mt-4 h-1 bg-slate-50 rounded-full overflow-hidden flex items-stretch">
                    <div className="bg-primary/40 w-[65%] group-hover:w-[70%] transition-all duration-1000"></div>
                 </div>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
