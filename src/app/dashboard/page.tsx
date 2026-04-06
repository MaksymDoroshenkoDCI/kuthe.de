import prisma from "@/lib/prisma";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  ArrowUpRight 
} from "lucide-react";

export default async function DashboardPage() {
  const propertiesCount = await prisma.property.count();
  const recentProperties = await prisma.property.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  const stats = [
    { label: "Portfolio Value", value: "€142.5M", icon: TrendingUp, trend: "+12.5%" },
    { label: "Active Properties", value: propertiesCount, icon: Building2, trend: "Stable" },
    { label: "Total Tenants", value: "842", icon: Users, trend: "+3.2%" },
  ];

  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass p-8 rounded-[2rem] border border-white/5 group hover:border-primary/20 transition-all duration-500">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/10 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">{stat.trend}</span>
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Properties */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <h3 className="text-2xl font-black text-white italic tracking-tight">Recent Assets</h3>
          <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline italic">View Full Portfolio</button>
        </div>
        
        <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Asset Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Location</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Type</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentProperties.map((prop) => (
                <tr key={prop.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden">
                        <Building2 className="w-5 h-5 text-gray-500" />
                      </div>
                      <span className="font-bold text-white italic tracking-tight">{prop.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-400 font-medium">{prop.city}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      {prop.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                      <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{prop.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-primary/10 rounded-lg group/btn transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover/btn:text-primary transition-colors" />
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
