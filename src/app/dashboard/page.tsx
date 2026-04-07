import prisma from "@/lib/prisma";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  ArrowUpRight 
} from "lucide-react";

export default async function DashboardPage() {
  const propertiesCount = await prisma.property.count();

  // Use raw queries for newer models – avoids IDE cache type errors
  const [unitsRow] = await prisma.$queryRaw<[{ count: bigint }]>`SELECT COUNT(*)::int as count FROM "Unit"`;
  const [tenantsRow] = await prisma.$queryRaw<[{ count: bigint }]>`SELECT COUNT(*)::int as count FROM "Tenant"`;
  const unitsCount = Number(unitsRow?.count ?? 0);
  const tenantsCount = Number(tenantsRow?.count ?? 0);

  const recentProperties = await prisma.property.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  const stats = [
    { label: "Portfolio-Objekte", value: propertiesCount, icon: Building2, trend: "Stabil" },
    { label: "Verwaltete Einheiten", value: unitsCount, icon: TrendingUp, trend: "+5.1%" },
    { label: "Aktive Mieter", value: tenantsCount, icon: Users, trend: "+2.4%" },
  ];

  return (
    <div className="space-y-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Übersicht</h1>
        <p className="text-slate-400 text-sm font-medium">Willkommen zurück. Hier ist der aktuelle Status Ihres Portfolios.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {stats.map((stat: any) => (
          <div key={stat.label} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 group border border-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-0"></div>
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="p-5 bg-slate-50 rounded-[1.5rem] group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                <stat.icon className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest italic bg-white shadow-sm border border-slate-100 px-4 py-2 rounded-full">{stat.trend}</span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 italic relative z-10">{stat.label}</p>
            <h3 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase relative z-10 line-clamp-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Properties */}
      <div className="space-y-10">
        <div className="flex justify-between items-end px-4">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-slate-900 italic tracking-tight uppercase leading-none">Aktuelle Objekte</h3>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest italic">Zuletzt verwaltete Liegenschaften</p>
          </div>
          <button className="text-[11px] font-black text-slate-600 hover:text-primary uppercase tracking-widest transition-all italic flex items-center gap-2 group">
            Gesamtes Portfolio <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
        
        <div className="bg-white rounded-[3.5rem] shadow-xl shadow-slate-200/40 border border-slate-50 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Objektname</th>
                <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Standort</th>
                <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Typ</th>
                <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest italic text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentProperties.map((prop: any) => (
                <tr key={prop.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-12 py-10">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-primary/20 transition-all shadow-sm">
                        <Building2 className="w-7 h-7 text-slate-400 group-hover:text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xl font-black text-slate-900 italic tracking-tight uppercase leading-none">{prop.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 italic transition-all group-hover:translate-x-1">{prop.address}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-12 py-10 text-sm text-slate-500 font-bold italic">{prop.city}</td>
                  <td className="px-12 py-10">
                    <span className="px-5 py-2 bg-slate-100/50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100">
                      {prop.type.replaceAll('_', ' ')}
                    </span>
                  </td>
                  <td className="px-12 py-10 text-right">
                    <button className="p-4 hover:bg-primary hover:text-white bg-slate-50 text-slate-400 rounded-2xl transition-all duration-300 shadow-sm active:scale-90 group-hover:rotate-6">
                      <ArrowUpRight className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
