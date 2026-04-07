import prisma from "@/lib/prisma";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  Calendar,
  PieChart as PieChartIcon
} from "lucide-react";

export default async function AnalyticsPage() {
  // Fetch real data for calculations
  const propertiesCount = await prisma.property.count();
  const units = await prisma.unit.findMany();
  const tenants = await prisma.tenant.count();
  const payments = await prisma.payment.findMany({
    take: 10,
    orderBy: { date: 'desc' },
    include: { tenant: true }
  });

  const occupiedUnits = units.filter((u: any) => u.status === 'RENTED').length;
  const vacantUnits = units.filter((u: any) => u.status === 'VACANT').length;
  const occupancyRate = units.length > 0 ? (occupiedUnits / units.length) * 100 : 0;

  return (
    <div className="space-y-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Analytik</h1>
        <p className="text-slate-400 text-sm font-medium">Umfassende Berichterstattung und Markteinblicke.</p>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {[
          { label: "Belegungsrate", value: `${occupancyRate.toFixed(1)}%`, trend: "+1.2%", icon: PieChartIcon, pos: true },
          { label: "Portfolio-Wert", value: "€ 4.2M", trend: "+5.4%", icon: Building2, pos: true },
          { label: "Aktive Verträge", value: tenants, trend: "Stabil", icon: Users, pos: true },
          { label: "Rückstände", value: "€ 12.4k", trend: "-8%", icon: TrendingDown, pos: false },
        ].map((kpi: any) => (
          <div key={kpi.label} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-50 group hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <kpi.icon className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest italic px-3 py-1.5 rounded-full border ${kpi.pos ? 'text-green-600 bg-green-50 border-green-100' : 'text-red-600 bg-red-50 border-red-100'}`}>
                {kpi.trend}
              </span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1 italic">{kpi.label}</p>
            <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase">{kpi.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Occupancy Distribution */}
        <div className="bg-white p-12 rounded-[4rem] shadow-xl shadow-slate-200/40 border border-slate-50 relative overflow-hidden group">
          <h3 className="text-2xl font-black text-slate-900 italic uppercase tracking-tight mb-10">Liegenschaften-Status</h3>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="relative w-56 h-56 group-hover:rotate-6 transition-transform duration-700">
               {/* Simple SVG Chart Representation */}
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path className="text-slate-100" strokeDasharray="100, 100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-primary" strokeDasharray={`${occupancyRate.toFixed(0)}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900 italic">{occupancyRate.toFixed(0)}%</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">BELEGT</span>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              {[
                { label: "Vermietet", value: occupiedUnits, color: "bg-primary", sub: "Einheiten weltweit" },
                { label: "Leerstand", value: vacantUnits, color: "bg-slate-200", sub: "Sofort verfügbar" },
                { label: "In Wartung", value: 0, color: "bg-slate-400", sub: "Modernisierungen" }
              ].map((item: any) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm font-black text-slate-900 italic uppercase tracking-tight">{item.label}</span>
                    </div>
                    <span className="text-lg font-black text-slate-900 italic">{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${(item.value / units.length) * 100}%` }} />
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest pl-6">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Revenue Preview */}
        <div className="bg-white p-12 rounded-[4rem] shadow-xl shadow-slate-200/40 border border-slate-50 group">
          <div className="flex justify-between items-end mb-10">
            <h3 className="text-2xl font-black text-slate-900 italic uppercase tracking-tight">Mieteingänge (MTL.)</h3>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end justify-between h-56 gap-4 px-2">
            {[45, 60, 55, 80, 75, 90, 85].map((height: number, i: number) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                <div className="w-full relative">
                  <div 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl group-hover/bar:bg-primary group-hover/bar:border-primary transition-all duration-500 ease-out flex items-end overflow-hidden group-hover/bar:shadow-lg group-hover/bar:shadow-primary/20"
                    style={{ height: `${height}%` }}
                  >
                     <div className="absolute top-2 w-full text-center text-[9px] font-black text-primary italic opacity-0 group-hover/bar:opacity-100 transition-opacity">
                        €{height}k
                     </div>
                  </div>
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL'][i]}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-[10px] text-slate-400 font-bold italic uppercase tracking-widest">Projektierte vs. reale Einnahmen pro Quartal</p>
        </div>
      </div>

      {/* Bottom Section: Recent Log */}
      <div className="bg-slate-900 text-white rounded-[4rem] p-12 shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] -z-0"></div>
         <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-4xl font-black italic uppercase tracking-tighter">Letzte Aktivitäten</h3>
              <p className="text-primary/60 text-[10px] font-black uppercase tracking-[0.2em] italic">Transaktionen & Status-Updates</p>
            </div>
            <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-[11px] tracking-widest italic hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10 flex items-center gap-3">
                <Calendar className="w-4 h-4" /> Vollständiger Log
            </button>
         </div>

         <div className="space-y-6 relative z-10">
            {payments.slice(0, 4).map((p: any, i: number) => (
              <div key={p.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all group/item">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary group-hover/item:rotate-12 transition-transform">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-black italic uppercase tracking-tight">Mietzahlung: {p.tenant.lastName}</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest italic">{p.date.toLocaleDateString('de-DE')}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-10 mt-6 md:mt-0">
                  <span className="text-xl font-black italic text-primary">+€{Number(p.amount).toFixed(2)}</span>
                  <button className="p-4 bg-white/5 rounded-2xl text-white/40 group-hover/item:text-white group-hover/item:bg-primary transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}

const TrendingDown = ({ className }: { className: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
);
