"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  NewspaperIcon,
  StarIcon,
  TrendingUpIcon,
  BookmarkIcon,
  ZapIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  ChevronRightIcon,
  UserIcon,
  LogOutIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CategoryManagement } from "@/components/category-management"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Sidebar({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const [showSettings, setShowSettings] = useState(false)
  const [activeItem, setActiveItem] = useState("dashboard")
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && window.innerWidth < 1024) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setOpen])

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
    { id: "trending", label: "Trending Now", icon: TrendingUpIcon },
    { id: "favorites", label: "Favorites", icon: StarIcon },
    { id: "bookmarks", label: "Saved Articles", icon: BookmarkIcon },
    { id: "categories", label: "Categories", icon: NewspaperIcon, onClick: () => setShowSettings(true) },
  ]

  const userCategories = [
    { id: "tech", label: "Technology", color: "bg-blue-500" },
    { id: "business", label: "Business", color: "bg-green-500" },
    { id: "science", label: "Science", color: "bg-purple-500" },
    { id: "health", label: "Health", color: "bg-red-500" },
  ]

  const sidebarVariants = {
    open: {
      x: 0,
      width: 280,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    closed: {
      x: -280,
      width: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-20 bg-zinc-900/20 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={sidebarRef}
        initial={false}
        animate={open ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed inset-y-0 left-0 z-30 flex flex-col overflow-hidden border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 lg:static"
      >
        <div className="flex h-16 items-center border-b border-zinc-200 px-6 dark:border-zinc-800">
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-zinc-900">
              <ZapIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">NewsAI</span>
          </motion.div>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-1 pb-4">
            {menuItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeItem === item.id ? "secondary" : "ghost"}
                        className={`w-full justify-start rounded-xl ${
                          activeItem === item.id
                            ? "bg-yellow-100 text-yellow-900 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                            : ""
                        }`}
                        onClick={() => {
                          setActiveItem(item.id)
                          if (item.onClick) item.onClick()
                        }}
                      >
                        <item.icon className={`mr-3 h-5 w-5 ${activeItem === item.id ? "text-yellow-500" : ""}`} />
                        {item.label}
                        {item.id === "categories" && <ChevronRightIcon className="ml-auto h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="rounded-lg border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="py-4">
            <h3 className="mb-2 px-4 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Your Categories
            </h3>
            <div className="space-y-1">
              {userCategories.map((category) => (
                <Button key={category.id} variant="ghost" className="w-full justify-start rounded-xl">
                  <div className={`mr-3 h-3 w-3 rounded-full ${category.color}`} />
                  {category.label}
                </Button>
              ))}
            </div>
          </motion.div>
        </ScrollArea>

        <motion.div variants={itemVariants} className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          <div className="mb-4 flex items-center gap-3 px-2">
            <Avatar className="h-10 w-10 border-2 border-yellow-400/20">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback className="bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-300">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Pro Member</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 rounded-xl">
              <UserIcon className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="outline" size="sm" className="flex-1 rounded-xl">
              <SettingsIcon className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>

          <Button className="mt-3 w-full rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-900 shadow-md hover:from-yellow-500 hover:to-yellow-600">
            <ZapIcon className="mr-2 h-5 w-5" />
            Upgrade Plan
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="mt-4 w-full justify-start rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
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
      </AnimatePresence>
    </>
  )
}
