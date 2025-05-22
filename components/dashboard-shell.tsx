"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Sidebar } from "@/components/sidebar"
import { TopNavigation } from "@/components/top-navigation"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Background gradient elements */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[120px] dark:bg-yellow-400/5" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-yellow-500/10 blur-[100px] dark:bg-yellow-500/5" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-yellow-300/10 blur-[80px] dark:bg-yellow-300/5" />
      </div>

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 overflow-auto">
        <TopNavigation sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="relative z-10 px-6 py-8 md:px-10 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
