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
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 border-r-2 border-black flex flex-col p-6 space-y-8 bg-white">
        <Link href="/dashboard" className="flex items-center gap-3 px-2">
          <div className="p-2 bg-primary rounded-xl shrink-0 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-black text-black italic leading-none uppercase">ARNOLD KUTHE</span>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Internes System</p>
          </div>
        </Link>

        <nav className="flex-1 space-y-2">
          {[
            { name: "Übersicht", icon: LayoutDashboard, href: "/dashboard" },
            { name: "Portfolio", icon: Building2, href: "/dashboard/properties" },
            { name: "CRM & Mieter", icon: Users, href: "/dashboard/crm" },
            { name: "Analysen", icon: BarChart3, href: "/dashboard/analytics" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-5 py-4 text-gray-500 hover:text-black hover:bg-gray-100 rounded-2xl transition-all duration-200 group border-2 border-transparent hover:border-black shadow-none hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-widest italic">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="space-y-4 pt-8 border-t-2 border-black/5">
          <div className="px-5 py-5 bg-gray-50 rounded-[2rem] border-2 border-black space-y-2">
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest leading-none">Angemeldet als</p>
            <p className="text-sm font-black text-black truncate italic">{session?.user?.name || session?.user?.email || "Benutzer"}</p>
            <span className="inline-block px-3 py-1 bg-primary text-white text-[9px] font-black uppercase rounded-lg border border-black italic leading-none">
              {session?.user?.role || "GAST"}
            </span>
          </div>

          <button className="w-full flex items-center gap-3 px-5 py-4 text-red-600 font-black uppercase tracking-widest text-[11px] hover:bg-red-50 rounded-2xl transition-all duration-200 group border-2 border-transparent hover:border-red-600 italic">
            <LogOut className="w-5 h-5" />
            <span>Abmelden</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto">
        <header className="h-20 border-b-2 border-black px-12 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-30">
          <h2 className="text-xl font-black text-black italic tracking-tight uppercase">Management-Zentrum</h2>
          
          <div className="flex items-center gap-4">
            <button className="px-8 py-3 bg-primary text-white rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/20 border-2 border-black active:scale-95 italic">
              <PlusCircle className="w-4 h-4" /> Neues Objekt
            </button>
            <div className="w-11 h-11 rounded-2xl bg-white border-2 border-black flex items-center justify-center text-black font-black text-xs italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {session?.user?.name?.substring(0, 2).toUpperCase() || "AK"}
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
