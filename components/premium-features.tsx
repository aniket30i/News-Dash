"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ZapIcon, SparklesIcon, BookOpenIcon, BrainIcon, RssIcon, ArrowRightIcon, LockIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function PremiumFeatures() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const features = [
    {
      icon: SparklesIcon,
      title: "Personalized AI Recommendations",
      description: "Get news tailored to your interests with our advanced AI algorithm.",
    },
    {
      icon: BookOpenIcon,
      title: "Unlimited Article Summaries",
      description: "Summarize any article with our AI to save time and get key insights.",
    },
    {
      icon: BrainIcon,
      title: "Advanced Analysis",
      description: "Receive in-depth analysis and context for complex news stories.",
    },
    {
      icon: RssIcon,
      title: "Custom News Feeds",
      description: "Create unlimited custom feeds from your favorite sources.",
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
        className="mb-6 flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-zinc-900">
          <ZapIcon className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Premium AI Features</h2>
      </motion.div>

      <Card className="relative overflow-hidden border-none bg-white shadow-md dark:bg-zinc-900">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-yellow-400/5 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-yellow-400/5 blur-[100px]" />
        </div>

        <CardHeader className="relative z-10 pb-2 pt-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                Upgrade to Premium
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-900">Pro</Badge>
              </CardTitle>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Unlock advanced AI-powered features and get more from your news.
              </p>
            </div>
            <Button className="mt-2 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-900 shadow-md hover:from-yellow-500 hover:to-yellow-600 md:mt-0">
              <ZapIcon className="mr-2 h-5 w-5" />
              Upgrade Now
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 pt-4">
          <motion.div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={item}>
                <Card className="group h-full overflow-hidden border-zinc-200 bg-white transition-all duration-300 hover:border-yellow-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-yellow-700">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700 transition-colors group-hover:bg-yellow-500 group-hover:text-white dark:bg-yellow-900/30 dark:text-yellow-400 dark:group-hover:bg-yellow-500 dark:group-hover:text-white">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-medium">{feature.title}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{feature.description}</p>

                    <div className="mt-4 flex items-center text-xs text-yellow-600 dark:text-yellow-400">
                      <LockIcon className="mr-1 h-3 w-3" />
                      Premium Feature
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6 rounded-xl border border-dashed border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-800/50 dark:bg-yellow-900/10">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400">
                  <SparklesIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Special Offer</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Get 20% off your first 3 months of Premium with code{" "}
                    <span className="font-mono font-bold text-yellow-600 dark:text-yellow-400">NEWSAI20</span>
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="rounded-xl border-yellow-300 bg-white text-yellow-700 hover:bg-yellow-50 dark:border-yellow-800/50 dark:bg-zinc-900 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
              >
                Claim Offer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
