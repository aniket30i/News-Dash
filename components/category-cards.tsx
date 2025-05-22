"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRightIcon, TrendingUpIcon, NewspaperIcon, SettingsIcon } from "lucide-react"
import { CategoryManagement } from "@/components/category-management"

export function CategoryCards() {
  const [showSettings, setShowSettings] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Mock data for user-selected categories
  const categories = [
    {
      id: "technology",
      name: "Technology",
      color: "from-blue-400 to-blue-500",
      icon: <TrendingUpIcon className="h-5 w-5" />,
      articles: [
        {
          id: 1,
          title: "OpenAI Announces GPT-5 with Revolutionary Multimodal Capabilities",
          source: "TechCrunch",
          time: "2 hours ago",
        },
        {
          id: 2,
          title: "Google's DeepMind Solves Protein Folding for All Known Proteins",
          source: "Nature",
          time: "5 hours ago",
        },
      ],
    },
    {
      id: "business",
      name: "Business",
      color: "from-green-400 to-green-500",
      icon: <TrendingUpIcon className="h-5 w-5" />,
      articles: [
        {
          id: 3,
          title: "Amazon Acquires AI Startup for $3.2 Billion to Enhance Logistics",
          source: "Bloomberg",
          time: "3 hours ago",
        },
        {
          id: 4,
          title: "Tesla Reports Record Quarterly Profits as EV Demand Surges",
          source: "Financial Times",
          time: "6 hours ago",
        },
      ],
    },
    {
      id: "science",
      name: "Science",
      color: "from-purple-400 to-purple-500",
      icon: <TrendingUpIcon className="h-5 w-5" />,
      articles: [
        {
          id: 5,
          title: "Breakthrough in Quantum Computing Achieves Quantum Advantage",
          source: "Science",
          time: "6 hours ago",
        },
        {
          id: 6,
          title: "NASA's James Webb Telescope Discovers Potential Habitable Exoplanet",
          source: "Space.com",
          time: "8 hours ago",
        },
      ],
    },
    {
      id: "health",
      name: "Health",
      color: "from-red-400 to-red-500",
      icon: <TrendingUpIcon className="h-5 w-5" />,
      articles: [
        {
          id: 7,
          title: "AI System Detects Early-Stage Cancer with 99% Accuracy in Trial",
          source: "Medical News Today",
          time: "4 hours ago",
        },
        {
          id: 8,
          title: "New mRNA Vaccine Shows Promise Against Multiple Cancer Types",
          source: "The Lancet",
          time: "7 hours ago",
        },
      ],
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <div ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-zinc-900">
            <NewspaperIcon className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Your Categories</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          onClick={() => setShowSettings(true)}
        >
          <SettingsIcon className="mr-2 h-4 w-4" />
          Manage Categories
        </Button>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {categories.map((category, index) => (
          <motion.div key={category.id} variants={item}>
            <Card className="h-full overflow-hidden border-none bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-zinc-900">
              <CardHeader className="pb-2 pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r ${category.color} text-white`}
                    >
                      {category.icon}
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </div>
                  <Badge className={`bg-gradient-to-r ${category.color} text-white`}>
                    {category.articles.length} articles
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-3">
                  {category.articles.map((article) => (
                    <div
                      key={article.id}
                      className="group relative flex flex-col space-y-1 rounded-lg p-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/50"
                        >
                          {article.source}
                        </Badge>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{article.time}</span>
                      </div>
                      <a
                        href="#"
                        className="line-clamp-1 text-sm font-medium group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors"
                      >
                        {article.title}
                      </a>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <ArrowUpRightIcon className="h-4 w-4 text-yellow-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3 w-full justify-center rounded-lg text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 dark:text-yellow-400 dark:hover:bg-yellow-900/20 dark:hover:text-yellow-300"
                >
                  View All {category.name} News
                  <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Category Management Modal */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <CategoryManagement onClose={() => setShowSettings(false)} />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
