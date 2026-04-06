import prisma from "@/lib/prisma";
import { Wallet, PieChart, TrendingUp, TrendingDown, Calendar, Search, ArrowUpRight, Download, Filter } from "lucide-react";

export default async function AccountingPage() {
  const payments = await prisma.payment.findMany({
    include: {
      tenant: true
    },
    orderBy: { date: 'desc' }
  });

  const totalIncome = payments.reduce((acc, p) => acc + Number(p.amount), 0);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-black italic tracking-tighter uppercase leading-none">Finanzen</h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Mieteingänge und Kostenübersicht</p>
        </div>
        <button className="bg-primary text-white border-2 border-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95 italic">
          <Download className="w-5 h-5" /> Bericht Exportieren
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[3rem] border-2 border-black shadow-none hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-green-50 rounded-2xl border border-green-200 text-green-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black text-green-600 uppercase tracking-widest italic bg-green-50 px-3 py-1 rounded-full border border-green-200">+12%</span>
          </div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1 italic">Mieteingänge Gesamt</p>
          <h3 className="text-3xl font-black text-black italic uppercase tracking-tighter">€ {totalIncome.toLocaleString('de-DE')}</h3>
        </div>
        <div className="bg-white p-8 rounded-[3rem] border-2 border-black shadow-none hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-red-50 rounded-2xl border border-red-200 text-red-600">
              <TrendingDown className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest italic bg-red-50 px-3 py-1 rounded-full border border-red-200">-3%</span>
          </div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1 italic">Offene Posten</p>
          <h3 className="text-3xl font-black text-black italic uppercase tracking-tighter">€ 4.250,00</h3>
        </div>
        <div className="bg-white p-8 rounded-[3rem] border-2 border-black shadow-none hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-gray-50 rounded-2xl border border-black/5 text-black">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1 italic">Verwaltete Kautionen</p>
          <h3 className="text-3xl font-black text-black italic uppercase tracking-tighter">€ 285.400,00</h3>
        </div>
      </div>

      <div className="bg-white rounded-[4rem] border-2 border-black overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black bg-gray-50">
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Datum</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Mieter / Betreff</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic text-right">Betrag</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Status</th>
              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic text-right">Beleg</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black/5">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-3 text-sm font-black text-black italic">
                    <Calendar className="w-4 h-4 text-gray-300" />
                    {payment.date.toLocaleDateString('de-DE')}
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex flex-col">
                    <span className="text-base font-black text-black italic uppercase leading-none">{payment.tenant.firstName} {payment.tenant.lastName}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">{payment.reference}</span>
                  </div>
                </td>
                <td className="px-10 py-8 text-right">
                  <span className="text-lg font-black text-black italic">€ {Number(payment.amount).toFixed(2).replace('.', ',')}</span>
                </td>
                <td className="px-10 py-8">
                  <span className={`px-4 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border border-black/5 ${payment.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-10 py-8 text-right">
                  <button className="p-3 hover:bg-black hover:text-white border-2 border-transparent hover:border-black rounded-xl transition-all active:scale-90">
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
