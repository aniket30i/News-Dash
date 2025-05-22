"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { X, Plus, Check, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const availableCategories = [
  { id: "technology", name: "Technology", color: "bg-blue-500" },
  { id: "business", name: "Business", color: "bg-green-500" },
  { id: "science", name: "Science", color: "bg-purple-500" },
  { id: "health", name: "Health", color: "bg-red-500" },
  { id: "entertainment", name: "Entertainment", color: "bg-pink-500" },
  { id: "sports", name: "Sports", color: "bg-orange-500" },
  { id: "politics", name: "Politics", color: "bg-indigo-500" },
  { id: "environment", name: "Environment", color: "bg-emerald-500" },
  { id: "education", name: "Education", color: "bg-cyan-500" },
  { id: "travel", name: "Travel", color: "bg-amber-500" },
  { id: "food", name: "Food", color: "bg-lime-500" },
  { id: "fashion", name: "Fashion", color: "bg-rose-500" },
]

export function CategoryManagement({ onClose }: { onClose: () => void }) {
  const [selectedCategories, setSelectedCategories] = useState([
    { id: "technology", name: "Technology", color: "bg-blue-500" },
    { id: "business", name: "Business", color: "bg-green-500" },
    { id: "science", name: "Science", color: "bg-purple-500" },
    { id: "health", name: "Health", color: "bg-red-500" },
  ])

  const [newCategory, setNewCategory] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const constraintsRef = useRef(null)

  const handleAddCategory = () => {
    if (newCategory && !selectedCategories.some((c) => c.id === newCategory) && selectedCategories.length < 4) {
      const categoryToAdd = availableCategories.find((c) => c.id === newCategory)
      if (categoryToAdd) {
        setSelectedCategories([...selectedCategories, categoryToAdd])
        setNewCategory("")
      }
    }
  }

  const handleRemoveCategory = (categoryId: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c.id !== categoryId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h2
          className="text-2xl font-bold tracking-tight"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Category Settings
        </motion.h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <motion.p
        className="text-sm text-zinc-500 dark:text-zinc-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        Select up to 4 categories to display on your dashboard. Drag to reorder your preferences.
      </motion.p>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="categories" className="text-base">
            Your Categories
          </Label>

          <motion.div
            ref={constraintsRef}
            className="min-h-[120px] rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Reorder.Group axis="y" values={selectedCategories} onReorder={setSelectedCategories} className="space-y-2">
              <AnimatePresence>
                {selectedCategories.map((category) => (
                  <Reorder.Item
                    key={category.id}
                    value={category}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                    className={`group flex cursor-grab items-center justify-between rounded-lg border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 ${
                      isDragging ? "z-10 !cursor-grabbing shadow-md" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-5 w-5 text-zinc-400" />
                      <div className={`h-3 w-3 rounded-full ${category.color}`} />
                      <span>{category.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveCategory(category.id)
                      }}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove {category.name}</span>
                    </Button>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>

            {selectedCategories.length === 0 && (
              <div className="flex h-[100px] items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
                No categories selected. Add up to 4 categories below.
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex-1">
            <Select value={newCategory} onValueChange={setNewCategory} disabled={selectedCategories.length >= 4}>
              <SelectTrigger className="h-10 rounded-xl border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
                <SelectValue placeholder="Add category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
                {availableCategories
                  .filter((c) => !selectedCategories.some((sc) => sc.id === c.id))
                  .map((category) => (
                    <SelectItem key={category.id} value={category.id} className="rounded-lg">
                      <div className="flex items-center">
                        <div className={`mr-2 h-2.5 w-2.5 rounded-full ${category.color}`} />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleAddCategory}
            disabled={
              !newCategory || selectedCategories.some((c) => c.id === newCategory) || selectedCategories.length >= 4
            }
            className="h-10 rounded-xl bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="pt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Button
          className="w-full h-11 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-900 shadow-md hover:from-yellow-500 hover:to-yellow-600"
          onClick={onClose}
        >
          <Check className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </motion.div>
    </div>
  )
}
