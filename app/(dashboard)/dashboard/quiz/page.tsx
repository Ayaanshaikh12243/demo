'use client'

import React, { useState, useEffect } from 'react'
import {
  Trophy,
  Brain,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  Award,
  BookOpen,
  Share2,
  Zap,
  Loader2,
  Target,
  Cpu,
  Activity,
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { apiClient } from '@/lib/api'
import { useLanguage } from '@/lib/language-context'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const PLASTIC_TOPICS = [
  { id: 'all',   label: 'All Types',  desc: 'Mixed general knowledge',  color: 'border-blue-500/40 bg-blue-600/10 text-blue-400' },
  { id: 'PET',   label: 'PET',        desc: 'Polyethylene Terephthalate', color: 'border-emerald-500/40 bg-emerald-600/10 text-emerald-400' },
  { id: 'HDPE',  label: 'HDPE',       desc: 'High-Density Polyethylene', color: 'border-cyan-500/40 bg-cyan-600/10 text-cyan-400' },
  { id: 'PVC',   label: 'PVC',        desc: 'Polyvinyl Chloride',        color: 'border-purple-500/40 bg-purple-600/10 text-purple-400' },
  { id: 'LDPE',  label: 'LDPE',       desc: 'Low-Density Polyethylene',  color: 'border-amber-500/40 bg-amber-600/10 text-amber-400' },
  { id: 'PP',    label: 'PP',         desc: 'Polypropylene',             color: 'border-rose-500/40 bg-rose-600/10 text-rose-400' },
  { id: 'PS',    label: 'PS',         desc: 'Polystyrene',               color: 'border-orange-500/40 bg-orange-600/10 text-orange-400' },
  { id: 'Other', label: 'Other',      desc: 'Mixed/Other Plastics',      color: 'border-slate-500/40 bg-slate-600/10 text-slate-400' },
]

export default function EcoQuiz() {
  const { language, t } = useLanguage()
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle')
  const [questions, setQuestions] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [aiInsights, setAiInsights] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('all')

  const startQuiz = async () => {
    setLoading(true)
    const topic = selectedTopic === 'all' ? undefined : selectedTopic
    const res = await apiClient.fetchQuiz(language, topic)
    if (res.success && res.data) {
      setQuestions(res.data)
      setGameState('playing')
      setCurrentIndex(0)
      setScore(0)
      setSelectedOption(null)
      setIsCorrect(null)
    } else {
      toast.error('Failed to load quiz questions. Check backend connection.')
    }
    setLoading(false)
  }

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return
    setSelectedOption(option)
    const correct = option === questions[currentIndex].answer
    setIsCorrect(correct)
    if (correct) setScore(prev => prev + 10)

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1)
        setSelectedOption(null)
        setIsCorrect(null)
      } else {
        finishQuiz()
      }
    }, 5000)
  }

  const finishQuiz = async () => {
    setGameState('result')
    const res = await apiClient.submitQuizResult(score, (questions.length || 5) * 10)
    if (res.success && res.data) {
      setAiInsights(res.data.insights)
    }
  }

  const getPerformanceMessage = () => {
    const totalPossible = (questions.length || 5) * 10
    const percentage = (score / totalPossible) * 100
    if (percentage === 100) return t('Neural Archon')
    if (percentage >= 80) return t('Elite Strategist')
    if (percentage >= 60) return t('Core Operative')
    return t('Trial Candidate')
  }

  /* ─── IDLE SCREEN ─────────────────────────────────────────── */
  if (gameState === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 lg:p-10 animate-in fade-in zoom-in duration-700">
        {/* Hero */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-28 h-28 rounded-[36px] bg-white/[0.03] border border-white/10 flex items-center justify-center text-blue-500 shadow-blue-glow/20"
          >
            <Brain className="w-14 h-14" />
          </motion.div>
        </div>

        <div className="text-center space-y-3 max-w-xl mb-10">
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic">
            {t('Eco')} <span className="text-blue-500">{t('Intelligence')}</span> {t('Test')}
          </h1>
          <p className="text-white/40 text-sm font-medium leading-relaxed">
            {t('Measure your environmental impact awareness. Select a plastic type to focus on, or test general knowledge.')}
          </p>
        </div>

        {/* Topic Selector */}
        <div className="w-full max-w-2xl mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{t('Select Topic')}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PLASTIC_TOPICS.map(topic => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={cn(
                  'group flex flex-col items-start gap-1 p-4 rounded-2xl border-2 transition-all duration-300 text-left',
                  selectedTopic === topic.id
                    ? topic.color + ' shadow-lg'
                    : 'border-white/[0.06] bg-white/[0.02] text-white/40 hover:border-white/20 hover:bg-white/[0.05]'
                )}
              >
                <span className="font-black text-sm tracking-tight">{t(topic.label)}</span>
                <span className="text-[10px] font-bold leading-tight opacity-70 break-words">{t(topic.desc)}</span>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={startQuiz}
          disabled={loading}
          className={cn(
            "h-16 px-14 rounded-[24px] bg-white hover:bg-blue-600 text-black hover:text-white font-black uppercase shadow-2xl transition-all duration-500 group relative overflow-hidden",
            language === 'English' ? "tracking-[0.3em]" : "tracking-normal"
          )}
        >
          <span className="relative z-10 flex items-center gap-4">
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('Loading...')}
              </>
            ) : (
              <>
                {t('Initialize Protocol')}
                <Zap className="w-5 h-5 group-hover:scale-125 transition-transform" />
              </>
            )}
          </span>
        </Button>

        <div className={cn(
          "mt-8 flex flex-wrap gap-6 items-center justify-center text-[10px] font-black text-white/20 uppercase",
          language === 'English' ? "tracking-[0.4em]" : "tracking-widest"
        )}>
          <span>{t('Neural Verified Content')}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          <span>{t('Real-Time Scoring Loop')}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          <span>{t('Multilingual Support')}</span>
        </div>
      </div>
    )
  }

  /* ─── PLAYING SCREEN ──────────────────────────────────────── */
  if (gameState === 'playing') {
    const q = questions[currentIndex]
    const progress = ((currentIndex + 1) / questions.length) * 100

    return (
      <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-700">
        {/* Header: Progress + Score */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-4 bg-blue-600 rounded-full shadow-blue-glow" />
              <span className={cn(
                "text-[10px] font-black text-blue-500 uppercase",
                language === 'English' ? "tracking-[0.4em]" : "tracking-widest"
              )}>{t('Evaluation Stream')}</span>
              {selectedTopic !== 'all' && (
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 uppercase tracking-widest">
                  {selectedTopic}
                </span>
              )}
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">
              {t('Module')} <span className="text-blue-500">{currentIndex + 1}</span> {t('of')} {questions.length}
            </h2>
            {/* Progress Bar */}
            <div className="relative h-2 bg-white/[0.03] border border-white/5 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-blue-600 shadow-blue-glow"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Score card */}
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex justify-between items-center">
            <div className="space-y-0.5">
              <p className={cn(
                "text-[9px] font-black text-white/20 uppercase",
                language === 'English' ? "tracking-[0.3em]" : "tracking-widest"
              )}>{t('Accumulated Intel')}</p>
              <p className="text-xl font-black text-white tabular-nums leading-none">{score}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
              <Activity className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
            <Cpu className="w-48 h-48" />
          </div>

          {/* Question */}
          <div className="p-8 lg:p-12 border-b border-white/5 relative z-10">
            <p className={cn(
              "text-[10px] font-black text-white/20 uppercase mb-4",
              language === 'English' ? "tracking-[0.5em]" : "tracking-widest"
            )}>
              {t('Input required for logic continuity')}
            </p>
            <h3
              className="text-base sm:text-lg font-black text-white leading-relaxed uppercase italic break-words"
              style={{ overflowWrap: 'anywhere' }}
            >
              {t(q.question)}
            </h3>
          </div>

          {/* Options */}
          <div className="p-8 lg:p-12 relative z-10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {q.options.map((option: string) => {
                const isSelected = selectedOption === option
                const isCorrectOption = option === q.answer
                const isWrongSelection = isSelected && !isCorrectOption

                let variantClass =
                  'bg-white/[0.03] border-white/8 hover:bg-white/[0.07] hover:border-blue-500/30 text-white/70'
                if (selectedOption) {
                  if (isCorrectOption)
                    variantClass =
                      'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-[0_0_30px_-10px_rgba(16,185,129,0.4)]'
                  else if (isWrongSelection)
                    variantClass = 'bg-red-500/10 border-red-500/40 text-red-300'
                  else variantClass = 'opacity-25 grayscale pointer-events-none'
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    disabled={!!selectedOption}
                    className={cn(
                      'min-h-[52px] w-full rounded-2xl border flex items-start gap-4 px-5 py-4 transition-all duration-400 text-left',
                      variantClass
                    )}
                  >
                    <span
                      className="flex-1 font-bold text-sm leading-snug break-words"
                      style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                    >
                      {t(option)}
                    </span>
                    <AnimatePresence>
                      {selectedOption && isCorrectOption && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="shrink-0 mt-0.5"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </motion.div>
                      )}
                      {selectedOption && isWrongSelection && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="shrink-0 mt-0.5"
                        >
                          <XCircle className="w-5 h-5 text-red-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {selectedOption && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-6 rounded-2xl bg-blue-600/5 border border-blue-500/20 flex gap-5 items-start relative overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-1.5">
                      {t('Neural Insight')}
                    </p>
                    <p
                      className="text-sm text-white/60 leading-relaxed font-medium italic break-words"
                      style={{ overflowWrap: 'anywhere' }}
                    >
                      &ldquo;{q.explanation}&rdquo;
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    )
  }

  /* ─── RESULT SCREEN ───────────────────────────────────────── */
  if (gameState === 'result') {
    const totalPossible = (questions.length || 5) * 10
    const accuracy = Math.round((score / totalPossible) * 100)

    return (
      <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8 flex flex-col items-center animate-in zoom-in duration-700">
        {/* Hero */}
        <div className="text-center space-y-4 relative w-full">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="pt-8"
          >
            <div className="w-20 h-20 rounded-[28px] bg-blue-600/10 flex items-center justify-center mx-auto mb-6 text-blue-500 border border-blue-500/20 shadow-blue-glow/20">
              <Trophy className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">
              {t('Evaluation')} <span className="text-blue-500">{t('Complete')}</span>
            </h2>
            <p className={cn("text-sm font-black text-blue-400 uppercase", language === 'English' ? "tracking-[0.4em]" : "")}>
              {getPerformanceMessage()}
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {[
            { label: 'Accuracy',       value: `${accuracy}%`,                  sub: 'Logic Precision' },
            { label: 'Questions',      value: `${score / 10} / ${questions.length}`, sub: 'Correct Answers' },
            { label: 'Score',          value: `+${score}`,                     sub: 'Protocol Points' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center space-y-2 hover:bg-white/[0.05] transition-all"
            >
              <p className={cn("text-[9px] font-black text-white/20 uppercase text-center", language === 'English' ? "tracking-[0.4em]" : "")}>{t(stat.label)}</p>
              <p className="text-2xl font-black text-white tabular-nums">{stat.value}</p>
              <p className={cn("text-[9px] font-black text-blue-500 uppercase opacity-50", language === 'English' ? "tracking-widest" : "")}>{t(stat.sub)}</p>
            </div>
          ))}
        </div>

        {/* AI Dossier */}
        <div className="w-full bg-blue-600/5 border border-blue-500/20 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Award className="w-40 h-40" />
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-blue-500" />
            </div>
            <div className="min-w-0 space-y-2">
              <h4 className="text-sm font-black text-white uppercase tracking-tight italic">
                {t('Synthetic Performance Dossier')}
              </h4>
              <p
                className="text-white/40 leading-relaxed text-sm font-medium italic break-words"
                style={{ overflowWrap: 'anywhere' }}
              >
                &ldquo;{aiInsights || 'Synthesizing your performance metrics from the Global Lattice... Your contribution to the circular economy intelligence loop is currently being synchronized.'}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center pt-2">
          <Button
            onClick={() => { setGameState('idle'); setScore(0); setCurrentIndex(0); setSelectedOption(null); }}
            className={cn("h-12 px-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-black uppercase border border-white/10 text-xs transition-all", language === 'English' ? "tracking-widest" : "")}
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            {t('Play Again')}
          </Button>
          <Button
            asChild
            className={cn("h-12 px-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs shadow-blue-glow transition-all", language === 'English' ? "tracking-[0.2em]" : "")}
          >
            <Link href="/dashboard/knowledge">
              <BookOpen className="w-4 h-4 mr-2" />
              {t('Knowledge Hub')}
            </Link>
          </Button>
          <Button
            variant="outline"
            className={cn("h-12 px-8 rounded-xl border-white/10 bg-transparent text-white/40 hover:text-white text-xs transition-all font-black uppercase", language === 'English' ? "tracking-widest" : "")}
            onClick={() => {
              toast.success(t('Score copied to clipboard!'))
              navigator.clipboard.writeText(t('I scored') + ` ${score}/${totalPossible} ` + t('on the PlasticAI Eco Intelligence Test!'))
            }}
          >
            <Share2 className="w-4 h-4 mr-2" />
            {t('Share Score')}
          </Button>
        </div>
      </div>
    )
  }

  /* ─── LOADING FALLBACK ────────────────────────────────────── */
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl animate-pulse" />
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin relative z-10" />
        </div>
        <p className={cn("text-[10px] uppercase font-black text-white/20 animate-pulse", language === 'English' ? "tracking-[0.5em]" : "")}>
          {t('Synchronizing Neural Data Node')}
        </p>
      </div>
    </div>
  )
}
