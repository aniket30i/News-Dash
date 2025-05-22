"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon, TrendingUpIcon, GlobeIcon, ArrowUpRightIcon, InfoIcon, ZapIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function GlobalNewsSection() {
  const [activeTab, setActiveTab] = useState("trending")
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Mock data for global news
  const newsData = {
    trending: [
      {
        id: 1,
        title: "AI Regulation Framework Proposed by International Coalition",
        source: "Reuters",
        time: "1 hour ago",
        trending: true,
        region: "Global",
      },
      {
        id: 2,
        title: "Quantum Computing Breakthrough Promises New Era of Secure Communications",
        source: "BBC",
        time: "3 hours ago",
        trending: false,
        region: "Europe",
      },
      {
        id: 3,
        title: "Neural Implant Allows Paralyzed Patient to Control Computer with Thoughts",
        source: "CNN",
        time: "5 hours ago",
        trending: true,
        region: "North America",
      },
      {
        id: 4,
        title: "Major Tech Companies Pledge $1 Billion for Responsible AI Development",
        source: "Financial Times",
        time: "7 hours ago",
        trending: false,
        region: "Global",
      },
    ],
    editors: [
      {
        id: 5,
        title: "The Future of Work: How AI is Reshaping Industries and Creating New Opportunities",
        source: "The Economist",
        time: "2 hours ago",
        trending: false,
        region: "Global",
      },
      {
        id: 6,
        title: "Climate Tech Innovations That Could Help Reverse Global Warming",
        source: "National Geographic",
        time: "4 hours ago",
        trending: true,
        region: "Global",
      },
      {
        id: 7,
        title: "The Ethics of Brain-Computer Interfaces: Privacy and Identity Concerns",
        source: "Wired",
        time: "6 hours ago",
        trending: false,
        region: "North America",
      },
      {
        id: 8,
        title: "How Developing Nations Are Leapfrogging with AI and Blockchain Technologies",
        source: "Al Jazeera",
        time: "8 hours ago",
        trending: true,
        region: "Asia",
      },
    ],
  }

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
            <GlobeIcon className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Global Perspective</h2>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="h-9 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
            <TabsTrigger
              value="trending"
              className="relative rounded-lg px-3 text-sm data-[state=active]:bg-white data-[state=active]:text-zinc-900 dark:data-[state=active]:bg-zinc-900 dark:data-[state=active]:text-zinc-50"
            >
              <div className="flex items-center gap-1.5">
                <TrendingUpIcon className="h-3.5 w-3.5" />
                <span>Trending</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="editors"
              className="relative rounded-lg px-3 text-sm data-[state=active]:bg-white data-[state=active]:text-zinc-900 dark:data-[state=active]:bg-zinc-900 dark:data-[state=active]:text-zinc-50"
            >
              Editor's Picks
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="grid gap-6 md:grid-cols-2">
          <TabsContent value="trending" className="mt-0">
            <Card className="h-full border-none bg-white shadow-md dark:bg-zinc-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6">
                <CardTitle className="text-lg">Global Trending</CardTitle>
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
                <motion.div
                  className="space-y-4"
                  variants={container}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                >
                  {newsData.trending.map((item) => (
                    <motion.div
                      key={item.id}
                      className="group relative flex flex-col space-y-1 rounded-xl p-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      variants={item}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/50"
                          >
                            {item.source}
                          </Badge>
                          {item.trending && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-900">
                              Trending
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="border-zinc-200 bg-transparent text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
                          >
                            {item.region}
                          </Badge>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.time}</span>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="line-clamp-2 text-sm font-medium group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors"
                      >
                        {item.title}
                      </a>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <ArrowUpRightIcon className="h-4 w-4 text-yellow-500" />
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="editors" className="mt-0">
            <Card className="h-full border-none bg-white shadow-md dark:bg-zinc-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6">
                <CardTitle className="text-lg">Editor's Picks</CardTitle>
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
                <motion.div
                  className="space-y-4"
                  variants={container}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                >
                  {newsData.editors.map((item) => (
                    <motion.div
                      key={item.id}
                      className="group relative flex flex-col space-y-1 rounded-xl p-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      variants={item}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/50"
                          >
                            {item.source}
                          </Badge>
                          {item.trending && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-900">
                              Trending
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="border-zinc-200 bg-transparent text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
                          >
                            {item.region}
                          </Badge>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.time}</span>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="line-clamp-2 text-sm font-medium group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors"
                      >
                        {item.title}
                      </a>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <ArrowUpRightIcon className="h-4 w-4 text-yellow-500" />
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      {/* New App Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6"
      >
        <Card className="relative overflow-hidden border-none bg-white shadow-md dark:bg-zinc-900">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-yellow-400/5 blur-[100px]" />
            <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-yellow-400/5 blur-[100px]" />
          </div>

          <CardContent className="relative z-10 flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-zinc-900">
                <InfoIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">About NewsAI</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  NewsAI uses advanced artificial intelligence to curate and summarize news from around the world. Our
                  platform analyzes thousands of sources to bring you the most relevant and insightful content.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <Button
                variant="outline"
                className="rounded-xl border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Learn More
              </Button>
              <Button className="rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-900 hover:from-yellow-500 hover:to-yellow-600">
                <ZapIcon className="mr-2 h-4 w-4" />
                Take a Tour
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
