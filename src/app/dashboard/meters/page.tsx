import prisma from "@/lib/prisma";
import { Gauge, Droplets, Flame, Zap, Plus, ArrowUpRight, Building2, Calendar } from "lucide-react";

export default async function MetersPage() {
  const meters = await prisma.meter.findMany({
    include: {
      property: true,
      readings: {
        orderBy: { date: 'desc' },
        take: 2
      }
    }
  });

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-black italic tracking-tighter uppercase leading-none">Zählerstände</h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Energie- и Ressourcenmonitoring</p>
        </div>
        <button className="bg-primary text-white border-2 border-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95 italic">
          <Plus className="w-5 h-5" /> Messung Erfassen
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
        {meters.map((meter) => (
          <div key={meter.id} className="bg-white border-2 border-black rounded-[3rem] p-8 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 group">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center border-2 border-black/5 group-hover:border-black transition-all text-gray-400 group-hover:text-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {meter.type === 'WATER_COLD' || meter.type === 'WATER_HOT' ? <Droplets className="w-8 h-8" /> : 
                   meter.type === 'HEATING' ? <Flame className="w-8 h-8" /> : 
                   meter.type === 'ELECTRICITY' ? <Zap className="w-8 h-8" /> : <Gauge className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className="text-xl font-black text-black italic leading-none uppercase tracking-tight">{meter.type.replace('_', ' ')}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 italic">SN: {meter.serialNumber}</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t-2 border-black/5">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-400 italic">
                  <Building2 className="w-4 h-4" />
                  {meter.property.name}
                </div>
                
                <div className="p-6 bg-gray-50 rounded-2xl border-2 border-black/5 group-hover:border-black transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">Aktueller Stand</p>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">{meter.readings[0]?.date.toLocaleDateString('de-DE')}</p>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-black italic tracking-tighter leading-none">
                      {Number(meter.readings[0]?.value || 0).toFixed(3).replace('.', ',')}
                    </span>
                    <span className="text-sm font-black text-primary uppercase tracking-widest mb-1 italic">
                      {meter.type === 'ELECTRICITY' ? 'kWh' : 'm³'}
                    </span>
                  </div>
                  
                  {meter.readings[1] && (
                    <div className="mt-4 pt-4 border-t border-black/5 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verbrauch Vormonat</span>
                      <span className="text-sm font-black text-green-600 italic">
                        + {(Number(meter.readings[0].value) - Number(meter.readings[1].value)).toFixed(3)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <button className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 border-2 border-transparent hover:border-black hover:bg-white rounded-2xl transition-all font-black text-[11px] uppercase tracking-widest italic group/btn">
                <span>Historie ansehen</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
