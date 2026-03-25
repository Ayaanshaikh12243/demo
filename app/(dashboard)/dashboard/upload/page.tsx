'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api'
import { useLanguage } from '@/lib/language-context'
import { useScanData } from '@/lib/scan-context'
import { 
  Upload, 
  CheckCircle, 
  Loader2, 
  ScanLine, 
  RefreshCcw, 
  Activity,
  Target,
  BarChart2,
  Trash2,
  ListChecks,
  Lightbulb,
  Leaf,
  BookOpen,
  Cpu,
  Fingerprint,
  ChevronRight
} from 'lucide-react'
import { PLASTICS_DATA } from '@/lib/plastics-impact-data'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function UploadPage() {
  const router = useRouter()
  const { language, t } = useLanguage()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { scans: history, analytics: stats, pushScan, refresh } = useScanData()
  
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [result, setResult] = useState<any | null>(null)

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Neural system requires image assets (JPG, PNG)')
      return
    }
    setFile(selectedFile)
    setResult(null)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(selectedFile)
  }

  const handleAnalyze = async () => {
    if (!file) return
    setIsLoading(true)
    try {
      const region = "India"
      console.log("Handshaking with Neural Node...")
      const res = await apiClient.uploadImage(file, language, region)
      console.log("Neural Response Received:", res)
      if (res.success && res.data) {
        const { plastic_type, confidence } = res.data

        // 1. Get enrichment details from Featherless AI (while still loading)
        const enrichment = await apiClient.enrichResult(plastic_type, language)

        // 2. Merge into final result and SHOW the result card FIRST
        const finalResult = {
          ...res.data,
          ...(enrichment.success ? enrichment.data : {})
        }
        setResult(finalResult)
        toast.success(t('Neural handshake complete. Material identified.'))

        // 3. ONLY AFTER result is shown — update stats/history in sidebar
        const newScan = {
          plastic_type,
          confidence,
          timestamp: new Date().toISOString(),
          recommendations: ['Rinse before recycling', 'Check local guidelines'],
        }
        pushScan(newScan)

        // 4. Persist to local backend DB in the background (non-blocking)
        apiClient.logScanToBackend(file, language, region).catch((logErr) => {
          console.warn('[Upload] Backend log failed (non-blocking):', logErr)
        })

        // 5. Full backend refresh after DB has time to commit
        setTimeout(() => refresh(), 2500)
      } else {
        toast.error(res.error || 'Cognitive analysis failed.')
      }
    } catch (err) {
      toast.error('System error during neural inference.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetScanner = () => {
    setFile(null); setPreview(null); setResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="p-8 lg:p-12 relative animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Workspace Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">{t('Core Vision Module')}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter mb-2">
              {t('Neural Scan')}
            </h1>
            <p className="text-white/40 text-sm font-medium max-w-lg leading-relaxed">
              {t('Initialize the high-performance classification grid. Upload material imagery for real-time molecular identification and recycling stream allocation.')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
             <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center gap-4 shadow-blue-glow/10">
                <Cpu className="w-5 h-5 text-blue-500" />
                <div className="pr-4">
                   <p className="text-[9px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">{t('Inference Engine')}</p>
                   <p className="text-xs font-bold text-white uppercase tracking-wider">0x9AB_ACTIVE</p>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-6">
            {result ? (
              /* Results Panel */
              <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                  <Fingerprint className="w-64 h-64" />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 relative z-10">
                  <div className="flex gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-blue-glow">
                       <CheckCircle className="w-8 h-8" />
                     </div>
                     <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-500 mb-1">{t('Target Synched')}</p>
                        <h2 className="text-xl font-black text-white tracking-tight leading-none">{t('Inference Result')}</h2>
                     </div>
                  </div>
                  {preview && (
                    <img src={preview} alt="Target" className="w-20 h-20 object-cover rounded-2xl border border-white/10 shadow-2xl" />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6 mb-12">
                   <div className="p-8 bg-blue-600/10 border border-blue-500/20 rounded-3xl shadow-blue-glow/10">
                      <p className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-500/60 mb-3">{t('MATERIAL_TYPE')}</p>
                      <p className="text-xl font-black text-blue-400 tracking-tighter tabular-nums">{result.plastic_type || 'Unknown'}</p>
                   </div>
                   <div className="p-8 bg-white/[0.04] border border-white/10 rounded-3xl">
                      <p className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30 mb-3">{t('CONFIDENCE_LATTICE')}</p>
                      <p className="text-2xl font-black text-white tracking-tighter tabular-nums">
                        {result.confidence ? (result.confidence * 100).toFixed(1) : '98.2'}%
                      </p>
                      {result.source && (
                        <div className="mt-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full w-fit">
                           <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{result.source}</span>
                        </div>
                      )}
                   </div>
                </div>

                {/* Disposal Matrix */}
                <div className="space-y-8 relative z-10">
                   <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.3em] flex items-center gap-4 py-2">
                      <Trash2 className="w-4 h-4 text-blue-500" />
                      {t('Disposal Protocol Matrix')}
                      <div className="flex-1 h-px bg-white/5" />
                   </h3>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-6 bg-blue-600/5 border border-blue-500/10 rounded-3xl space-y-4">
                         <div className="flex items-center gap-3">
                            <RefreshCcw className="w-4 h-4 text-blue-500"/>
                            <p className="text-[10px] uppercase font-black tracking-widest text-blue-500/80">{t('Recycling Grade')}</p>
                         </div>
                          <p className="text-xl font-bold text-white leading-tight">
                            {result.recycling || (result.disposal?.recyclable ? t('Primary Recyclable') : t('Terminal Waste'))} 
                            <span className="text-xs font-medium text-white/20 ml-3">({t(result.disposal?.bin_colour) || t('High Pressure')})</span>
                         </p>
                         <div className="flex items-center gap-2 mt-2">
                            <div className="w-3 h-3 rounded-full shadow-blue-glow" style={{ backgroundColor: result.disposal?.bin_colour?.toLowerCase() || '#2563EB' }} />
                            <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest leading-none">{t('Bin Segment')}: {t(result.disposal?.bin_colour) || t('Blue')}</span>
                         </div>
                      </div>

                      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                         <div className="flex items-center gap-3">
                            <Leaf className="w-4 h-4 text-green-500"/>
                            <p className="text-[10px] uppercase font-black tracking-widest text-green-500/80">{t('Env Impact Scope')}</p>
                         </div>
                          <p className="text-xs font-medium text-white/40 leading-relaxed italic">
                            &quot;{t(result.disposal?.why_this_matters) || t('Material recovery optimization reduces global carbon leakage.')}&quot;
                            {result.impact_score && (
                              <span className="block mt-2 text-green-500 font-bold">
                                {t('Impact Score')}: {result.impact_score}/100
                              </span>
                            )}
                         </p>
                      </div>
                   </div>

                   <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                         <div className="space-y-6">
                            <p className="text-[10px] uppercase font-black tracking-widest text-blue-500 flex items-center gap-2">
                               <ListChecks className="w-4 h-4"/> {t('Prep Steps')}
                            </p>
                             <ul className="space-y-4">
                               {(result.prep_steps || result.disposal?.preparation_steps || ['Wash and dry thoroughly', 'Remove adhesive labels']).map((step: string, idx: number) => (
                                 <li key={idx} className="flex gap-4 group">
                                   <span className="w-6 h-6 bg-blue-600/10 text-blue-500 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 border border-blue-500/20">{idx + 1}</span>
                                   <span className="text-xs text-white/60 font-bold group-hover:text-white transition-colors">{t(step)}</span>
                                 </li>
                               ))}
                            </ul>
                         </div>
                         <div className="space-y-6">
                            <p className="text-[10px] uppercase font-black tracking-widest text-amber-500 flex items-center gap-2">
                               <Lightbulb className="w-4 h-4"/> {t('System Note')}
                            </p>
                            <div className="space-y-4">
                               <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                                   <p className="text-xs text-amber-500 font-bold leading-relaxed">
                                     CAUTION: {Array.isArray(result.caution) ? result.caution[0] : (t(result.disposal?.common_mistake) || t('Mixed-material contamination detected.'))}
                                  </p>
                               </div>
                               <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                                  <p className="text-xs font-medium text-white/30 leading-relaxed italic">
                                     <span className="text-white font-black uppercase tracking-widest text-[9px] block mb-2 underline decoration-blue-500 decoration-2">{t('Condition Log')}</span>
                                     {t(result.disposal?.condition_note) || t('Lattice data suggests immediate processing for peak recovery.')}
                                  </p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 relative z-10">
                  <Button 
                    onClick={resetScanner}
                    className="h-14 bg-white hover:bg-white/90 text-black text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl active:scale-[0.98]"
                  >
                    <RefreshCcw className="w-4 h-4 mr-3" />
                    {t('Reset Bridge')}
                  </Button>
                  <Button 
                    onClick={() => router.push(`/dashboard/knowledge?type=${result.plastic_type}`)}
                    className="h-14 bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 border border-blue-500/20 text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:shadow-blue-glow/20 active:scale-[0.98]"
                  >
                    <BookOpen className="w-4 h-4 mr-3" />
                    {t('Archive Data')}
                  </Button>
                </div>
              </div>
            ) : (
              /* Upload Zone */
              <div className="space-y-8">
                 <div
                   onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                   onDragLeave={() => setIsDragging(false)}
                   onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
                   className={cn(
                     "relative group flex flex-col items-center justify-center border-2 border-dashed rounded-[40px] p-20 text-center transition-all duration-500 min-h-[450px] cursor-pointer overflow-hidden",
                     isDragging 
                       ? "border-blue-500 bg-blue-600/5 scale-[1.01] shadow-blue-glow" 
                       : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 hover:shadow-2xl"
                   )}
                   onClick={() => !preview && fileInputRef.current?.click()}
                 >
                   <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleFile(e.currentTarget.files?.[0]!)} className="hidden" />

                   {!preview ? (
                     <div className="relative z-10 flex flex-col items-center">
                       <div className="w-20 h-20 rounded-3xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-white/20 mb-10 group-hover:text-blue-500 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700 shadow-xl group-hover:shadow-blue-glow/20">
                         <Upload className="w-8 h-8" />
                       </div>
                       <h2 className="text-xl font-black text-white mb-3 tracking-tighter">
                         {t('Sync Data Asset')}
                       </h2>
                       <p className="text-white/30 text-sm font-medium mb-4 max-w-xs">
                         {t('Deploy material imagery directly onto the neural grid for classification.')}
                       </p>
                       <div className="flex gap-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/20 bg-white/5 px-3 py-1 rounded-full border border-white/5">0xPNG_SYNCC</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/20 bg-white/5 px-3 py-1 rounded-full border border-white/5">0xJPG_HANDSH</span>
                       </div>
                     </div>
                   ) : (
                     <div className="relative w-full flex flex-col items-center animate-in fade-in duration-700 z-10">
                       <div className="relative group/preview">
                         <img src={preview} alt="Snippet" className="max-h-64 w-auto object-cover rounded-3xl shadow-2xl border border-white/10 mb-8" />
                         <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm opacity-0 group-hover/preview:opacity-100 transition-all rounded-3xl flex items-center justify-center">
                           <Button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} variant="secondary" className="font-bold text-xs uppercase tracking-widest rounded-xl">{t('Re-sync Asset')}</Button>
                         </div>
                       </div>
                       <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] bg-white/5 px-4 py-2 rounded-full border border-white/5">
                         Target: {file?.name}
                       </p>
                     </div>
                   )}
                 </div>

                 <Button
                   onClick={handleAnalyze}
                   disabled={!file || isLoading}
                   className={cn(
                     "w-full h-16 text-xs font-black uppercase tracking-[0.3em] rounded-3xl transition-all duration-500 shadow-2xl",
                     file && !isLoading 
                       ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-glow group" 
                       : "bg-white/5 text-white/20 border border-white/5"
                   )}
                 >
                   {isLoading ? (
                     <span className="flex items-center gap-4">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t('Lattice Propagation...')}
                     </span>
                   ) : (
                     <span className="flex items-center gap-3">
                       <ScanLine className="w-5 h-5 group-hover:scale-110 transition-transform" />
                       {t('Initiate Neural Inference')}
                     </span>
                   )}
                 </Button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
             <div className="p-8 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[40px] space-y-8 animate-in slide-in-from-right-4 duration-1000">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30 mb-8 flex items-center gap-3">
                   <Activity className="w-4 h-4 text-blue-500" /> {t('Lattice Intel')}
                </h3>

                <div className="space-y-4">
                    {[
                      { label: t('Scans Logged'), value: stats ? stats.total_predictions : '...', icon: BarChart2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                      { label: t('Inference Prec'), value: stats ? `${Math.round(stats.average_confidence * 100)}%` : '...', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                      { label: t('Cycles Today'), value: stats ? stats.today_predictions : '...', icon: RefreshCcw, color: 'text-amber-500', bg: 'bg-amber-500/10' }
                    ].map((stat, i) => (
                      <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-between hover:bg-white/[0.04] hover:border-blue-500/20 transition-all group">
                         <div className="flex-1 min-w-0 pr-4">
                            <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-2 truncate">{stat.label}</p>
                            <p className="text-2xl font-black text-white group-hover:text-blue-500 transition-colors drop-shadow-blue-glow/20">{stat.value}</p>
                         </div>
                         <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0", stat.bg, stat.color)}>
                            <stat.icon className="w-6 h-6" />
                         </div>
                      </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/5">
                   <p className="text-xs text-white/20 leading-relaxed font-bold uppercase tracking-wider">
                     {t('Node protocols are updated every 600 cycles. Classification implies high-precision neural matching.')}
                   </p>
                </div>
             </div>

             {/* Dynamic History Linkage */}
             <div className="p-8 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[40px] space-y-6 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-3">
                      <ListChecks className="w-4 h-4 text-blue-500" /> {t('Recent Activity')}
                   </h3>
                   <Link href="/dashboard/history" className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:underline px-3 py-1 rounded-full bg-blue-600/5 border border-blue-500/20">
                      {t('Full Ledger')}
                   </Link>
                </div>

                <div className="space-y-3">
                   {history.length > 0 ? history.slice(0, 5).map((item, i) => (
                      <Link key={i} href={`/dashboard/results?type=${item.plastic_type}&confidence=${item.confidence}&history=true`}>
                         <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-blue-500/20 transition-all group flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-lg group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all overflow-hidden">
                                   {(() => {
                                     const p = PLASTICS_DATA.find(pd => pd.abbr === item.plastic_type)
                                     return p?.image ? (
                                       <img src={p.image} alt={item.plastic_type} className="w-full h-full object-cover" />
                                     ) : (
                                       <span>{item.plastic_type === 'PET' ? '🍾' : item.plastic_type === 'HDPE' ? '🥛' : item.plastic_type === 'PVC' ? '🔧' : item.plastic_type === 'LDPE' ? '🛍️' : item.plastic_type === 'PP' ? '📦' : item.plastic_type === 'PS' ? '🥡' : '♻️'}</span>
                                     )
                                   })()}
                                </div>
                               <div>
                                  <p className="text-sm font-black text-white group-hover:text-blue-500 transition-colors uppercase tracking-tight">{item.plastic_type}</p>
                                  <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{Math.round((item.confidence || 0) * 100)}% {t('Accuracy')}</p>
                               </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                         </div>
                      </Link>
                   )) : (
                      <div className="py-8 text-center bg-white/[0.01] border border-dashed border-white/5 rounded-2xl">
                         <p className="text-[10px] font-black text-white/10 uppercase tracking-widest">{t('No local detections')}</p>
                      </div>
                   )}
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}
