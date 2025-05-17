"use client"

import { useState } from "react"
import { Calendar, Clock, HistoryIcon, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type HistoryItem = {
  id: string
  query: string
  date: Date
  result: string
}

// Mock data
const mockHistory: HistoryItem[] = [
  {
    id: "1",
    query: "Is the Earth flat?",
    date: new Date("2023-11-15T12:30:00"),
    result: "False",
  },
  {
    id: "2",
    query: "Was Albert Einstein a physicist?",
    date: new Date("2023-11-14T10:15:00"),
    result: "True",
  },
  {
    id: "3",
    query: "Do vaccines cause autism?",
    date: new Date("2023-11-12T14:45:00"),
    result: "False",
  },
  {
    id: "4",
    query: "Is coffee the second most traded commodity after oil?",
    date: new Date("2023-11-10T09:20:00"),
    result: "Misleading",
  },
]

export function ConversationHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(mockHistory)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const deleteItem = (id: string) => {
    setHistory(history.filter((item) => item.id !== id))
  }

  const clearHistory = () => {
    setHistory([])
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case "True":
        return "text-green-500"
      case "False":
        return "text-red-500"
      case "Misleading":
        return "text-amber-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <Sheet>
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
                  onClick={clearHistory}
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  Clear all
                </Button>
              </div>

              <div className="space-y-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col space-y-2 rounded-md border p-3"
                  >
                    <div className="line-clamp-2 font-medium">{item.query}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      <span className={`text-xs font-medium ${getResultColor(item.result)}`}>
                        {item.result}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => console.log("Load query", item.id)}
                      >
                        Load
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-destructive"
                        onClick={() => deleteItem(item.id)}
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