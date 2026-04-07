import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  LogOut,
  BarChart3,
  Home,
  Wallet,
  Gauge
} from "lucide-react";
import NewPropertyModal from "@/components/dashboard/NewPropertyModal";

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
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-slate-900">
      {/* Sidebar */}
      <aside className="w-80 flex flex-col p-8 space-y-10 bg-white border-r border-slate-200/60 sticky top-0 h-screen">
        <Link href="/dashboard" className="flex items-center gap-4 px-2">
          <div className="p-2.5 bg-primary rounded-2xl shrink-0 shadow-lg shadow-primary/20">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 italic leading-none uppercase tracking-tight">ARNOLD KUTHE</span>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Management Portal</p>
          </div>
        </Link>

        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
          {[
            { name: "Übersicht", icon: LayoutDashboard, href: "/dashboard" },
            { name: "Liegenschaften", icon: Building2, href: "/dashboard/properties" },
            { name: "Einheiten", icon: Home, href: "/dashboard/units" },
            { name: "Mieter & Mieten", icon: Users, href: "/dashboard/tenants" },
            { name: "Finanzen", icon: Wallet, href: "/dashboard/accounting" },
            { name: "Zählerstände", icon: Gauge, href: "/dashboard/meters" },
            { name: "Analysen", icon: BarChart3, href: "/dashboard/analytics" },
          ].map((item: any) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3.5 px-6 py-4 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-[1.5rem] transition-all duration-300 group border border-transparent hover:border-slate-100"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[11px] font-black uppercase tracking-wider italic">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="space-y-6 pt-8 border-t border-slate-100">
          <div className="px-6 py-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 space-y-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all"></div>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none relative z-10">Konto</p>
            <p className="text-sm font-black text-slate-900 truncate italic relative z-10">{session?.user?.name || session?.user?.email || "Benutzer"}</p>
            <span className="inline-block px-3 py-1.5 bg-white shadow-sm text-primary text-[9px] font-black uppercase rounded-xl border border-slate-100 italic leading-none relative z-10">
              {session?.user?.role || "GAST"}
            </span>
          </div>

          <button className="w-full flex items-center gap-3.5 px-6 py-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-[1.5rem] transition-all duration-300 group font-black uppercase tracking-wider text-[11px] italic">
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Abmelden</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <header className="h-24 px-12 flex items-center justify-between sticky top-0 bg-white/70 backdrop-blur-xl z-30 border-b border-slate-100/80">
          <h2 className="text-xl font-black text-slate-900 italic tracking-tight uppercase">Dashboard</h2>
          
          <div className="flex items-center gap-6">
            <NewPropertyModal />
            <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-900 font-black text-xs italic group hover:border-primary transition-all cursor-pointer">
              {session?.user?.name?.substring(0, 2).toUpperCase() || "AK"}
            </div>
          </div>
        </header>
        
        <div className="p-12 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
