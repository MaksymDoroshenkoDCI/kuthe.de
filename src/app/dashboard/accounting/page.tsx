import prisma from "@/lib/prisma";
import { Wallet, TrendingUp, TrendingDown, Calendar, ArrowUpRight, Download, Filter } from "lucide-react";

export default async function AccountingPage() {
  const payments = await prisma.payment.findMany({
    include: {
      tenant: true
    },
    orderBy: { date: 'desc' }
  });

  const totalIncome = payments.reduce((acc: number, p) => acc + Number(p.amount), 0);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-2">
          <h2 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Finanzen</h2>
          <p className="text-slate-400 text-sm font-medium">Mieteingänge und Kostenübersicht</p>
        </div>
        <button className="bg-primary text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-lg active:scale-95 italic shadow-primary/20">
          <Download className="w-5 h-5" /> Bericht Exportieren
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-50 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-green-500/5 blur-3xl -z-0 group-hover:bg-green-500/10 transition-all"></div>
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="p-5 bg-green-50 rounded-[1.5rem] group-hover:bg-green-500 group-hover:text-white transition-all duration-500 shadow-sm border border-green-100">
              <TrendingUp className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-black text-green-600 uppercase tracking-widest italic bg-white shadow-sm border border-green-50 px-4 py-2 rounded-full">+12%</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 italic relative z-10">Einnahmen Mtl.</p>
          <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase relative z-10">€ {totalIncome.toLocaleString('de-DE')}</h3>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-50 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-red-500/5 blur-3xl -z-0 group-hover:bg-red-500/10 transition-all"></div>
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="p-5 bg-red-50 rounded-[1.5rem] group-hover:bg-red-500 group-hover:text-white transition-all duration-500 shadow-sm border border-red-100">
              <TrendingDown className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest italic bg-white shadow-sm border border-red-50 px-4 py-2 rounded-full">-3%</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 italic relative z-10">Rückstände</p>
          <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase relative z-10">€ 4.250,00</h3>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-50 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/5 blur-3xl -z-0 group-hover:bg-primary/10 transition-all"></div>
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="p-5 bg-slate-50 rounded-[1.5rem] group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100">
              <Wallet className="w-7 h-7" />
            </div>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 italic relative z-10">Kautionen</p>
          <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase relative z-10">€ 285.400</h3>
        </div>
      </div>

      <div className="bg-white rounded-[4rem] shadow-xl shadow-slate-200/40 border border-slate-50 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Datum</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Zahlung von</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest italic text-right">Summe</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Status</th>
              <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest italic text-right">Aktion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-12 py-10">
                  <div className="flex items-center gap-4 text-sm font-black text-slate-900 italic">
                    <Calendar className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                    {payment.date.toLocaleDateString('de-DE')}
                  </div>
                </td>
                <td className="px-12 py-10">
                  <div className="flex flex-col">
                    <span className="text-base font-black text-slate-900 italic uppercase leading-none">{payment.tenant.firstName} {payment.tenant.lastName}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 italic group-hover:translate-x-1 transition-all">{payment.reference}</span>
                  </div>
                </td>
                <td className="px-12 py-10 text-right">
                  <span className="text-xl font-black text-slate-900 italic tracking-tighter">€ {Number(payment.amount).toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
                </td>
                <td className="px-12 py-10">
                   <div className="flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full w-fit border border-green-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-black text-green-600 uppercase tracking-widest leading-none">VERBUCHT</span>
                    </div>
                </td>
                <td className="px-12 py-10 text-right">
                  <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-sm active:scale-95 group-hover:rotate-12">
                    <ArrowUpRight className="w-6 h-6" />
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
