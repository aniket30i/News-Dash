"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ZapIcon, ChevronRightIcon } from "lucide-react"

export function WelcomeHero() {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    setMounted(true)

    // Set current time
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      setCurrentTime(timeString)

      // Set greeting based on time of day
      if (hours < 12) {
        setGreeting("Good morning")
      } else if (hours < 18) {
        setGreeting("Good afternoon")
      } else {
        setGreeting("Good evening")
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <Card className="relative overflow-hidden border-none bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 text-zinc-900 shadow-xl dark:from-yellow-500/80 dark:to-yellow-600/80">
      <CardContent className="p-8">
        <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <motion.div
              className="mb-1 text-sm font-medium opacity-80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {currentTime} •{" "}
              {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
            </motion.div>

            <motion.h1
              className="text-3xl font-bold tracking-tight md:text-4xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {greeting}, John
            </motion.h1>

            <motion.p
              className="mt-2 max-w-md opacity-80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Your personalized AI news feed is ready. Discover today's top stories curated just for you.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <Button
              size="lg"
              className="rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              <ZapIcon className="mr-2 h-5 w-5" />
              Explore Premium
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </CardContent>

      {/* Abstract background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg
          className="absolute -right-24 -top-24 h-64 w-64 rotate-12 text-yellow-300/30"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M42.7,-62.9C56.7,-53.5,70.3,-42.8,76.4,-28.5C82.4,-14.2,80.9,3.7,74.9,19.1C68.9,34.6,58.5,47.6,45.1,57.3C31.7,67,15.8,73.3,-0.2,73.6C-16.2,73.8,-32.5,67.9,-45.5,58.1C-58.5,48.2,-68.3,34.3,-73.5,18.1C-78.7,1.9,-79.3,-16.5,-72.2,-31.1C-65.1,-45.7,-50.2,-56.5,-35.6,-65.6C-21,-74.7,-6.8,-82.1,6.9,-82.1C20.6,-82.1,41.2,-74.7,56.7,-62.9Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute -bottom-16 -left-16 h-48 w-48 -rotate-12 text-yellow-600/20"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M47.7,-73.2C62.1,-65.3,74.5,-52.1,79.4,-36.9C84.3,-21.6,81.7,-4.3,76.9,11.5C72.2,27.3,65.4,41.5,54.8,52.4C44.3,63.2,30,70.6,14.2,74.8C-1.6,79,-18.8,80,-33.6,74.7C-48.3,69.4,-60.6,57.8,-69.8,43.5C-79,29.2,-85.1,12.2,-84.1,-4.3C-83.1,-20.8,-75,-36.8,-63.3,-48.4C-51.6,-60,-36.3,-67.2,-21.1,-74.5C-5.9,-81.8,9.2,-89.2,24.4,-87.1C39.6,-85,54.9,-73.4,69.9,-59.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </Card>
  )
}
