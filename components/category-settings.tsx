"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const availableCategories = [
  "Technology",
  "Business",
  "Science",
  "Health",
  "Entertainment",
  "Sports",
  "Politics",
  "Environment",
  "Education",
  "Travel",
  "Food",
  "Fashion",
]

export function CategorySettings({ onClose }: { onClose: () => void }) {
  const [selectedCategories, setSelectedCategories] = useState(["Technology", "Business", "Science", "Health"])

  const [newCategory, setNewCategory] = useState("")

  const handleAddCategory = () => {
    if (newCategory && !selectedCategories.includes(newCategory) && selectedCategories.length < 4) {
      setSelectedCategories([...selectedCategories, newCategory])
      setNewCategory("")
    }
  }

  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Category Settings</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">Select up to 4 categories to display on your dashboard.</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="categories">Your Categories</Label>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <div
                key={category}
                className="flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm dark:bg-yellow-900"
              >
                <span className="mr-1">{category}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full p-0 hover:bg-yellow-200 dark:hover:bg-yellow-800"
                  onClick={() => handleRemoveCategory(category)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {category}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Select value={newCategory} onValueChange={setNewCategory} disabled={selectedCategories.length >= 4}>
              <SelectTrigger>
                <SelectValue placeholder="Add category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories
                  .filter((c) => !selectedCategories.includes(c))
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleAddCategory}
            disabled={!newCategory || selectedCategories.includes(newCategory) || selectedCategories.length >= 4}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="pt-4">
        <Button className="w-full bg-yellow-500 hover:bg-yellow-600" onClick={onClose}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}
