"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRightIcon } from "lucide-react"

export function NewsCategories() {
  const [activeCategory, setActiveCategory] = useState("technology")
  const [isClient, setIsClient] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)

    // Check if scrolling controls are needed
    const checkScroll = () => {
      if (tabsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
        setScrollPosition(scrollLeft)
        setShowLeftScroll(scrollLeft > 0)
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10)
      }
    }

    checkScroll()
    window.addEventListener("resize", checkScroll)

    return () => {
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  const handleScroll = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = 200
      const newPosition =
        direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

      tabsRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
    }
  }

  const handleTabsScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
      setScrollPosition(scrollLeft)
      setShowLeftScroll(scrollLeft > 0)
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  if (!isClient) {
    return null
  }

  const categories = [
    { id: "technology", name: "Technology", color: "from-blue-400 to-blue-500" },
    { id: "business", name: "Business", color: "from-green-400 to-green-500" },
    { id: "science", name: "Science", color: "from-purple-400 to-purple-500" },
    { id: "health", name: "Health", color: "from-red-400 to-red-500" },
    { id: "entertainment", name: "Entertainment", color: "from-pink-400 to-pink-500" },
    { id: "sports", name: "Sports", color: "from-orange-400 to-orange-500" },
    { id: "politics", name: "Politics", color: "from-indigo-400 to-indigo-500" },
    { id: "environment", name: "Environment", color: "from-emerald-400 to-emerald-500" },
  ]

  return (
    <Card className="relative overflow-hidden border-none bg-white shadow-md dark:bg-zinc-900">
      <CardContent className="p-0">
        <div className="relative flex items-center">
          {/* Left scroll button */}
          <AnimatePresence>
            {showLeftScroll && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 z-10 h-full w-12 bg-gradient-to-r from-white via-white to-transparent pl-2 dark:from-zinc-900 dark:via-zinc-900"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleScroll("left")}
                >
                  <ChevronRightIcon className="h-5 w-5 rotate-180" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Categories */}
          <div
            ref={tabsRef}
            className="flex w-full items-center gap-2 overflow-x-auto px-4 py-4 scrollbar-hide"
            onScroll={handleTabsScroll}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "text-white"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeCategoryBackground"
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${category.color}`}
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Right scroll button */}
          <AnimatePresence>
            {showRightScroll && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 z-10 h-full w-12 bg-gradient-to-l from-white via-white to-transparent pr-2 dark:from-zinc-900 dark:via-zinc-900"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleScroll("right")}
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
