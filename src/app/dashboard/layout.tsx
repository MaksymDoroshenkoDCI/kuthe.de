import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  Building2, 
  LayoutDashboard, 
  Settings, 
  Users, 
  LogOut,
  PlusCircle,
  BarChart3
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-6 space-y-8 glass">
        <Link href="/dashboard" className="flex items-center gap-3 px-2">
          <div className="p-2 bg-primary rounded-xl shrink-0">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-black text-white italic leading-none">KUTHE</span>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Internal System</p>
          </div>
        </Link>

        <nav className="flex-1 space-y-1">
          {[
            { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
            { name: "Property Portfolio", icon: Building2, href: "/dashboard/properties" },
            { name: "CRM & Tenants", icon: Users, href: "/dashboard/crm" },
            { name: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-200 group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold uppercase tracking-wider">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="space-y-4 pt-8 border-t border-white/5">
          <div className="px-4 py-4 glass rounded-3xl space-y-1">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none">Logged in as</p>
            <p className="text-sm font-bold text-white truncate italic">{session?.user?.name || session?.user?.email || "User"}</p>
            <span className="inline-block px-2 py-0.5 bg-primary/20 text-primary text-[8px] font-black uppercase rounded-md">
              {session?.user?.role || "GUEST"}
            </span>
          </div>

          <button className="w-full flex items-center gap-3 px-4 py-3.5 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all duration-200 group">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto no-scrollbar">
        <header className="h-20 border-b border-white/5 px-12 flex items-center justify-between sticky top-0 bg-transparent glass z-30">
          <h2 className="text-xl font-black text-white italic tracking-tight">MANAGEMENT HUB</h2>
          
          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 bg-primary text-white rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/20">
              <PlusCircle className="w-4 h-4" /> New Property
            </button>
            <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white font-black text-xs italic">
              KD
            </div>
          </div>
        </header>
        
        <div className="p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
