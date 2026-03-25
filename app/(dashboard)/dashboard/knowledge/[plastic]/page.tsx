'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getPlasticBySlug, PLASTICS_DATA } from '@/lib/plastics-impact-data'
import {
  ArrowLeft,
  TriangleAlert,
  CircleCheck,
  ChevronDown,
  ChevronUp,
  Globe,
  Recycle,
  Skull,
  FlaskConical,
  Leaf,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const accentMap: Record<string, string> = {
  yellow: 'text-yellow-400',
  orange: 'text-orange-400',
  blue: 'text-blue-400',
  emerald: 'text-emerald-400',
  red: 'text-red-400',
}
const accentBgMap: Record<string, string> = {
  yellow: 'bg-yellow-400/10 border-yellow-400/20',
  orange: 'bg-orange-400/10 border-orange-400/20',
  blue: 'bg-blue-400/10 border-blue-400/20',
  emerald: 'bg-emerald-400/10 border-emerald-400/20',
  red: 'bg-red-400/10 border-red-400/20',
}

function DangerPill({ level, cls }: { level: string; cls: string }) {
  const map: Record<string, string> = {
    green: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    yellow: 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20',
    orange: 'bg-orange-400/10 text-orange-400 border border-orange-400/20',
    red: 'bg-red-400/10 text-red-400 border border-red-400/20',
  }
  const { language, t } = useLanguage()
  return <span className={cn('inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider', map[cls])}>{t(level)}</span>
}

export default function PlasticDetailPage() {
  const params = useParams()
  const slug = typeof params.plastic === 'string' ? params.plastic : ''
  const plastic = getPlasticBySlug(slug)
  const { language, t } = useLanguage()

  const [imgError, setImgError] = useState(false)
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null)

  if (!plastic) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-white/30 font-black uppercase tracking-widest text-xs">{t('Plastic not found in lattice')}</p>
        <Link href="/dashboard/knowledge" className="text-blue-500 text-xs font-black uppercase tracking-widest hover:text-blue-400 transition-colors">
          {t('Return to Knowledge Hub')}
        </Link>
      </div>
    )
  }

  const accentText = accentMap[plastic.accentColor] || 'text-blue-400'
  const accentBg = accentBgMap[plastic.accentColor] || 'bg-blue-400/10 border-blue-400/20'

  // Adjacent plastics for navigation
  const idx = PLASTICS_DATA.findIndex(p => p.slug === slug)
  const prev = idx > 0 ? PLASTICS_DATA[idx - 1] : null
  const next = idx < PLASTICS_DATA.length - 1 ? PLASTICS_DATA[idx + 1] : null

  return (
    <div className="min-h-screen animate-in fade-in duration-700">

      {/* ── TOP NAV BAR ── */}
      <div className="sticky top-0 z-40 bg-black/60 backdrop-blur-3xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <Link
          href="/dashboard/knowledge?tab=impact"
          className="flex items-center gap-3 text-white/30 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em]">{t('Back to Hub')}</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-blue-glow animate-pulse" />
          <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em] hidden md:block">{t('Environmental Impact Report')}</span>
        </div>

        {/* Sibling pagination */}
        <div className="flex items-center gap-3">
          {prev && (
            <Link href={`/dashboard/knowledge/${prev.slug}`}
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all text-[10px] font-black text-white/30 hover:text-white uppercase tracking-widest flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />{prev.abbr}
            </Link>
          )}
          {next && (
            <Link href={`/dashboard/knowledge/${next.slug}`}
              className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all text-[10px] font-black text-white/30 hover:text-white uppercase tracking-widest flex items-center gap-2">
              {next.abbr}<ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-14">

        {/* ── HERO HEADER ── */}
        <div className={cn(
          'rounded-[44px] border overflow-hidden',
          plastic.isWorst ? 'border-red-500/30 bg-red-500/5' : 'border-white/5 bg-white/[0.03]'
        )}>
          <div className={cn('px-10 py-10 border-b', plastic.isWorst ? 'border-red-500/10' : 'border-white/5')}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Code badge */}
              <div className={cn(
                'w-24 h-24 rounded-[28px] border-2 flex items-center justify-center text-5xl font-black shrink-0 shadow-2xl',
                plastic.isWorst ? 'border-red-500/30 bg-red-500/10 text-red-400' : `${accentBg} ${accentText}`
              )}>
                {plastic.code}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={cn('text-[10px] font-black uppercase tracking-[0.3em]', accentText)}>
                    {t('Resin ID')} #{plastic.code}
                  </span>
                  <div className="w-px h-3 bg-white/10" />
                  <DangerPill level={plastic.dangerLevel} cls={plastic.recycClass === 'red' ? 'red' : plastic.recycClass === 'orange' ? 'orange' : 'yellow'} />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-3">
                  {plastic.abbr}
                </h1>
                <p className="text-sm text-white/30 font-bold uppercase tracking-[0.15em] mb-4">{t(plastic.fullName)}</p>
                <p className="text-white/50 text-base font-medium leading-relaxed max-w-2xl">{t(plastic.tagline)}</p>
              </div>
            </div>
          </div>

          {/* Quick Properties Strip */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-white/5">
            {plastic.properties.map((prop, i) => (
              <div key={i} className="px-5 py-5 text-center">
                <p className={cn("text-[8px] font-black uppercase text-white/20 mb-2", language === 'English' ? "tracking-[0.2em]" : "")}>{t(prop.label)}</p>
                <p className={cn('text-sm font-black leading-tight', i === 0 ? accentText : 'text-white')}>{t(prop.value)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── IMAGE + VIDEO ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/20 mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-white/10" /> {t('What It Looks Like')}
            </p>
            {!imgError ? (
              <img
                src={plastic.image}
                alt={plastic.abbr}
                onError={() => setImgError(true)}
                className="w-full h-60 object-cover rounded-[28px] border border-white/5"
              />
            ) : (
              <div className="w-full h-60 rounded-[28px] border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center gap-3">
                <span className="text-6xl">{plastic.emoji}</span>
                <p className="text-xs text-white/20 font-bold uppercase tracking-widest">{plastic.abbr} Products</p>
              </div>
            )}
            <p className="text-[10px] text-white/20 text-center mt-3 font-medium">{plastic.imageCaption}</p>
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/20 mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-white/10" /> {t('Related Documentary')}
            </p>
            <div className="relative w-full rounded-[28px] overflow-hidden border border-white/5" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={`https://www.youtube.com/embed/${plastic.ytId}`}
                title={plastic.ytLabel}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <p className="text-[10px] text-white/20 text-center mt-3 font-medium leading-snug">{plastic.ytLabel}</p>
          </div>
        </div>

        {/* ── FOUND IN ── */}
        <div className={cn('rounded-[32px] border px-8 py-7', accentBg)}>
          <p className={cn('text-[9px] font-black uppercase tracking-[0.25em] mb-4', accentText)}>{t('Commonly Found In')}</p>
          <div className="flex flex-wrap gap-3">
            {plastic.foundIn.map((item, i) => (
              <span key={i} className="bg-white/[0.04] border border-white/5 text-white/60 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider">
                {t(item)}
              </span>
            ))}
          </div>
        </div>

        {/* ── ENVIRONMENTAL ISSUES ── */}
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <TriangleAlert className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-tight">{t('Environmental Issues')}</h2>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="space-y-3">
            {plastic.issues.map((issue, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/5 hover:border-red-500/20 rounded-[24px] overflow-hidden transition-all cursor-pointer group"
                onClick={() => setExpandedIssue(expandedIssue === i ? null : i)}
              >
                <div className="flex items-center justify-between px-7 py-5">
                  <div className="flex items-center gap-5">
                    <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-xs font-black shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm font-black text-white/80 group-hover:text-white transition-colors">{t(issue.title)}</p>
                  </div>
                  {expandedIssue === i
                    ? <ChevronUp className="w-4 h-4 text-white/20 shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-white/20 shrink-0" />
                  }
                </div>
                <AnimatePresence>
                  {expandedIssue === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-7 pb-6">
                        <div className="pl-12">
                          <p className="text-sm text-white/40 leading-relaxed font-medium border-l-2 border-red-500/20 pl-5">{t(issue.body)}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* ── KEY FACTS ── */}
        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-[32px] px-8 py-8 space-y-5">
          <div className="flex items-center gap-4">
            <CircleCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-tight">{t('Key Facts')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plastic.facts.map((fact, i) => (
              <div key={i} className="flex gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                <div className="w-7 h-7 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 text-[10px] font-black shrink-0">{i + 1}</div>
                <p className="text-xs text-white/50 font-medium leading-relaxed">{t(fact)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── THE BIG PICTURE ── */}
        <div className="bg-white/[0.03] border border-white/5 rounded-[40px] p-10 space-y-6">
          <div className="flex items-center gap-4">
            <Globe className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-black text-white uppercase tracking-tight">{t('The Big Picture')}</h2>
          </div>
          <p className="text-base text-white/50 leading-relaxed font-medium border-l-2 border-blue-500/30 pl-6">
            {t(plastic.bigPicture)}
          </p>
        </div>

        {/* ── ACTION TIP ── */}
        <div className={cn('rounded-[32px] border p-8 space-y-4', accentBg)}>
          <div className="flex items-center gap-3">
            <Leaf className={cn('w-5 h-5', accentText)} />
            <h3 className={cn('text-xs font-black uppercase tracking-[0.25em]', accentText)}>{t('What You Can Do')}</h3>
          </div>
          <p className="text-sm text-white/60 font-medium leading-relaxed">{t(plastic.actionTip)}</p>
        </div>

        {/* ── EXPLORE OTHER PLASTICS ── */}
        <div className="border-t border-white/5 pt-14 space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{t('Explore Other Plastics')}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PLASTICS_DATA.filter(p => p.slug !== slug).map(p => (
              <Link
                key={p.slug}
                href={`/dashboard/knowledge/${p.slug}`}
                className={cn(
                  'flex items-center gap-4 p-5 rounded-[24px] border bg-white/[0.02] transition-all group',
                  p.isWorst ? 'border-red-500/20 hover:bg-red-500/5 hover:border-red-500/30' : 'border-white/5 hover:bg-white/[0.04] hover:border-blue-500/20'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-black shrink-0 transition-all',
                  p.isWorst
                    ? 'bg-red-500/10 border-red-500/20 text-red-400'
                    : 'bg-white/[0.03] border-white/10 text-white/40 group-hover:text-blue-500 group-hover:bg-blue-600/10 group-hover:border-blue-500/20'
                )}>
                  {p.code}
                </div>
                <div>
                  <p className={cn('text-sm font-black uppercase tracking-tight', p.isWorst ? 'text-red-400' : 'text-white')}>{t(p.abbr)}</p>
                  <p className="text-[9px] text-white/20 font-bold uppercase tracking-wider">{t(p.dangerLevel)}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/40 ml-auto transition-all group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className="pb-10">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/10 mb-3">{t('Sources')}</p>
          <p className="text-[10px] text-white/15 font-medium leading-relaxed">
            PMC microplastic toxicity studies · Lawrence Berkeley National Laboratory · European Parliament environmental reports · Basel Convention · UNEP · US EPA · National Toxicology Program
          </p>
        </div>

      </div>
    </div>
  )
}
