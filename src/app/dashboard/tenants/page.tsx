import prisma from "@/lib/prisma";
import { Users, Mail, Phone, Calendar, ArrowUpRight, Plus, Building2, Wallet } from "lucide-react";
import Link from "next/link";

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
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-black italic tracking-tighter uppercase leading-none">Mieter & Mieten</h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Zentrale Verwaltung der Mieterdaten und Zahlungsverläufe</p>
        </div>
        <button className="bg-black text-white border-2 border-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-primary transition-all shadow-xl shadow-black/10 active:scale-95 italic">
          <Plus className="w-5 h-5" /> Mieter Hinzufügen
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
        {tenants.map((tenant) => (
          <div key={tenant.id} className="bg-white border-2 border-black rounded-[3rem] p-8 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 group">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center border-2 border-black/5 group-hover:border-black transition-all text-gray-400 group-hover:text-primary font-black text-xl italic shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {tenant.firstName[0]}{tenant.lastName[0]}
                </div>
                <div>
                  <h3 className="text-xl font-black text-black italic leading-none uppercase tracking-tight">{tenant.firstName} {tenant.lastName}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded border border-primary/10">AKTIV</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">{tenant.unit?.property.name} . {tenant.unit?.number}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t-2 border-black/5">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-500 italic">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {tenant.email || 'Keine Email'}
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-500 italic">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {tenant.phone || 'Keine Telefonnummer'}
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-gray-500 italic">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  Seit {tenant.moveInDate?.toLocaleDateString('de-DE')}
                </div>
              </div>

              <div className="mt-4 p-5 bg-gray-50 rounded-2xl border-2 border-black/5 group-hover:border-black transition-all">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Letzte Zahlung</p>
                    <p className="text-lg font-black text-black italic">
                      € {tenant.payments[0] ? Number(tenant.payments[0].amount).toFixed(2) : '0.00'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest mb-1 ${tenant.payments[0]?.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {tenant.payments[0]?.status || 'FEHLT'}
                    </span>
                    <p className="text-[10px] text-gray-500 font-bold italic">{tenant.payments[0]?.date.toLocaleDateString('de-DE')}</p>
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 border-2 border-transparent hover:border-black hover:bg-white rounded-2xl transition-all font-black text-[11px] uppercase tracking-widest italic group/btn">
                <span>Profil Details</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
