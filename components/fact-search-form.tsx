"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


export function FactSearchForm() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!query.trim()) return
    
    setIsLoading(true)
    
    try {
      router.push(`/facts/result?query=${query}`)
    } catch (error) {
      console.error("Error fetching fact check:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          What would you like to <span className="text-gradient-blue">verify</span>?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Enter any claim, statement, or fact you'd like our AI to analyze
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <Textarea
            placeholder="e.g., 'The Great Wall of China is visible from space' or 'Vaccines cause autism'..."
            className="min-h-32 resize-none p-6 text-base border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:border-blue-300 dark:hover:border-blue-600"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute bottom-4 right-4 text-sm text-gray-400">
            {query.length}/2000
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            type="submit" 
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:transform-none" 
            disabled={isLoading || !query.trim()}
            size="lg"
          >
            {isLoading ? (
              <span className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-5 h-5 border-2 border-white/30 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                Analyzing Truth...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <Search className="h-5 w-5" />
                Verify This Claim
              </span>
            )}
          </Button>
          
          {query.trim() && !isLoading && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Ready to analyze
            </div>
          )}
        </div>
        
        {/* Quick suggestions */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 text-center">
            Or try one of these examples:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Lightning never strikes twice",
              "We only use 10% of our brains", 
              "Goldfish have 3-second memory",
              "Coffee stunts growth"
            ].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
} 