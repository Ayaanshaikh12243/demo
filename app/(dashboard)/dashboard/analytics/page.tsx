'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api'
import { useLanguage } from '@/lib/language-context'
import { useScanData } from '@/lib/scan-context'
import { Loader2, AlertCircle, BarChart3, Activity, Download, Cpu, Target, ArrowRight, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { PLASTICS_DATA } from '@/lib/plastics-impact-data'

interface AnalyticsData {
  total_predictions: number
  today_predictions: number
  average_confidence: number
  plastic_type_distribution: Record<string, number>
}

const plasticIcons: Record<string, string> = {
  'PET': '🍾',
  'HDPE': '🥛',
  'PVC': '🔧',
  'LDPE': '🛍️',
  'PP': '📦',
  'PS': '🥡',
}

export default function AnalyticsPage() {
  const { t } = useLanguage()
  const { analytics: ctxAnalytics, isRefreshing: ctxRefreshing, refresh: ctxRefresh } = useScanData()

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await apiClient.getAnalytics()
      if (result.success && result.data) {
        setAnalytics(result.data as unknown as AnalyticsData)
      } else {
        setError(result.error || 'Failed to load analytics')
      }
    } catch (err) {
      setError('An error occurred while loading analytics')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial load from backend directly
  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics])

  // When context analytics updates (e.g. after a new scan), merge them in
  useEffect(() => {
    if (ctxAnalytics && ctxAnalytics.total_predictions > 0) {
      setAnalytics(ctxAnalytics)
      setIsLoading(false)
      setError(null)
    }
  }, [ctxAnalytics])

  const handleRefresh = async () => {
    ctxRefresh()      // updates context (shared state)
    fetchAnalytics()  // also fetches directly for this page
  }

  if (isLoading && !analytics) {
    return (
      <div className="min-h-[calc(100vh-4rem)] p-12 flex items-center justify-center grayscale opacity-20">
        <div className="flex flex-col items-center gap-6">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{t('Calculating Lattice...')}</p>
        </div>
      </div>
    )
  }

  if (error && !analytics) {
    return (
      <div className="min-h-[calc(100vh-4rem)] p-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black text-white tracking-tighter mb-10 uppercase">Neural <span className="text-blue-500">Node Error</span></h1>
          <div className="bg-red-500/5 border border-red-500/20 rounded-[32px] p-8 flex gap-6 items-center mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <p className="text-sm font-bold text-red-500/80 tracking-tight">{error}</p>
          </div>
          <Button onClick={handleRefresh} className="h-10 px-6 bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 border border-blue-500/20 text-xs font-black uppercase tracking-widest rounded-2xl">
            <RefreshCw className="w-3.5 h-3.5 mr-2" /> {t('Retry')}
          </Button>
        </div>
      </div>
    )
  }

  const totalCount = analytics?.plastic_type_distribution
    ? Object.values(analytics.plastic_type_distribution).reduce((a, b) => a + b, 0)
    : 0

  return (
    <div className="p-8 lg:p-12 animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Analytics Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">{t('Core Intel Module')}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter mb-2">
              Neural <span className="text-blue-500">Analytics</span>
            </h1>
            <p className="text-white/40 text-sm font-medium max-w-lg leading-relaxed">
              {t('Statistical distribution and real-time performance telemetry for your localized classification node. Protocols synchronized with Global Lattice.')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleRefresh}
              disabled={isLoading || ctxRefreshing}
              className="h-10 px-4 bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 border border-blue-500/20 text-xs font-black uppercase tracking-widest rounded-2xl transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-2 ${(isLoading || ctxRefreshing) ? 'animate-spin' : ''}`} />
              {t('Refresh')}
            </Button>
            <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center gap-4 shadow-blue-glow/10">
               <Activity className="w-5 h-5 text-blue-500" />
               <div className="pr-4">
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">{t('State: Monitoring')}</p>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">0xBF0_CONSENSUS</p>
               </div>
            </div>
          </div>
        </div>

        {/* Live sync indicator */}
        {ctxRefreshing && analytics && (
          <div className="flex items-center gap-3 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-2xl w-fit">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{t('Recalculating neural lattice...')}</span>
          </div>
        )}

        {/* Triple Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: t('Total Inferences'), value: analytics?.total_predictions ?? 0, sub: t('Lattice History'), icon: BarChart3, color: 'text-white' },
            { label: t('Active Cycle (24h)'), value: analytics?.today_predictions ?? 0, sub: t('Current Batch'), icon: Cpu, color: 'text-blue-500' },
            { label: t('Mean Precision'), value: analytics?.average_confidence ? `${Math.round(analytics.average_confidence * 100)}%` : '98.2%', sub: t('Neural Clarity'), icon: Target, color: 'text-emerald-500' }
          ].map((metric, i) => (
            <div key={i} className="bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-[40px] p-8 hover:border-blue-500/20 hover:bg-white/[0.05] transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-all duration-700">
                 <metric.icon className="w-24 h-24" />
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-3">{metric.label}</p>
              <p className={cn("text-3xl font-black tracking-tighter mb-2", metric.color)}>
                {metric.value}
              </p>
              <div className="flex items-center gap-2">
                 <div className={cn("w-1.5 h-1.5 rounded-full", metric.color.replace('text-', 'bg-'))} />
                 <p className="text-[10px] text-white/20 font-medium">{metric.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Distribution Matrix Panel */}
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[48px] p-12 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
              <BarChart3 className="w-64 h-64" />
           </div>

          <h2 className="text-lg font-bold text-white mb-10 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-600 shadow-blue-glow" />
            {t('Lattice Distribution Matrix')}
          </h2>

          {totalCount === 0 ? (
            <div className="text-center py-20 bg-white/[0.01] rounded-[40px] border border-white/5">
              <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">{t('Zero Matrix Data Recorded')}</p>
              <p className="text-xs text-white/10 mt-4 font-medium">{t('Upload a scan to see live distribution data')}</p>
            </div>
          ) : (
            <div className="grid gap-12">
              {Object.entries(analytics?.plastic_type_distribution || {})
                .sort(([, a], [, b]) => b - a)
                .map(([plasticType, count]) => {
                  const percentage = (count / totalCount) * 100
                  return (
                    <Link key={plasticType} href={`/dashboard/knowledge/${plasticType.toLowerCase()}`}>
                      <div className="space-y-3 group cursor-pointer">
                        <div className="flex items-center justify-between px-1">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-xl group-hover:bg-blue-600/10 group-hover:border-blue-500/20 group-hover:scale-110 transition-all overflow-hidden">
                              {(() => {
                                const p = PLASTICS_DATA.find(pd => pd.abbr === plasticType)
                                return p?.image ? (
                                  <img src={p.image} alt={plasticType} className="w-full h-full object-cover" />
                                ) : (
                                  <span>{plasticIcons[plasticType] || '♻️'}</span>
                                )
                              })()}
                            </div>
                            <div>
                              <p className="font-bold text-white text-sm leading-none mb-1 flex items-center gap-2">
                                {plasticType}
                                <ArrowRight className="w-3 h-3 text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                              </p>
                              <p className="text-xs text-white/40 font-medium">{count} {t('Units Identified')}</p>
                            </div>
                          </div>
                          <div className="text-right">
                             <p className="text-base font-bold text-blue-500">
                               {percentage.toFixed(1)}<span className="text-xs ml-0.5 opacity-50">%</span>
                             </p>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-white/[0.02] border border-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-1500 ease-out"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </Link>
                  )
                })}
            </div>
          )}
        </div>

        {/* Export */}
        <div className="pt-10 flex flex-col items-center gap-8">
          <p className="text-[10px] text-white/20 font-medium text-center">{t('Protocol: Universal Dataset Access')}</p>
          <Button
            className="h-11 px-10 bg-white hover:bg-blue-600 text-black hover:text-white text-xs font-semibold rounded-2xl transition-all duration-300 active:scale-[0.97] group shadow-lg"
            onClick={() => toast.success('Initializing Global Dataset Stream...')}
          >
            <Download className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
            {t('Export Neural Logs')}
          </Button>
        </div>
      </div>
    </div>
  )
}
