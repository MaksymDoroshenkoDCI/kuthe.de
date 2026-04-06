'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black font-sans">
      {/* Background with blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Berlin Building Background"
          fill
          className="object-cover opacity-40 blur-xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-primary/20" />
      </div>

      {/* Decorative gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 animate-in fade-in zoom-in-95 duration-700">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group text-white/60 hover:text-white transition-colors duration-200">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">Back to site</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">KUTHE</span>
          </div>
        </div>

        <div className="glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white italic tracking-tight">Internal Access.</h1>
            <p className="text-sm text-gray-400 font-medium tracking-wide">Enter your professional credentials to manage the KUTHE portfolio.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 pl-4">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium placeholder:text-gray-600"
                    placeholder="name@kuthe.de"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 pl-4">Security Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium placeholder:text-gray-600"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase font-black tracking-widest p-4 rounded-xl text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Authorize Access</>
              )}
            </button>
          </form>

          <div className="pt-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600">
              Authorized personnel only. <br/> Access is monitored and recorded.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
