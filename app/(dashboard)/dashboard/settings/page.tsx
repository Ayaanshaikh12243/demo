'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Shield, 
  CheckCircle, 
  ShieldCheck, 
  Loader2, 
  Smartphone, 
  Laptop, 
  RefreshCcw, 
  Plus, 
  Fingerprint, 
  Activity,
  Sparkles,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>('Just now')

  const [formData, setFormData] = useState({
    name: user?.name || 'Ayaan Shaikh',
    email: user?.email || 'ayaan@hackniche.com',
    role: 'Lead Architect',
    organization: 'PlasticAI Core Team',
    twoFactorEnabled: false,
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    setShowSuccess(false)
    await new Promise(resolve => setTimeout(resolve, 1200))
    setIsSaving(false)
    setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    setShowSuccess(true)
    toast.success('Lattice synchronization complete')
    setTimeout(() => setShowSuccess(false), 4000)
  }

  const navItems = [
    { id: 'profile', label: 'Neural Identity', icon: User },
    { id: 'security', label: 'Security Bridge', icon: Shield },
  ]

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] p-8 gap-8 grayscale opacity-20">
         <div className="w-64 space-y-4">
            {[1, 2].map(i => <Skeleton key={i} className="h-12 w-full rounded-xl bg-white/5" />)}
         </div>
         <div className="flex-1 space-y-8">
            <Skeleton className="h-24 w-1/3 rounded-[32px] bg-white/5" />
            <Skeleton className="h-[400px] w-full rounded-[40px] bg-white/5" />
         </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-4rem)]">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-white/5 p-6 lg:p-8 flex flex-row lg:flex-col gap-2 overflow-x-auto custom-scrollbar shrink-0">
        <div className="hidden lg:block mb-10 pl-2">
           <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">System Config v2.4</span>
           </div>
        </div>

        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex items-center gap-4 px-5 h-14 rounded-2xl transition-all duration-300 group shrink-0",
              activeTab === item.id 
                ? "bg-blue-600/10 border border-blue-500/20 text-white shadow-lg shadow-blue-900/10" 
                : "text-white/30 hover:text-white/60 hover:bg-white/[0.02] border border-transparent"
            )}
          >
            <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeTab === item.id ? "text-blue-500" : "text-white/20")} />
            <span className="text-xs font-black uppercase tracking-widest">{t(item.label)}</span>
          </button>
        ))}

        <div className="mt-auto hidden lg:block p-6 rounded-3xl bg-white/[0.02] border border-white/5">
           <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-3">State: Synchronized</p>
           <p className="text-[10px] font-bold text-blue-500/60 uppercase">{lastUpdated}</p>
           <div className="mt-6 flex flex-col gap-3">
              <button onClick={() => window.location.reload()} className="flex items-center gap-3 text-[9px] font-black text-white/30 hover:text-white uppercase transition-colors">
                 <RefreshCcw className="w-3 h-3" />
                 Terminal Reset
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-12 pb-40 relative">
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000">
          
          {activeTab === 'profile' && (
            <div className="space-y-12">
              <header className="border-b border-white/5 pb-10">
                <h1 className="text-2xl font-black text-white tracking-tighter mb-3">{t('Neural Identity')}</h1>
                <p className="text-white/40 text-sm font-medium leading-relaxed">{t('Modify your core biological and digital markers across the PlasticAI neural lattice.')}</p>
              </header>

              <section className="space-y-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-2xl group-hover:blur-3xl transition-all opacity-0 group-hover:opacity-100" />
                    <Avatar className="w-28 h-28 border-2 border-white/10 ring-8 ring-blue-600/5 relative z-10 transition-transform group-hover:scale-105">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-blue-600 text-3xl font-black">AS</AvatarFallback>
                    </Avatar>
                    <button className="absolute -bottom-1 -right-1 w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white border-4 border-[#020617] relative z-20 hover:scale-110 transition-all">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-1">{t('Identity Visual')}</h3>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em] mb-6">OXIMG_PNG • Max 2.4MB Depth</p>
                    <div className="flex gap-4">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase h-11 px-8 rounded-xl shadow-blue-glow/20 transition-all">
                        {t('Deploy New')}
                      </Button>
                      <Button variant="ghost" className="text-white/30 hover:text-white uppercase text-[10px] font-black h-11 px-6 tracking-widest">{t('Purge')}</Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { label: 'Network Alias', key: 'name', type: 'text' },
                    { label: 'Access Token (Read-Only)', key: 'email', type: 'email', disabled: true },
                    { label: 'Function Assignment', key: 'role', type: 'text' },
                    { label: 'Node Cluster', key: 'organization', type: 'text' }
                  ].map((field) => (
                    <div key={field.label} className="space-y-4">
                      <label className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20 ml-1">{t(field.label)}</label>
                      <Input 
                        value={formData[field.key as keyof typeof formData] as string} 
                        disabled={field.disabled}
                        onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                        className={cn(
                          "h-14 bg-white/[0.02] border-white/5 text-white rounded-2xl focus:ring-blue-500/50 focus:border-blue-500 transition-all px-6 font-bold",
                          field.disabled && "opacity-30 font-mono text-[11px] cursor-not-allowed uppercase"
                        )}
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-10" />

                {/* Unique Section: Neural Experimental */}
                <div className="bg-blue-600/5 border border-blue-500/20 rounded-[32px] p-8 space-y-6 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                      <Zap className="w-32 h-32 text-blue-500" />
                   </div>
                   <div className="flex items-center gap-4 relative z-10">
                      <Sparkles className="w-5 h-5 text-blue-500" />
                      <h3 className="text-sm font-black text-white uppercase tracking-widest">{t('Neural Interface Experimental')}</h3>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                      {[
                        { label: 'High-Fidelity Rendering', desc: 'Enable advanced glassmorphism' },
                        { label: 'Neural Predictive Input', desc: 'Auto-complete material codes' },
                      ].map((exp, i) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-black/20 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all">
                           <div>
                              <p className="text-[10px] font-black text-white uppercase mb-1">{t(exp.label)}</p>
                              <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest">{t(exp.desc)}</p>
                           </div>
                           <Switch defaultChecked={i === 0} className="data-[state=checked]:bg-blue-600 scale-75" />
                        </div>
                      ))}
                   </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-12">
              <header className="border-b border-white/5 pb-10">
                <h1 className="text-2xl font-black text-white tracking-tighter mb-3">{t('Security Bridge')}</h1>
                <p className="text-white/40 text-sm font-medium leading-relaxed">{t('Hardcode your access protocols and audit neural handshakes.')}</p>
              </header>

              <div className="space-y-12">
                <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-[40px] p-10 space-y-10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
                     <Fingerprint className="w-48 h-48" />
                   </div>
                   <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 rounded-[24px] bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shadow-blue-glow/10">
                            <ShieldCheck className="w-8 h-8" />
                         </div>
                         <div>
                            <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-1">{t('Dual-Layer Auth')}</h3>
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{t('Biometric & Cipher Handshake')}</p>
                         </div>
                      </div>
                      <Switch 
                        checked={formData.twoFactorEnabled} 
                        onCheckedChange={(val) => setFormData({...formData, twoFactorEnabled: val})}
                        className="data-[state=checked]:bg-blue-600"
                      />
                   </div>
                   <div className="h-px bg-white/5" />
                   <div className="space-y-4">
                      <label className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20 ml-1">{t('Credential Rotation')}</label>
                      <Button variant="outline" className="w-full h-16 justify-between border-white/5 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl px-6 text-sm font-black text-white/50 hover:text-white transition-all group">
                         {t('Regenerate Master Key')}
                         <Plus className="w-5 h-5 text-white/20 group-hover:text-blue-500" />
                      </Button>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <Activity className="w-4 h-4 text-white/20" />
                      <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">{t('Active Neural Sessions')}</h3>
                   </div>
                   <div className="space-y-3">
                      {[
                        { node: 'Desktop Station 01', loc: 'Maharashtra, IN', last: 'Now', icon: Laptop },
                        { node: 'Mobile Terminal 04', loc: 'Mumbai, IN', last: '2h ago', icon: Smartphone }
                      ].map((session, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-white/10 transition-all">
                           <div className="flex items-center gap-6">
                              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-blue-500 transition-colors">
                                 <session.icon className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="font-black text-white text-sm uppercase mb-1 tracking-tighter">{session.node}</p>
                                 <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.1em]">{session.loc} • {session.last}</p>
                              </div>
                           </div>
                           <Button variant="ghost" className="text-[9px] font-black text-red-500/50 hover:text-red-500 uppercase tracking-widest">{t('Abort')}</Button>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* Normal Footer Controls */}
          <div className="relative z-40 pb-20 mt-16 px-2 hidden lg:block">
            <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-8 flex items-center justify-between relative overflow-hidden group">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-2">{t('System Status')}</p>
                  <div className="flex items-center gap-3">
                     <div className={cn(
                       "w-2 h-2 rounded-full shadow-blue-glow",
                       showSuccess ? "bg-green-500 animate-pulse" : "bg-blue-600"
                     )} />
                     <span className="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">
                       {showSuccess ? t('Changes Saved') : t('Authorized for Deployment')}
                     </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                 <Button 
                    variant="ghost" 
                    onClick={() => setActiveTab('profile')}
                    className="h-12 px-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white rounded-2xl whitespace-nowrap"
                 >
                    {t('Abort')}
                 </Button>
                 <Button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="h-12 px-10 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all active:scale-[0.97] hover:bg-blue-600 hover:text-white hover:shadow-blue-glow disabled:opacity-50 whitespace-nowrap"
                 >
                    {isSaving ? (
                      <span className="flex items-center gap-3">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('Saving...')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                         <Fingerprint className="w-4 h-4" />
                         {t('Commit State')}
                      </span>
                    )}
                 </Button>
              </div>
            </div>
          </div>

          {/* Mobile Footer (Non-fixed to avoid overlap) */}
          <div className="lg:hidden mt-20 pb-10 px-2">
            <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex flex-col gap-6">
               <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-2.5 h-2.5 rounded-full shadow-blue-glow",
                    showSuccess ? "bg-green-500 animate-pulse" : "bg-blue-600"
                  )} />
                  <span className="text-xs font-black text-white/50 uppercase tracking-widest">
                    {showSuccess ? t('Changes Saved') : t('System Ready')}
                  </span>
               </div>
               <Button onClick={handleSave} disabled={isSaving} className="h-16 bg-white text-black font-black uppercase rounded-2xl w-full text-sm tracking-widest">
                  {isSaving ? t('Saving...') : t('Sync Lattice')}
               </Button>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
