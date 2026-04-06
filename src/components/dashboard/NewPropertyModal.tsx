'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { createProperty } from '@/app/actions/properties';
import { X, Building2, MapPin, FileText, Loader2, CheckCircle2, AlertCircle, PlusCircle } from 'lucide-react';

const PROPERTY_TYPES = [
  { value: 'OFFICE_BUILDING', label: 'Bürogebäude' },
  { value: 'FACTORY_YARD', label: 'Fabrikhof' },
  { value: 'COMMERCIAL_YARD', label: 'Gewerbehof' },
  { value: 'INDUSTRIAL_LAND', label: 'Industriegrundstück' },
  { value: 'NURSING_HOME', label: 'Pflegeheim' },
  { value: 'OTHER', label: 'Sonstiges' },
];

export default function NewPropertyModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Mount guard for SSR-safe portal
  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function handleOpen() {
    setResult(null);
    setOpen(true);
  }

  function handleClose() {
    if (isPending) return;
    setOpen(false);
    setResult(null);
    formRef.current?.reset();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setResult(null);
    startTransition(async () => {
      const res = await createProperty(fd);
      setResult(res);
      if (res.success) {
        formRef.current?.reset();
        setTimeout(() => { setOpen(false); setResult(null); }, 1800);
      }
    });
  }

  const modal = open && (
    /* Full-screen overlay scrollable, centers modal vertically */
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto"
      aria-modal="true"
      role="dialog"
    >
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Centering wrapper */}
      <div className="flex min-h-full items-center justify-center p-4 py-10">
        {/* Modal card */}
        <div className="relative z-10 w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl shadow-slate-900/30 overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-10 pt-10 pb-7 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary/10 rounded-2xl shrink-0">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 italic uppercase tracking-tight leading-none">
                  Neues Objekt
                </h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                  Liegenschaft zum Portfolio hinzufügen
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all active:scale-90 shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form body */}
          <form ref={formRef} onSubmit={handleSubmit} className="px-10 py-8 space-y-5">

            {/* Objektname */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                Objektname *
              </label>
              <input
                name="name"
                required
                placeholder="z.B. Gewerbepark Tempelhof"
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>

            {/* Adresse + PLZ */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" /> Adresse *
                </label>
                <input
                  name="address"
                  required
                  placeholder="Straße & Hausnummer"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">PLZ *</label>
                <input
                  name="zipCode"
                  required
                  placeholder="10115"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>

            {/* Stadt + Typ */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Stadt *</label>
                <input
                  name="city"
                  required
                  defaultValue="Berlin"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Objekttyp *</label>
                <select
                  name="type"
                  required
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Bitte wählen…</option>
                  {PROPERTY_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Beschreibung */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-1.5">
                <FileText className="w-3 h-3" /> Beschreibung
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Kurze Beschreibung des Objekts…"
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
              />
            </div>

            {/* Feedback */}
            {result?.error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-sm font-bold text-red-600">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {result.error}
              </div>
            )}
            {result?.success && (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-2xl text-sm font-bold text-green-600">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                Objekt erfolgreich hinzugefügt!
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isPending}
                className="px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest italic text-slate-500 bg-slate-50 hover:bg-slate-100 transition-all active:scale-95 disabled:opacity-50"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-10 py-3.5 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest italic flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-primary/25 active:scale-95 disabled:opacity-60 disabled:scale-100"
              >
                {isPending
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Speichern…</>
                  : <><PlusCircle className="w-4 h-4" /> Objekt Speichern</>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Trigger */}
      <button
        onClick={handleOpen}
        className="px-8 py-3.5 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 italic"
      >
        <PlusCircle className="w-4 h-4" /> Neues Objekt
      </button>

      {/* Render modal into document.body via portal (avoids stacking context issues) */}
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
