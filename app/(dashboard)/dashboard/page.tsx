'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { 
  Loader2, 
  AlertCircle, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  Cpu, 
  Scan, 
  Database, 
  BookOpen, 
  Trophy,
  History,
  Activity,
  BarChart3,
  Brain,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

import { useLanguage } from '@/lib/language-context'

interface QuickStats {
  total_predictions: number
  today_predictions: number
  average_confidence: number
}

const plasticIcons: Record<string, string> = {
  'PET': '🍾',
  'HDPE': '🥛',
  'PVC': '🔧',
  'LDPE': '🛍️',
  'PP': '📦',
  'PS': '🥡',
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [stats, setStats] = useState<QuickStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const actionCards = [
    {
      title: t('Neural Scan'),
      desc: t('Initiate plastic classification engine'),
      href: '/dashboard/upload',
      icon: Scan,
      color: 'from-blue-600/20 to-blue-400/10',
      borderColor: 'border-blue-500/20',
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-500'
    },
    {
      title: t('Archive History'),
      desc: t('Access decentralized scan records'),
      href: '/dashboard/history',
      icon: History,
      color: 'from-blue-500/10 to-blue-400/5',
      borderColor: 'border-white/5',
      iconBg: 'bg-white/5',
      iconColor: 'text-white/40'
    }
  ]

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await apiClient.getAnalytics()
        if (result.success && result.data) {
          setStats(result.data)
        }
      } catch (err) {
        setError(t('Failed to load neural statistics'))
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="p-8 lg:p-12">
      {/* Header Section */}
      <div className="mb-14 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full shadow-blue-glow" />
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">{t('Operational Status: Active')}</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tighter leading-none mb-4">
          {t('Greetings,')} <span className="text-blue-500">{user?.name?.split(' ')[0] || 'User'}</span>
        </h1>
        <p className="text-white/40 text-lg font-medium max-w-2xl leading-relaxed">
          {t('The PlasticAI Neural Engine is synched. Ready to perform real-time waste classification and environmental impact analysis.')}
        </p>
      </div>

      {/* Main Grid Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
        {actionCards.map((card, idx) => {
          const content = (
            <div className={cn(
              "h-full bg-gradient-to-br border rounded-[32px] p-8 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden",
              card.color, card.borderColor, "hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-900/20"
            )}>
              {/* Decorative Blur */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3", card.iconBg)}>
                <card.icon className={cn("w-6 h-6", card.iconColor)} />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-white/40 text-sm font-medium leading-relaxed mb-8">{card.desc}</p>

              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 group-hover:gap-4 transition-all">
                {t('Initialize Engine')}
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          )


          return (
            <Link key={idx} href={card.href} className="group">
              {content}
            </Link>
          )
        })}
      </div>

      {/* Neural Performance Section */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-14">
        {/* Stats Content - Spans 3 columns on XL */}
        <div className="xl:col-span-3 bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-[40px] p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-[0.02]">
            <Activity className="w-64 h-64" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">{t('Neural Performance')}</h2>
              <p className="text-sm text-white/30 font-bold uppercase tracking-widest">{t('Real-time Global Metrics')}</p>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-full px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{t('Node v2.4a Online')}</span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 grayscale">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">{t('Accessing Data Lattice...')}</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/5 border border-red-500/10 rounded-[28px] p-8 flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-red-400 font-bold">{t('Lattice Access Denied')}</p>
                <p className="text-red-500/40 text-xs font-medium uppercase tracking-widest">{t('Error Trace: 0x')}{error.length}X</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-4 h-4 text-blue-500/50" />
                  <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest leading-none">{t('Total Classified')}</span>
                </div>
                <div className="text-3xl font-black text-white tracking-tighter tabular-nums drop-shadow-blue-glow">
                  {stats?.total_predictions || 0}
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-2/3 shadow-blue-glow" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-500/50" />
                  <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest leading-none">{t('Cycles Today')}</span>
                </div>
                <div className="text-3xl font-black text-blue-500 tracking-tighter tabular-nums">
                  {stats?.today_predictions || 0}
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-1/3" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-blue-500/50" />
                  <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest leading-none">{t('Average Accuracy')}</span>
                </div>
                <div className="text-3xl font-black text-white/90 tracking-tighter tabular-nums">
                  {stats?.average_confidence
                    ? `${Math.round(stats.average_confidence * 100)}%`
                    : '0%'}
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-blue-glow" />
                  <span className="text-[10px] font-bold text-blue-500/60 uppercase tracking-widest">{t('OPTIMAL_PRECISION')}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Global Supported Lattice */}
        <div className="bg-white/[0.03] border border-white/5 rounded-[40px] p-10 flex flex-col">
          <h3 className="text-sm font-black text-white/30 uppercase tracking-[0.2em] mb-8">{t('Classification Scope')}</h3>
          <div className="grid grid-cols-2 gap-3 flex-1">
            {Object.entries(plasticIcons).map(([type, icon]) => (
              <div key={type} className="group relative flex flex-col items-center justify-center p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-blue-600/10 hover:border-blue-500/20 transition-all cursor-default overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <span className="text-3xl mb-3 relative group-hover:scale-125 transition-transform">{icon}</span>
                <span className="text-[11px] font-black text-white/50 relative group-hover:text-blue-500 transition-colors uppercase tracking-[0.1em]">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Highlights Section */}
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 px-6">
        <div className="flex items-center gap-4">
          <Sparkles className="w-5 h-5 text-blue-500" />
          <h2 className="text-xs font-black text-white uppercase tracking-[0.3em]">{t('Advanced Feature Lattice')}</h2>
          <div className="flex-1 h-px bg-white/5" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
          {[
            { title: 'Lattice Intel Dashboard', desc: 'Synthesize global recycling telemetry with real-time neural mapping.', icon: BarChart3, href: '/dashboard/analytics' },
            { title: 'Disposal Engine v2.0', desc: 'AI-powered localized guidelines based on localized municipal logic.', icon: Zap, href: '/dashboard/upload' },
            { title: 'Knowledge Resource Node', desc: 'Interact with the periodic table of synthetic polymers and impact.', icon: BookOpen, href: '/dashboard/knowledge' },
            { title: 'Eco Intelligence Quiz', desc: 'Benchmark your cognitive awareness of localized waste protocols.', icon: Brain, href: '/dashboard/quiz' },
          ].map((feature, i) => (
            <Link key={i} href={feature.href} className="group">
              <div className="h-full p-7 bg-white/[0.02] border border-white/5 rounded-[28px] hover:bg-blue-600/5 hover:border-blue-500/20 transition-all duration-500 flex flex-col items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30 group-hover:text-blue-500 group-hover:scale-110 transition-all">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-tighter">{t(feature.title)}</h4>
                  <p className="text-[11px] text-white/30 font-medium leading-relaxed">{t(feature.desc)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
