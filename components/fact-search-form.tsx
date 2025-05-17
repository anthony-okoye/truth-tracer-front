"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

// Define types for the result data
export type VerificationStatus = "True" | "False" | "Misleading" | "Unverified"
export type Source = {
  title: string
  url: string
}
export type FactResult = {
  claim: string
  verification: VerificationStatus
  confidence: number
  explanation: string
  sources: Source[]
}

interface FactSearchFormProps {
  onResultGenerated: (result: FactResult) => void
}

export function FactSearchForm({ onResultGenerated }: FactSearchFormProps) {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!query.trim()) return
    
    setIsLoading(true)
    
    try {
      // In a real app, this would be an API call to a fact-checking service
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate a mock result based on the query
      const mockResult: FactResult = generateMockResult(query)
      
      // Pass the result up to the parent component
      onResultGenerated(mockResult)
    } catch (error) {
      console.error("Error fetching fact check:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to generate mock results based on the query
  const generateMockResult = (query: string): FactResult => {
    // Very simple keyword matching for demo purposes
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes("earth") && lowerQuery.includes("flat")) {
      return {
        claim: query,
        verification: "False",
        confidence: 0.98,
        explanation: "Scientific evidence consistently shows that the Earth is roughly spherical. This has been confirmed by satellite imagery, physics calculations, and direct observation.",
        sources: [
          { title: "NASA Earth Observatory", url: "https://earthobservatory.nasa.gov" },
          { title: "National Geographic", url: "https://www.nationalgeographic.org" }
        ]
      }
    } else if (lowerQuery.includes("coffee") && lowerQuery.includes("traded")) {
      return {
        claim: query,
        verification: "Misleading",
        confidence: 0.82,
        explanation: "While coffee is a highly traded commodity, it is not the second most traded. Several commodities including natural gas, gold, and wheat have higher trade volumes.",
        sources: [
          { title: "International Coffee Organization", url: "https://www.ico.org" },
          { title: "World Trade Organization", url: "https://www.wto.org" }
        ]
      }
    } else {
      // Default response for any other query
      return {
        claim: query,
        verification: "Unverified",
        confidence: 0.65,
        explanation: "This claim requires more research. Based on preliminary analysis, there are conflicting sources and insufficient evidence to make a definitive determination.",
        sources: [
          { title: "Research Database", url: "https://example.org/research" },
          { title: "Fact Check Archive", url: "https://example.org/factcheck" }
        ]
      }
    }
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Check a Fact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Textarea
            placeholder="Enter a fact or claim to verify..."
            className="min-h-32 resize-none p-4 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="w-full sm:w-auto px-8" 
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Verifying...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Verify Fact
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
} 