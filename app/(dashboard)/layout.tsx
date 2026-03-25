import Sidebar from '@/components/sidebar'
import { ScanProvider } from '@/lib/scan-context'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ScanProvider>
      <div className="flex h-screen bg-[#020617] relative overflow-hidden font-sans">
        {/* Dynamic Design System Background */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        
        <Sidebar />
        <main className="flex-1 overflow-auto relative z-10 scroll-smooth">
          <div className="max-w-7xl mx-auto min-h-full">
            {children}
          </div>
        </main>
      </div>
    </ScanProvider>
  )
}
