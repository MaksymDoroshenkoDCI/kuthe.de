import prisma from "@/lib/prisma";
import { Users, Mail, Phone, Calendar, ArrowUpRight, Plus, Building2, MapPin } from "lucide-react";

export default async function TenantsPage() {
  const tenants = await prisma.tenant.findMany({
    include: {
      unit: {
        include: {
          property: true
        }
      },
      payments: {
        take: 1,
        orderBy: { date: 'desc' }
      }
    },
    orderBy: { lastName: 'asc' }
  });

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-2">
          <h2 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Mieter & Mieten</h2>
          <p className="text-slate-400 text-sm font-medium">Zentrale Verwaltung der Mieterdaten und Zahlungsverläufe</p>
        </div>
        <button className="bg-primary text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-primary/25 active:scale-95 italic">
          <Plus className="w-5 h-5" /> Mieter Hinzufügen
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10">
        {tenants.map((tenant) => (
          <div key={tenant.id} className="bg-white rounded-[3.5rem] p-10 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 group border border-slate-50 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-0 transition-opacity duration-700 opacity-50 group-hover:opacity-100"></div>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-primary/20 transition-all font-black text-2xl italic text-slate-400 group-hover:text-primary shadow-sm">
                  {tenant.firstName[0]}{tenant.lastName[0]}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 italic leading-none uppercase tracking-tight">{tenant.firstName} {tenant.lastName}</h3>
                  <div className="flex flex-col gap-1.5 mt-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic flex items-center gap-1.5 transition-all group-hover:translate-x-1">
                      <Building2 className="w-3 h-3 text-primary/40" />
                      {tenant.unit?.property.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic flex items-center gap-1.5 transition-all group-hover:translate-x-1 hover:text-slate-600">
                      <MapPin className="w-3 h-3 text-primary/40" />
                      Einheit {tenant.unit?.number}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-50 group-hover:bg-white transition-all">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Mail className="w-4 h-4 text-primary/40" />
                  </div>
                  <span className="text-sm font-bold text-slate-500 italic">{tenant.email || 'k.A.'}</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-50 group-hover:bg-white transition-all">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Phone className="w-4 h-4 text-primary/40" />
                  </div>
                  <span className="text-sm font-bold text-slate-500 italic">{tenant.phone || 'k.A.'}</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-50 group-hover:bg-white transition-all">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Calendar className="w-4 h-4 text-primary/40" />
                  </div>
                  <span className="text-sm font-bold text-slate-500 italic">Seit {tenant.moveInDate?.toLocaleDateString('de-DE')}</span>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-slate-50/50 rounded-2xl border border-slate-50 group-hover:bg-white group-hover:border-primary/10 transition-all relative z-10">
              <div className="flex justify-between items-center">
                <div className="space-y-1.5">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none">Letzte Zahlung</p>
                  <p className="text-2xl font-black text-slate-900 italic tracking-tighter">
                    € {tenant.payments[0] ? Number(tenant.payments[0].amount).toFixed(2) : '0.00'}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${tenant.payments[0]?.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border border-green-100 shadow-sm' : 'bg-red-50 text-red-700 border border-red-100 shadow-sm'}`}>
                    {tenant.payments[0]?.status || 'OFFEN'}
                  </span>
                  <p className="text-[10px] text-slate-400 font-bold italic">{tenant.payments[0]?.date.toLocaleDateString('de-DE')}</p>
                </div>
              </div>
            </div>

            <button className="mt-8 w-full flex items-center justify-between px-8 py-5 bg-slate-900 text-white hover:bg-primary rounded-2xl transition-all duration-300 font-black text-[11px] uppercase tracking-widest italic shadow-lg active:scale-95 group/btn relative z-10 overflow-hidden">
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
              <span className="relative z-10">Vollständiges Mieterprofil</span>
              <ArrowUpRight className="w-5 h-5 relative z-10 group-hover/btn:rotate-12 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
