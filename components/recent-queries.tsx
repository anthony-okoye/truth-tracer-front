"use client"

import { useState, useEffect } from "react"
import { Calendar, HistoryIcon, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { getFactResults, removeFactResultFromHistory, clearHistory } from "@/lib/utils"
import { IFactResult } from "@/types"

export function ConversationHistory() {
  const [history, setHistory] = useState<IFactResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loadHistory = () => {
      const storedFacts = getFactResults()
      setHistory(storedFacts || [])
    }
    
    loadHistory()
  }, [])

  const formatDate = (timestamp: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(timestamp))
  }

  const deleteItem = (id: string) => {
    removeFactResultFromHistory(id)
    setHistory(history.filter((item) => item.id !== id))
  }

  const clearAllHistory = () => {
    clearHistory()
    setHistory([])
  }

  const getResultColor = (result: string | null | undefined) => {
    const resultStr = result?.toString().toLowerCase() || 'unverified'
    switch (resultStr) {
      case "true":
        return "text-green-500"
      case "false":
        return "text-red-500"
      case "misleading":
        return "text-amber-500"
      default:
        return "text-gray-500"
    }
  }

  const viewFact = (item: IFactResult) => {
    router.push(`/facts/${item.id}`)
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <HistoryIcon className="h-5 w-5" />
          <span className="sr-only">History</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Conversation History</SheetTitle>
          <SheetDescription>
            View and manage your previous fact-checking queries
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-6">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="mb-2 h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg font-medium">No history yet</p>
              <p className="text-sm text-muted-foreground">
                Your fact-checking history will appear here
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {history.length} {history.length === 1 ? "item" : "items"}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={clearAllHistory}
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  Clear all
                </Button>
              </div>

              <div className="space-y-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col space-y-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => viewFact(item)}
                  >
                    <div className="line-clamp-2 font-medium">{item.claim}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(item.status?.timestamp || new Date().toISOString())}</span>
                      </div>
                      <span className={`text-xs font-medium ${getResultColor(item.factCheck?.verdict)}`}>
                        {item.factCheck?.verdict ? String(item.factCheck.verdict).toUpperCase() : "UNVERIFIED"}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteItem(item.id || '')
                        }}
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
} 