"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MoonIcon, SunIcon, BellIcon, SearchIcon, MenuIcon, XIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function TopNavigation({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}) {
  const { theme, setTheme } = useTheme()
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-zinc-200/80 bg-zinc-50/80 px-6 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80 md:px-10 lg:px-12">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="relative h-9 w-9 rounded-full"
        >
          <motion.div animate={{ rotate: sidebarOpen ? 0 : 180 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
            {sidebarOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </motion.div>
          <span className="sr-only">Toggle Menu</span>
        </Button>

        <div className="relative hidden md:block">
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scaleX: searchFocused ? 1.05 : 1,
              scaleY: searchFocused ? 1.1 : 1,
              backgroundColor: searchFocused ? "rgba(252, 211, 77, 0.1)" : "rgba(252, 211, 77, 0)",
            }}
            transition={{ duration: 0.2 }}
          />
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
          <Input
            type="search"
            placeholder="Search news, topics..."
            className="w-[240px] rounded-full border-zinc-200 bg-white pl-10 pr-4 text-sm shadow-sm transition-all focus-visible:border-yellow-400 focus-visible:ring-1 focus-visible:ring-yellow-400/30 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-visible:border-yellow-500 dark:focus-visible:ring-yellow-500/20 lg:w-[320px]"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full hover:bg-zinc-200/70 dark:hover:bg-zinc-800/70"
          aria-label="Notifications"
        >
          <BellIcon className="h-5 w-5" />
          <Badge className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 p-0 text-[10px] text-white">
            3
          </Badge>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-9 w-9 rounded-full hover:bg-zinc-200/70 dark:hover:bg-zinc-800/70"
          aria-label="Toggle theme"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === "dark" ? 180 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {theme === "dark" ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5" />}
          </motion.div>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full p-0 hover:bg-zinc-200/70 dark:hover:bg-zinc-800/70"
            >
              <Avatar className="h-9 w-9 border-2 border-yellow-400/20">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                <AvatarFallback className="bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-300">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <DropdownMenuItem className="rounded-lg">Profile</DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg">Settings</DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg">Subscription</DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          size="sm"
          className="hidden rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-900 shadow-md hover:from-yellow-500 hover:to-yellow-600 md:flex"
        >
          Upgrade to Pro
        </Button>
      </div>
    </header>
  )
}
