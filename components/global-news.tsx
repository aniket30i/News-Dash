"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon, TrendingUpIcon } from "lucide-react"
import { motion } from "framer-motion"

interface GlobalNewsProps {
  title: string
}

export function GlobalNews({ title }: GlobalNewsProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  // Mock data for global news
  const newsItems = [
    {
      id: 1,
      title: "AI Regulation Framework Proposed by International Coalition",
      source: "Reuters",
      time: "1 hour ago",
      trending: true,
    },
    {
      id: 2,
      title: "Quantum Computing Breakthrough Promises New Era of Secure Communications",
      source: "BBC",
      time: "3 hours ago",
      trending: false,
    },
    {
      id: 3,
      title: "Neural Implant Allows Paralyzed Patient to Control Computer with Thoughts",
      source: "CNN",
      time: "5 hours ago",
      trending: true,
    },
    {
      id: 4,
      title: "Major Tech Companies Pledge $1 Billion for Responsible AI Development",
      source: "Financial Times",
      time: "7 hours ago",
      trending: false,
    },
  ]

  return (
    <Card className="border-none shadow-md h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          {title === "Global Trending" && <TrendingUpIcon className="h-4 w-4 text-yellow-500" />}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
        >
          View All
          <ChevronRightIcon className="ml-1 h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative flex flex-col space-y-1 rounded-lg p-2 transition-colors hover:bg-muted/50"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-400 dark:border-yellow-800"
                  >
                    {item.source}
                  </Badge>
                  {item.trending && <Badge className="bg-yellow-500 hover:bg-yellow-500 text-white">Trending</Badge>}
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
              <a
                href="#"
                className="line-clamp-2 text-sm font-medium group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors"
              >
                {item.title}
              </a>

              {hoveredItem === item.id && (
                <motion.div
                  className="absolute -right-1 top-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700 dark:text-yellow-400 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-300"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
