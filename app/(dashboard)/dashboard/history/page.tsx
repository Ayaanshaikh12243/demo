'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { useScanData } from '@/lib/scan-context'
import { Loader2, ArrowRight, Activity, Fingerprint, Database, RefreshCw } from 'lucide-react'
import { PLASTICS_DATA } from '@/lib/plastics-impact-data'

interface PredictionItem {
  id?: string
  plastic_type: string
  confidence: number
  timestamp?: string
}

const plasticIcons: Record<string, string> = {
  'PET': '🍾',
  'HDPE': '🥛',
  'PVC': '🔧',
  'LDPE': '🛍️',
  'PP': '📦',
  'PS': '🥡',
}

export default function HistoryPage() {
  const { t } = useLanguage()
  const { scans, isRefreshing, refresh } = useScanData()
  const predictions = scans as PredictionItem[]

  if (isRefreshing && predictions.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] p-12 flex items-center justify-center grayscale opacity-20">
        <div className="flex flex-col items-center gap-6">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{t('Querying Ledger...')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 lg:p-12 animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* History Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">{t('Core Ledger Archive')}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter mb-2">
              {t('Neural Audit')}
            </h1>
            <p className="text-white/40 text-sm font-medium max-w-lg leading-relaxed">
              {t('Historical classification logs retrieved from the secure distributed ledger. Audit data is immutable once consensus is reached.')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => refresh()}
              disabled={isRefreshing}
              className="h-10 px-4 bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 border border-blue-500/20 text-xs font-black uppercase tracking-widest rounded-2xl transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {t('Sync')}
            </Button>
            <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center gap-4 shadow-blue-glow/10">
               <Database className="w-5 h-5 text-blue-500" />
               <div className="pr-4">
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">{t('State: Archive Ready')}</p>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">0xLDR_SYNCED</p>
               </div>
            </div>
          </div>
        </div>

        {predictions.length === 0 ? (
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[60px] p-32 text-center space-y-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-[0.02]">
               <Fingerprint className="w-64 h-64" />
            </div>
            <div className="w-32 h-32 rounded-[40px] bg-white/[0.02] border border-white/5 flex items-center justify-center mx-auto shadow-inner group">
               <Activity className="w-12 h-12 text-white/10 group-hover:text-blue-500 transition-colors" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white tracking-tighter mb-4">{t('Zero Records Detected')}</h2>
              <p className="text-white/20 font-bold uppercase tracking-[0.2em] max-w-sm mx-auto text-xs leading-relaxed">{t('No historical classification data found in your current terminal session node.')}</p>
            </div>
            <Link href="/dashboard/upload">
              <Button className="h-16 px-12 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-[0.3em] rounded-3xl shadow-blue-glow transition-all active:scale-[0.97]">
                {t('Initialize New Scan')}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {/* Live indicator when syncing */}
            {isRefreshing && (
              <div className="flex items-center gap-3 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-2xl w-fit">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{t('Syncing ledger...')}</span>
              </div>
            )}
            {predictions.map((prediction, index) => (
              <Link
                key={prediction.id || index}
                href={`/dashboard/results?type=${prediction.plastic_type}&confidence=${prediction.confidence}&history=true`}
              >
                <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[32px] p-6 hover:bg-white/[0.05] hover:border-blue-500/20 transition-all duration-500 group relative overflow-hidden">
                  
                  <div className="absolute top-0 right-0 p-8 opacity-[0.01] group-hover:opacity-[0.02] transition-opacity">
                    <span className="text-3xl font-black select-none pointer-events-none uppercase tracking-tighter italic">{prediction.plastic_type}</span>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 relative z-10">
                    <div className="flex items-center gap-8 flex-1">
                      <div className="w-16 h-16 rounded-[24px] bg-white/[0.02] border border-white/5 flex items-center justify-center text-3xl shadow-xl group-hover:scale-110 group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all duration-700 overflow-hidden">
                        {(() => {
                          const p = PLASTICS_DATA.find(pd => pd.abbr === prediction.plastic_type)
                          return p?.image ? (
                            <img src={p.image} alt={prediction.plastic_type} className="w-full h-full object-cover" />
                          ) : (
                            <span>{plasticIcons[prediction.plastic_type] || '♻️'}</span>
                          )
                        })()}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-blue-600 shadow-blue-glow" />
                           <p className="text-xl font-bold text-white leading-tight uppercase tracking-tight">
                              {prediction.plastic_type}
                           </p>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/20">
                          {prediction.timestamp
                            ? new Date(prediction.timestamp).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : t('Neural Handshake Complete')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-12 self-end md:self-auto w-full md:w-auto">
                      <div className="text-right">
                        <p className="text-2xl font-black text-blue-500 tracking-tighter drop-shadow-blue-glow">
                          {Math.round(prediction.confidence * 100)}<span className="text-xs font-black ml-1 opacity-40">%</span>
                        </p>
                        <p className="text-[8px] uppercase tracking-[0.2em] font-black text-white/10 mt-1">{t('Precision')}</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/20 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-700">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Confidence Bar */}
                  <div className="mt-8 space-y-2">
                    <div className="flex justify-between text-[9px] uppercase font-black tracking-[0.2em] text-white/10 px-1">
                       <span>{t('Neural Accuracy Grid')}</span>
                       <span className="text-white/20">{Math.round(prediction.confidence * 100)}% {t('Match')}</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.01] rounded-full overflow-hidden border border-white/5 p-0.5">
                      <div
                        className="h-full bg-blue-600 rounded-full shadow-blue-glow transition-all duration-1500 ease-out delay-500"
                        style={{ width: `${prediction.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
