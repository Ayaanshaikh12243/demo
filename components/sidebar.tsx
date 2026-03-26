'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Languages,
  Upload,
  History,
  BarChart3,
  LogOut,
  Settings,
  Loader2,
  BookOpen,
  Trophy,
  Shield,
  Menu,
  X,
  LayoutDashboard,
  Camera
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Upload Scan', href: '/dashboard/upload', icon: Upload },
  { name: 'Knowledge Hub', href: '/dashboard/knowledge', icon: BookOpen },
  { name: 'Eco Quiz', href: '/dashboard/quiz', icon: Trophy },
  { name: 'Scan History', href: '/dashboard/history', icon: History },
  { name: 'Neural Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Node Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    logout()
    router.push('/login')
  }

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md"
      >
        {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed lg:relative inset-y-0 left-0 w-72 bg-[#020617] border-r border-white/5 flex flex-col z-50 transition-transform duration-300 ease-in-out",
        !isOpen && "-translate-x-full lg:translate-x-0"
      )}>
        {/* Brand Header */}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="w-11 h-11 rounded-[14px] bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] transition-transform hover:scale-105 active:scale-95 cursor-default overflow-hidden p-1">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tighter leading-none">Plastic<span className="text-blue-500">AI</span></h1>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 mt-1">Neural Node 0x{language.substring(0, 2).toUpperCase()}</p>
            </div>
          </div>

          {/* Language Bridge */}
          <div className="relative group">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/10 text-white/50 h-11 px-4 transition-all group-hover:shadow-blue-glow/10">
                  <Languages className="w-4 h-4 text-blue-500/70" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">{t(language)} {t('INTERFACE')}</span>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-white/[0.03] backdrop-blur-2xl border-white/10 rounded-2xl p-2 shadow-2xl">
                {['English', 'Hindi', 'Marathi', 'Urdu'].map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => { setLanguage(lang as any); setIsOpen(false); }}
                    className={cn(
                      "text-xs font-bold uppercase tracking-widest py-3 px-4 rounded-xl cursor-pointer mb-1 last:mb-0 transition-colors",
                      language === lang ? 'bg-blue-600 text-white shadow-blue-glow' : 'text-white/40 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    {t(lang)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Global Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                <Button
                  variant="ghost"
                  className={cn(
                    "group relative w-full h-12 justify-start gap-4 rounded-xl transition-all duration-300 px-4",
                    isActive
                      ? 'bg-blue-600/10 text-white font-bold border border-blue-500/20 shadow-inner overflow-hidden'
                      : 'text-white/40 hover:bg-white/5 hover:text-white/80'
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-blue-500 rounded-r-full shadow-blue-glow-lg animate-in fade-in slide-in-from-left-4" />
                  )}
                  <Icon className={cn(
                    "w-[18px] h-[18px] transition-all duration-500",
                    isActive ? 'text-blue-500 scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'group-hover:text-blue-400 group-hover:scale-105'
                  )} />
                  <span className="text-xs uppercase tracking-[0.15em] font-bold">{t(item.name)}</span>
                  {isActive && (
                    <div className="ml-auto w-1 h-1 rounded-full bg-blue-500 blur-[1px]" />
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Identity Token Section */}
        <div className="p-6 mt-auto">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 mb-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
              <Shield className="w-12 h-12 text-blue-500" />
            </div>
            <p className="text-[9px] uppercase font-black tracking-[0.25em] text-white/30 mb-2">{t('Authenticated Node')}</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center font-mono text-[10px] text-blue-400 font-bold border border-blue-500/10">
                AI
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white/80 truncate leading-none mb-1">
                  {user?.name || user?.email?.split('@')[0]}
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-[9px] font-bold text-white/30 truncate">ACTIVE_SESSION_03X</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="ghost"
            className="w-full h-11 justify-start gap-3 rounded-2xl border border-white/5 bg-white/[0.02] text-white/40 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all font-bold"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                <span className="text-[10px] uppercase tracking-widest">{t('Disconnecting...')}</span>
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest leading-none">{t('Terminate Session')}</span>
              </>
            )}
          </Button>
        </div>
      </aside>
    </>
  )
}
