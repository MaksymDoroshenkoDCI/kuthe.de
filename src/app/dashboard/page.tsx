import prisma from "@/lib/prisma";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  ArrowUpRight 
} from "lucide-react";

export default async function DashboardPage() {
  const propertiesCount = await prisma.property.count();
  const unitsCount = await prisma.unit.count();
  const tenantsCount = await prisma.tenant.count();
  const recentProperties = await prisma.property.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { units: true }
  });

  const stats = [
    { label: "Portfolio-Objekte", value: propertiesCount, icon: Building2, trend: "Stabil" },
    { label: "Verwaltete Einheiten", value: unitsCount, icon: TrendingUp, trend: "+5.1%" },
    { label: "Aktive Mieter", value: tenantsCount, icon: Users, trend: "+2.4%" },
  ];

  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border-2 border-black group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-gray-50 rounded-2xl border border-black/5 group-hover:bg-primary group-hover:text-white transition-colors">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic bg-primary/10 px-3 py-1 rounded-full">{stat.trend}</span>
            </div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">{stat.label}</p>
            <h3 className="text-4xl font-black text-black italic tracking-tighter uppercase">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Properties */}
      <div className="space-y-8">
        <div className="flex justify-between items-end px-2">
          <div className="space-y-1">
            <h3 className="text-3xl font-black text-black italic tracking-tight uppercase leading-none">Aktuelle Objekte</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Zuletzt zum Portfolio hinzugefügt</p>
          </div>
          <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline italic bg-white px-6 py-3 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-all">Gesamtes Portfolio</button>
        </div>
        
        <div className="bg-white rounded-[3rem] border-2 border-black overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black bg-gray-50">
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Objektname</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Standort</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Typ</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic text-right">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black/5">
              {recentProperties.map((prop) => (
                <tr key={prop.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-black/5 group-hover:border-black transition-colors">
                        <Building2 className="w-6 h-6 text-gray-400 group-hover:text-primary" />
                      </div>
                      <span className="text-lg font-black text-black italic tracking-tight uppercase leading-none">{prop.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-sm text-gray-500 font-bold italic">{prop.city}</td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-1.5 bg-gray-100 rounded-lg text-[9px] font-black text-gray-500 uppercase tracking-widest border border-black/5">
                      {prop.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full w-fit border border-green-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                      <span className="text-[10px] font-black text-green-600 uppercase tracking-widest leading-none">AKTIV</span>
                    </div>
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
    </div>
  );
}
