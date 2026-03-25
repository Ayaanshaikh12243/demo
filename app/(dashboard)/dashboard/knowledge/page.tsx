'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Info,
  Layers,
  ShieldCheck,
  Recycle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Leaf,
  Droplets,
  Activity,
  Globe,
  FlaskConical,
  Flame,
  Play,
  ChevronDown,
  ChevronUp,
  TriangleAlert,
  CircleCheck,
  Skull
} from 'lucide-react'
import { PLASTICS_DATA } from '@/lib/plastics-impact-data'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/language-context'


// ── Pill Component ────────────────────────────────────────────────────────────
function DangerPill({ level, cls }: { level: string; cls: string }) {
  const { t } = useLanguage()
  const map: Record<string, string> = {
    green: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    yellow: 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20',
    orange: 'bg-orange-400/10 text-orange-400 border border-orange-400/20',
    red: 'bg-red-400/10 text-red-400 border border-red-400/20',
  }
  return (
    <span className={cn('inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider', map[cls])}>
      {t(level)}
    </span>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function KnowledgeHub() {
  const { language, t } = useLanguage()

  // ── Static Impact Guide Data ──────────────────────────────────────────────────
  const IMPACT_GUIDE = {
    stats: [
      { num: '9%', desc: t('of all plastic ever produced has been recycled') },
      { num: '500+', desc: t('years for most plastics to degrade') },
      { num: '5.3%', desc: t('of global GHG emissions from plastic production') },
    ],
    overview: [
      { code: '2', name: t('High-Density Polyethylene'), abbr: 'HDPE', slug: 'hdpe', recyclability: t('High'), recycClass: 'green', danger: t('Moderate'), dangerClass: 'yellow' },
      { code: '4', name: t('Low-Density Polyethylene'), abbr: 'LDPE', slug: 'ldpe', recyclability: t('Very Low'), recycClass: 'red', danger: t('High'), dangerClass: 'orange' },
      { code: '1', name: t('Polyethylene Terephthalate'), abbr: 'PET', slug: 'pet', recyclability: t('High'), recycClass: 'green', danger: t('Moderate'), dangerClass: 'yellow' },
      { code: '5', name: t('Polypropylene'), abbr: 'PP', slug: 'pp', recyclability: t('Medium'), recycClass: 'yellow', danger: t('Moderate'), dangerClass: 'yellow' },
      { code: '6', name: t('Polystyrene'), abbr: 'PS', slug: 'ps', recyclability: t('Near Zero'), recycClass: 'red', danger: t('High'), dangerClass: 'red' },
      { code: '3', name: t('Polyvinyl Chloride'), abbr: 'PVC', slug: 'pvc', recyclability: t('None'), recycClass: 'red', danger: t('Highest'), dangerClass: 'red' },
    ],
    bigPicture: [
      { text: t('Even the "safer" plastics (HDPE, PP) are fundamentally problematic at scale — they are all fossil fuel derivatives. Every gram of plastic starts as oil or gas, contributing directly to climate change through production.') },
      { text: t('They all become microplastics. No plastic fully disappears. UV, mechanical stress, and biological activity fragment them into particles that accumulate everywhere — Arctic ice, deep ocean trenches, human blood, and breast milk.') },
      { text: t('Recycling is not the solution. Global plastic recycling rates have never exceeded 10%. The recycling narrative was partly a campaign promoted by the plastics industry to delay regulation.'), bold: true },
      { text: t('Rich countries export plastic waste to lower-income nations with weaker waste infrastructure, where it often ends up burned or dumped into waterways — exporting pollution, not solving it.') },
    ],
    hierarchy: [
      { num: '1', action: t('Refuse'), desc: t("Don't buy single-use plastic at all"), active: true },
      { num: '2', action: t('Reduce'), desc: t("Use less of what you can't avoid"), active: true },
      { num: '3', action: t('Reuse'), desc: t('Extend the life of what you have'), active: true },
      { num: '4', action: t('Recycle'), desc: t('Last resort — not the first step'), active: false },
    ],
  }
  const [aiExplanation, setAiExplanation] = useState('')


  return (
    <div className="p-8 lg:p-12 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Hub Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-white/5 pb-10">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
               <span className={cn("text-[10px] font-black text-blue-500 uppercase", language === 'English' ? "tracking-[0.3em]" : "")}>{t('Neural Resource Node')}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter mb-2">
              {t('Neural')} <span className="text-blue-500">{t('Knowledge Hub_title')}</span>
            </h1>
            <p className="text-white/40 text-sm font-medium max-w-2xl leading-relaxed">
              {t('Deep-dive into the materials shaping our physical world. Interactive classification, environmental telemetry, and real-time recycling intelligence synchronized with the Global Lattice.')}
            </p>
          </div>
        </div>

        <div className="space-y-14">

            {/* Hero Stats */}
            <div className="bg-white/[0.03] border border-white/5 rounded-[40px] overflow-hidden">
              <div className="bg-white/[0.02] border-b border-white/5 px-10 py-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">{t('Environmental Impact Report')}</span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tighter mb-2">
                  {t('The 6 Common')} <span className="text-emerald-400">{t('Plastics')}</span> {t('& Why They\'re a Problem')}
                </h2>
                <p className="text-white/40 text-sm font-medium max-w-2xl leading-relaxed">
                  {t('Every plastic type has a unique chemistry — and a unique way of harming ecosystems. Here\'s what you need to know about each one.')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
                {IMPACT_GUIDE.stats.map((s, i) => (
                  <div key={i} className="px-10 py-8 text-center">
                    <p className="text-4xl font-black text-emerald-400 tracking-tighter mb-2">{s.num}</p>
                    <p className="text-xs text-white/30 font-medium leading-snug">{t(s.desc)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Reference Table */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-5">{t('Quick Reference')}</p>
              <div className="bg-white/[0.03] border border-white/5 rounded-[28px] overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      {['Code', 'Name', 'Abbr', 'Recyclability', 'Danger Level'].map(h => (
                        <th key={h} className="text-left px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">{t(h)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {IMPACT_GUIDE.overview.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => window.location.href = `/dashboard/knowledge/${row.slug}`}>
                        <td className="px-6 py-4">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 overflow-hidden flex items-center justify-center">
                            {PLASTICS_DATA.find(pd => pd.slug === row.slug)?.image ? (
                              <img src={PLASTICS_DATA.find(pd => pd.slug === row.slug)!.image} alt={row.abbr} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-sm font-black text-white">{row.code}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-white">{row.name}</td>
                        <td className="px-6 py-4 text-xs font-black text-blue-400 uppercase tracking-widest">{row.abbr}</td>
                        <td className="px-6 py-4"><DangerPill level={row.recyclability} cls={row.recycClass} /></td>
                        <td className="px-6 py-4"><DangerPill level={row.danger} cls={row.dangerClass} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Plastic Cards — Link to dedicated pages */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6">{t('Detailed Analysis — Click to Explore')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PLASTICS_DATA.map((p) => (
                  <Link key={p.slug} href={`/dashboard/knowledge/${p.slug}`}>
                    <div className={cn(
                      'bg-white/[0.03] backdrop-blur-xl border rounded-[32px] overflow-hidden transition-all duration-300 cursor-pointer group h-full flex flex-col',
                      p.isWorst ? 'border-red-500/25 hover:border-red-500/40 hover:bg-red-500/5' : 'border-white/5 hover:border-blue-500/20 hover:bg-white/[0.05]'
                    )}>
                      <div className={cn(
                        'flex items-center gap-5 px-7 py-5 border-b',
                        p.isWorst ? 'bg-red-500/5 border-red-500/10' : 'bg-white/[0.01] border-white/5'
                      )}>
                        <div className={cn(
                           'w-14 h-14 rounded-2xl border flex items-center justify-center overflow-hidden shrink-0 transition-all duration-500',
                           p.isWorst
                             ? 'bg-red-500/10 border-red-500/20 text-red-400 group-hover:bg-red-600 group-hover:text-white'
                             : 'bg-white/[0.04] border-white/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-blue-glow'
                         )}>
                           {p.image ? (
                             <img src={p.image} alt={p.abbr} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                           ) : (
                             <span className="text-2xl font-black">{p.code}</span>
                           )}
                         </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none">{p.abbr}</h3>
                          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1 truncate">{p.name}</p>
                        </div>
                      </div>
                      <div className="px-7 py-5 flex-1 flex flex-col justify-between gap-4">
                        <p className="text-xs text-white/40 font-medium leading-relaxed line-clamp-3">{p.tagline}</p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-3">
                            <DangerPill level={p.dangerLevel} cls={p.recycClass === 'red' ? 'red' : p.recycClass === 'orange' ? 'orange' : 'yellow'} />
                          </div>
                          <div className="w-9 h-9 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/20 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* The Big Picture */}
            <div className="bg-white/[0.03] border border-white/5 rounded-[40px] p-10 space-y-8">
              <h3 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
                <Globe className="w-6 h-6 text-blue-500" /> {t('The Big Picture')}
              </h3>
              <div className="space-y-4">
                {IMPACT_GUIDE.bigPicture.map((item, i) => (
                  <div key={i} className="flex gap-4 pl-4 border-l-2 border-white/[0.07]">
                    <p className="text-sm text-white/40 leading-relaxed font-medium">
                      {item.bold ? <strong className="text-white/70 font-bold">{item.text}</strong> : item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Waste Hierarchy */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-5">{t('The Waste Hierarchy')}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {IMPACT_GUIDE.hierarchy.map((h) => (
                    <div key={h.num} className={cn(
                      'rounded-2xl p-6 border text-center space-y-2',
                      h.active
                        ? 'bg-emerald-500/5 border-emerald-500/15'
                        : 'bg-white/[0.01] border-white/5'
                    )}>
                      <p className={cn('text-3xl font-black', h.active ? 'text-emerald-400 opacity-70' : 'text-white/10')}>{h.num}</p>
                      <p className={cn('text-lg font-black uppercase tracking-tight', h.active ? 'text-white' : 'text-white/20')}>{h.action}</p>
                      <p className={cn('text-[10px] font-medium leading-snug', h.active ? 'text-white/40' : 'text-white/15')}>{h.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sources */}
              <div className="pt-6 border-t border-white/5">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/10 mb-3">{t('Sources')}</p>
                <p className="text-[10px] text-white/20 font-medium leading-relaxed">
                  PMC microplastic toxicity studies · Lawrence Berkeley National Laboratory · European Parliament environmental reports · Basel Convention · UNEP
                </p>
                <div className="flex gap-6 mt-3">
                  {[
                    { label: 'UNEP', href: 'https://www.unep.org/plastic-pollution' },
                    { label: 'Our World in Data', href: 'https://ourworldindata.org/plastic-pollution' },
                    { label: 'Break Free From Plastic', href: 'https://www.breakfreefromplastic.org' },
                  ].map(link => (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                      className="text-[10px] text-blue-500 hover:text-blue-400 font-bold uppercase tracking-widest transition-colors">
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>

        </div>

      </div>
    </div>
  )
}
