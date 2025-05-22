"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { BookOpenIcon, BrainIcon, ListChecksIcon, BookmarkIcon, ShareIcon, ArrowUpRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for news articles
const newsData = {
  technology: [
    {
      id: 1,
      title: "OpenAI Announces GPT-5 with Revolutionary Multimodal Capabilities",
      summary:
        "OpenAI has unveiled GPT-5, featuring unprecedented multimodal understanding and generation capabilities that can process text, images, audio, and video simultaneously.",
      image: "/placeholder.svg?height=200&width=400",
      source: "TechCrunch",
      time: "2 hours ago",
      pointsOfInterest: [
        "GPT-5 can process and generate content across text, images, audio, and video",
        "New model shows 40% improvement in reasoning capabilities over GPT-4",
        "Reduced hallucination rate by 65% compared to previous models",
        "API access will be available to developers next month",
        "Pricing structure remains similar to GPT-4 with volume discounts",
      ],
    },
    {
      id: 2,
      title: "Google's DeepMind Solves Protein Folding for All Known Proteins",
      summary:
        "Google's DeepMind has announced that its AlphaFold system has now predicted the structure of virtually all known proteins, revolutionizing drug discovery and biological research.",
      image: "/placeholder.svg?height=200&width=400",
      source: "Nature",
      time: "5 hours ago",
      pointsOfInterest: [
        "AlphaFold has mapped over 200 million protein structures",
        "Data is freely available to researchers worldwide",
        "Expected to accelerate drug discovery by 60%",
        "System uses less computational resources than previous versions",
        "Collaboration with pharmaceutical companies already underway",
      ],
    },
    {
      id: 3,
      title: "Tesla Unveils New AI-Powered Home Energy Management System",
      summary:
        "Tesla has introduced an AI-driven home energy system that optimizes electricity usage, storage, and generation from solar panels, potentially reducing home energy costs by up to 30%.",
      image: "/placeholder.svg?height=200&width=400",
      source: "Electrek",
      time: "8 hours ago",
      pointsOfInterest: [
        "System integrates with Tesla Powerwall and solar installations",
        "AI predicts optimal charging/discharging cycles based on usage patterns",
        "Can reduce electricity bills by 20-30% in typical households",
        "Includes smart appliance integration for further optimization",
        "Over-the-air updates will continue to improve efficiency",
      ],
    },
  ],
  business: [
    {
      id: 4,
      title: "Amazon Acquires AI Startup for $3.2 Billion to Enhance Logistics",
      summary:
        "Amazon has acquired an AI logistics startup for $3.2 billion, aiming to revolutionize its supply chain with advanced predictive algorithms and autonomous routing systems.",
      image: "/placeholder.svg?height=200&width=400",
      source: "Bloomberg",
      time: "3 hours ago",
      pointsOfInterest: [
        "Largest AI acquisition in Amazon's history",
        "Expected to reduce delivery times by 15-20%",
        "Will integrate with existing Amazon Robotics division",
        "Founders joining Amazon's senior leadership team",
        "Technology to be implemented across global operations within 18 months",
      ],
    },
  ],
  science: [
    {
      id: 5,
      title: "Breakthrough in Quantum Computing Achieves Quantum Advantage in Machine Learning",
      summary:
        "Scientists have demonstrated quantum advantage in a practical machine learning application for the first time, solving complex optimization problems thousands of times faster than classical supercomputers.",
      image: "/placeholder.svg?height=200&width=400",
      source: "Science",
      time: "6 hours ago",
      pointsOfInterest: [
        "First practical quantum advantage in machine learning applications",
        "Solved optimization problems 4,000 times faster than classical methods",
        "Used 128 qubit quantum processor with new error correction techniques",
        "Potential applications in drug discovery, materials science, and finance",
        "Commercial applications expected within 2-3 years",
      ],
    },
  ],
  health: [
    {
      id: 6,
      title: "AI System Detects Early-Stage Cancer with 99% Accuracy in Large Clinical Trial",
      summary:
        "A new AI diagnostic system has demonstrated 99% accuracy in detecting early-stage cancers across multiple types in a large-scale clinical trial, potentially revolutionizing cancer screening.",
      image: "/placeholder.svg?height=200&width=400",
      source: "Medical News Today",
      time: "4 hours ago",
      pointsOfInterest: [
        "System detects 8 common cancer types from a single blood sample",
        "99% accuracy for early-stage detection, compared to 45-75% with current methods",
        "Trial included over 50,000 participants across 12 countries",
        "FDA approval expected within 6 months",
        "Could reduce cancer treatment costs by up to 60% through earlier intervention",
      ],
    },
  ],
}

