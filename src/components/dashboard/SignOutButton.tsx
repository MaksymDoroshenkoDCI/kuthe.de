'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="w-full flex items-center gap-3.5 px-6 py-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-[1.5rem] transition-all duration-300 group font-black uppercase tracking-wider text-[11px] italic"
    >
      <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span>Abmelden</span>
    </button>
  );
}
