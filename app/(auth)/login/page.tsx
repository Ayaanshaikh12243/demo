'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  AlertCircle, 
  Loader2, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Globe, 
  ArrowRight,
  ChevronRight,
  Lock,
  Mail
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    const success = await login(email, password)
    
    if (success) {
      router.push('/dashboard')
    } else {
      setError('Invalid credentials. Neural handshake failed.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white relative flex items-center justify-center p-4 overflow-hidden font-sans">
      {/* Background System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="w-full max-w-lg relative">
        {/* Logo Section */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 mb-6 shadow-blue-glow overflow-hidden p-1">
            <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase mb-2">
            Plastic<span className="text-blue-500">AI</span>
          </h1>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Initialize Secure Interface</p>
        </div>

        {/* glassmorphism Login Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Lock className="w-24 h-24 rotate-12" />
          </div>

          <div className="relative z-10">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Encrypted Auth</span>
              </div>
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-sm text-white/50 mt-1 font-medium">Connect to your neural node</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium animate-in slide-in-from-top-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                    <Input 
                      type="email"
                      placeholder="name@company.com"
                      className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20 pl-11 pr-4 font-medium"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between px-1">
                    <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Password</label>
                    <Link href="#" className="text-[10px] font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest">Lost Key?</Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                    <Input 
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20 pl-11 pr-12 font-medium"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-blue-glow transition-all active:scale-[0.98] mt-4"
              >
                {isLoading ? (
                  <span className="flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Authenticating Node...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Enter Dashboard
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-10 flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-white/40">
                New to the system? 
                <Link href="/register" className="text-blue-500 font-bold hover:underline">Create Account</Link>
              </div>

              <div className="flex items-center gap-4 text-white/20 text-[10px] uppercase font-black tracking-[0.2em]">
                <ShieldCheck className="w-3.5 h-3.5" />
                SECURE ACCESS NODES
              </div>
            </div>
          </div>
        </div>

        {/* Language Switcher Overlay */}
        <div className="mt-8 flex justify-center">
          <Button variant="ghost" className="rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest px-4 h-8 flex gap-2 text-white/50">
            <Globe className="w-3.5 h-3.5" />
            LOCALE: ENGLISH
          </Button>
        </div>
      </div>
    </div>
  )
}
