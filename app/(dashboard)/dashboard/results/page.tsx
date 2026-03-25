'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api'
import { useLanguage } from '@/lib/language-context'
import { 
  ChevronRight, 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  RefreshCcw, 
  Trash2, 
  Leaf, 
  ListChecks, 
  Lightbulb, 
  Database,
  Fingerprint
} from 'lucide-react'

export default function ResultsPage() {
  const { language, t } = useLanguage()
  const searchParams = useSearchParams()
  const plasticType = searchParams.get('type') || 'Unknown'
  const confidence = parseFloat(searchParams.get('confidence') || '0.98') || 0.98
  
  const [disposal, setDisposal] = useState<any>(null)
  const [insights, setInsights] = useState<string | null>(null)
  const [plasticRecord, setPlasticRecord] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); setError(null)
      try {
        const [disposalRes, insightsRes, plasticRes] = await Promise.all([
          apiClient.getDisposalMethod(plasticType, language),
          apiClient.getAIInsights(plasticType),
          apiClient.fetchPlastics()
        ])

        if (disposalRes.success) setDisposal(disposalRes.data)
        if (insightsRes.success) setInsights(insightsRes.data.insights)
        if (plasticRes.success && plasticRes.data) {
           const match = plasticRes.data.find((p: any) => p.short_name.toLowerCase() === plasticType.toLowerCase())
           if (match) setPlasticRecord(match)
        }
      } catch (err) {
        setError('Analytical handshake failed')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [plasticType, language])

  if (isLoading) {
    return (
      <div className="min-h-screen py-32 flex items-center justify-center grayscale opacity-20">
        <div className="flex flex-col items-center gap-6">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{t('Lattice Propagation...')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 lg:p-12 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Navigation & Status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
          <div>
            <Link href="/dashboard/history" className="group flex items-center gap-2 mb-4">
               <div className="w-6 h-6 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-600/20 transition-all">
                  <ChevronRight className="w-3 h-3 text-blue-500 rotate-180" />
               </div>
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">{t('Back to Hub')}</span>
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tighter mb-2">
              {t('Inference Result')}
              {searchParams.get('history') && (
                <span className="ml-4 text-[9px] font-black opacity-30 border border-white/10 px-2 py-1 rounded bg-white/5 tracking-widest uppercase align-middle">
                  {t('Neural Audit')}
                </span>
              )}
            </h1>
            <p className="text-white/40 text-sm font-medium max-w-lg leading-relaxed">
              {t('Neural handshake complete. Material identified.')}
            </p>
          </div>
          <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center gap-4 shadow-blue-glow/10">
             <Database className="w-5 h-5 text-blue-500" />
             <div className="pr-4">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">{t('Target Synched')}</p>
                <p className="text-xs font-bold text-white uppercase tracking-wider">0xRESULT_NODE</p>
             </div>
          </div>
        </div>

        {/* Primary Identification Display (Mirroring Upload Results) */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-10 opacity-[0.1] transition-opacity group-hover:opacity-[0.2] overflow-hidden">
            {plasticRecord?.image_url ? (
              <img src={plasticRecord.image_url} alt={plasticType} className="w-64 h-64 object-contain rotate-12 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-700" />
            ) : (
              <Fingerprint className="w-48 h-48" />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
            {/* Identification Matrix */}
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-blue-glow">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-500 mb-1">{t('Inference Engine')}</p>
                  <h2 className="text-2xl font-black text-white tracking-tighter leading-none uppercase">{plasticType}</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="p-8 bg-blue-600/10 border border-blue-500/20 rounded-3xl shadow-blue-glow/10">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-500/60 mb-3">{t('Recyclability')}</p>
                    <p className="text-2xl font-black text-blue-400 tracking-tighter tabular-nums">
                      {disposal?.recyclable ? t('Primary Recyclable') : t('Terminal Waste')}
                    </p>
                </div>
                <div className="p-8 bg-white/[0.04] border border-white/10 rounded-3xl">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30 mb-3">{t('CONFIDENCE_LATTICE')}</p>
                    <p className="text-3xl font-black text-white tracking-tighter tabular-nums">
                        {(confidence * 100).toFixed(1)}%
                    </p>
                </div>
              </div>
            </div>

            {/* AI Insights & Decomposition (Right Column) */}
            <div className="flex flex-col h-full bg-white/[0.03] border border-white/10 rounded-[32px] p-8 space-y-6 relative overflow-hidden">
               <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.3em] flex items-center gap-4 py-2 border-b border-white/5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  {t('Neural Insight')}
               </h3>
               <div className="flex-1 overflow-auto pr-2">
                 {insights ? (
                   <p className="text-sm font-medium text-white/60 leading-relaxed whitespace-pre-wrap italic">
                     &quot;{insights}&quot;
                   </p>
                 ) : (
                   <p className="text-xs text-white/20 italic">{t('Input required for logic continuity')}</p>
                 )}
               </div>
               <div className="h-1.5 bg-white/[0.01] rounded-full overflow-hidden border border-white/5 p-0.5">
                  <div
                    className="h-full bg-blue-600 rounded-full shadow-blue-glow transition-all duration-1500 ease-out"
                    style={{ width: `${confidence * 100}%` }}
                  />
               </div>
            </div>
          </div>
        </div>

        {/* Protocol Matrix (Common across all scan views) */}
        {disposal && (
          <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-1000">
             <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 space-y-10 relative overflow-hidden">
                <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.3em] flex items-center gap-4 py-2">
                    <Trash2 className="w-4 h-4 text-blue-500" />
                    {t('Disposal Protocol Matrix')}
                    <div className="flex-1 h-px bg-white/5" />
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   <div className="space-y-8">
                      <div className="p-8 bg-blue-600/5 border border-blue-500/10 rounded-3xl space-y-4">
                         <div className="flex items-center gap-3">
                            <RefreshCcw className="w-4 h-4 text-blue-500"/>
                            <p className="text-[10px] uppercase font-black tracking-widest text-blue-500/80">{t('Recycling Grade')}</p>
                         </div>
                         <p className="text-xl font-black text-white leading-tight">
                            Grade: {disposal.grade || 'Alpha'} 
                            <span className="text-xs font-medium text-white/20 ml-4">({t(disposal.bin_colour)} {t('Bin Segment')})</span>
                         </p>
                         <div className="flex items-center gap-2 mt-4">
                            <div className="w-3 h-3 rounded-full shadow-blue-glow" style={{ backgroundColor: disposal.bin_colour?.toLowerCase() || '#2563EB' }} />
                            <span className="text-[10px] uppercase font-black text-white/30 tracking-widest leading-none">{t('PROTOCOL_LOCKED')}</span>
                         </div>
                      </div>

                      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
                         <p className="text-[10px] uppercase font-black tracking-widest text-blue-500 flex items-center gap-2">
                             <ListChecks className="w-4 h-4"/> {t('Prep Steps')}
                         </p>
                         <ul className="space-y-4">
                            {(disposal.preparation_steps || []).map((step: string, idx: number) => (
                               <li key={idx} className="flex gap-4 group">
                                 <span className="w-6 h-6 bg-blue-600/10 text-blue-500 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 border border-blue-500/20 transition-all group-hover:bg-blue-600 group-hover:text-white">{idx + 1}</span>
                                 <span className="text-xs text-white/60 font-bold group-hover:text-white transition-colors">{t(step)}</span>
                               </li>
                            ))}
                         </ul>
                      </div>
                   </div>

                   <div className="space-y-8">
                      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                         <div className="flex items-center gap-3">
                            <Leaf className="w-4 h-4 text-green-500"/>
                            <p className="text-[10px] uppercase font-black tracking-widest text-green-500/80">{t('Env Impact Scope')}</p>
                         </div>
                         <p className="text-xs font-medium text-white/40 leading-relaxed tabular-nums">
                            &quot;{t(disposal.why_this_matters)}&quot;
                         </p>
                      </div>

                      <div className="p-8 bg-amber-500/5 rounded-3xl border border-amber-500/10 space-y-4">
                        <p className="text-[10px] uppercase font-black tracking-widest text-amber-500 flex items-center gap-2">
                           <Lightbulb className="w-4 h-4"/> {t('System Note')}
                        </p>
                        <p className="text-xs text-amber-500 font-bold leading-relaxed">
                           CAUTION: {t(disposal.common_mistake)}
                        </p>
                      </div>

                      <div className="p-8 bg-white/[0.01] rounded-3xl border border-white/5">
                        <p className="text-xs font-medium text-white/20 leading-relaxed italic">
                           <span className="text-white/40 font-black uppercase tracking-widest text-[9px] block mb-2 underline decoration-blue-500 decoration-2">{t('Condition Log')}</span>
                           {t(disposal.condition_note)}
                        </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Global Action Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12">
          <Link href="/dashboard/upload">
            <Button className="w-full h-16 bg-white hover:bg-white text-black text-xs font-black uppercase tracking-[0.3em] rounded-3xl shadow-white-glow transition-all active:scale-[0.98]">
               <RefreshCcw className="w-4 h-4 mr-3" />
               {t('Reset Bridge')}
            </Button>
          </Link>
          <Link href="/dashboard/history">
            <Button className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-[0.3em] rounded-3xl shadow-blue-glow transition-all active:scale-[0.98]">
               {t('Audit Logs')}
               <ChevronRight className="w-4 h-4 ml-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