export function NewsFeed() {
  const [activeTab, setActiveTab] = useState("technology")
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [dialogMode, setDialogMode] = useState<"summary" | "points">("summary")
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({})

  const handleOpenSummary = (article: any) => {
    setSelectedArticle(article)
    setDialogMode("summary")
  }

  const handleOpenPoints = (article: any) => {
    setSelectedArticle(article)
    setDialogMode("points")
  }

  const handleCloseDialog = () => {
    setSelectedArticle(null)
  }

  const toggleBookmark = (id: number) => {
    setBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <>
      <Tabs defaultValue="technology" value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="technology" className="mt-0">
          <div className="grid gap-6 md:grid-cols-3">
            <AnimatePresence>
              {newsData.technology.map((article, index) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onSummarize={handleOpenSummary}
                  onPointsOfInterest={handleOpenPoints}
                  isBookmarked={bookmarked[article.id] || false}
                  onToggleBookmark={() => toggleBookmark(article.id)}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>
        <TabsContent value="business" className="mt-0">
          <div className="grid gap-6 md:grid-cols-3">
            {newsData.business.map((article, index) => (
              <NewsCard
                key={article.id}
                article={article}
                onSummarize={handleOpenSummary}
                onPointsOfInterest={handleOpenPoints}
                isBookmarked={bookmarked[article.id] || false}
                onToggleBookmark={() => toggleBookmark(article.id)}
                index={index}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="science" className="mt-0">
          <div className="grid gap-6 md:grid-cols-3">
            {newsData.science.map((article, index) => (
              <NewsCard
                key={article.id}
                article={article}
                onSummarize={handleOpenSummary}
                onPointsOfInterest={handleOpenPoints}
                isBookmarked={bookmarked[article.id] || false}
                onToggleBookmark={() => toggleBookmark(article.id)}
                index={index}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="health" className="mt-0">
          <div className="grid gap-6 md:grid-cols-3">
            {newsData.health.map((article, index) => (
              <NewsCard
                key={article.id}
                article={article}
                onSummarize={handleOpenSummary}
                onPointsOfInterest={handleOpenPoints}
                isBookmarked={bookmarked[article.id] || false}
                onToggleBookmark={() => toggleBookmark(article.id)}
                index={index}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedArticle} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-[600px] rounded-2xl border-zinc-200 bg-white p-0 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <AnimatePresence mode="wait">
            {selectedArticle && (
              <motion.div
                key={`${selectedArticle.id}-${dialogMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={selectedArticle.image || "/placeholder.svg"}
                    alt={selectedArticle.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h2 className="text-xl font-bold">{selectedArticle.title}</h2>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge className="bg-yellow-500/20 text-yellow-200 border-yellow-500/30">
                        {selectedArticle.source}
                      </Badge>
                      <span className="text-xs text-yellow-200/80">{selectedArticle.time}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {dialogMode === "summary" ? (
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400">
                          <BrainIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">AI Summary</h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">Generated by NewsAI</p>
                        </div>
                      </div>

                      <div className="rounded-xl bg-yellow-50 p-4 dark:bg-yellow-900/10">
                        <p className="text-zinc-700 dark:text-zinc-300">{selectedArticle.summary}</p>
                      </div>

                      <div className="flex justify-between pt-2">
                        <Button
                          variant="outline"
                          onClick={() => setDialogMode("points")}
                          className="rounded-xl border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                        >
                          <ListChecksIcon className="mr-2 h-4 w-4 text-yellow-500" />
                          View Key Points
                        </Button>
                        <Button className="rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-900 hover:from-yellow-500 hover:to-yellow-600">
                          <BookOpenIcon className="mr-2 h-4 w-4" />
                          Read Full Article
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400">
                          <ListChecksIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">Key Points</h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">AI-extracted insights</p>
                        </div>
                      </div>

                      <div className="rounded-xl bg-yellow-50 p-4 dark:bg-yellow-900/10">
                        <ul className="space-y-3">
                          {selectedArticle.pointsOfInterest.map((point: string, index: number) => (
                            <motion.li
                              key={index}
                              className="flex items-start gap-3"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="mt-1.5 h-2 w-2 rounded-full bg-yellow-500" />
                              <span className="text-sm text-zinc-700 dark:text-zinc-300">{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-between pt-2">
                        <Button
                          variant="outline"
                          onClick={() => setDialogMode("summary")}
                          className="rounded-xl border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                        >
                          <BrainIcon className="mr-2 h-4 w-4 text-yellow-500" />
                          View AI Summary
                        </Button>
                        <Button className="rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-900 hover:from-yellow-500 hover:to-yellow-600">
                          <BookOpenIcon className="mr-2 h-4 w-4" />
                          Read Full Article
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  )
}

function NewsCard({
  article,
  onSummarize,
  onPointsOfInterest,
  isBookmarked,
  onToggleBookmark,
  index,
}: {
  article: any
  onSummarize: (article: any) => void
  onPointsOfInterest: (article: any) => void
  isBookmarked: boolean
  onToggleBookmark: () => void
  index: number
}) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="group h-full overflow-hidden border-none bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-zinc-900">
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute top-3 right-3 flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 hover:text-zinc-900"
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleBookmark()
                    }}
                  >
                    <BookmarkIcon className={`h-4 w-4 ${isBookmarked ? "fill-yellow-500 text-yellow-500" : ""}`} />
                    <span className="sr-only">Bookmark</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="rounded-lg border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <p>{isBookmarked ? "Remove bookmark" : "Add to bookmarks"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 hover:text-zinc-900"
                  >
                    <ShareIcon className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="rounded-lg border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <p>Share article</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/50"
            >
              {article.source}
            </Badge>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{article.time}</span>
          </div>
          <CardTitle className="mt-2 line-clamp-2 text-lg group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow p-4 pt-2">
          <p className="line-clamp-3 text-sm text-zinc-500 dark:text-zinc-400">{article.summary}</p>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 rounded-xl border-zinc-200 hover:bg-yellow-50 hover:text-yellow-700 dark:border-zinc-800 dark:hover:bg-yellow-900/20 dark:hover:text-yellow-400"
              onClick={() => onSummarize(article)}
            >
              <BrainIcon className="mr-1.5 h-4 w-4 text-yellow-500" />
              <span className="text-xs">AI Summary</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 rounded-xl border-zinc-200 hover:bg-yellow-50 hover:text-yellow-700 dark:border-zinc-800 dark:hover:bg-yellow-900/20 dark:hover:text-yellow-400"
              onClick={() => onPointsOfInterest(article)}
            >
              <ListChecksIcon className="mr-1.5 h-4 w-4 text-yellow-500" />
              <span className="text-xs">Key Points</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 rounded-xl text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:text-yellow-300 dark:hover:bg-yellow-900/20"
          >
            <span className="text-xs">Read More</span>
            <ArrowUpRightIcon className="ml-1.5 h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
