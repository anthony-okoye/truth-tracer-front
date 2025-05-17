"use client"

import { useState } from "react"
import { CheckIcon, SearchIcon } from "lucide-react"
import { FactSearchForm, FactResult } from "@/components/fact-search-form"
import { FactResultCard } from "@/components/fact-result-card"

export default function Home() {
  const [results, setResults] = useState<FactResult[]>([])

  const handleResultGenerated = (result: FactResult) => {
    // Add the new result to the top of the list
    setResults(prevResults => [result, ...prevResults.slice(0, 3)])
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <section className="mb-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              FactFinder
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Verify information quickly and accurately with our advanced fact-checking tools
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="mx-auto max-w-3xl">
          <FactSearchForm onResultGenerated={handleResultGenerated} />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
            {results.length > 0 ? "Results" : "Try these examples"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {results.length > 0 ? (
              // Show user generated results
              results.map((result, index) => (
                <FactResultCard 
                  key={index}
                  claim={result.claim}
                  verification={result.verification}
                  confidence={result.confidence}
                  explanation={result.explanation}
                  sources={result.sources}
                />
              ))
            ) : (
              // Show example cards
              <>
                <FactResultCard 
                  claim="The earth is flat."
                  verification="False"
                  confidence={0.98}
                  explanation="Scientific evidence consistently shows that the Earth is roughly spherical."
                  sources={[
                    { title: "NASA Earth Observatory", url: "https://earthobservatory.nasa.gov" },
                    { title: "National Geographic", url: "https://www.nationalgeographic.org" }
                  ]}
                />
                <FactResultCard 
                  claim="Coffee is the second most traded commodity after oil."
                  verification="Misleading"
                  confidence={0.82}
                  explanation="While coffee is a highly traded commodity, it is not the second most traded. Several commodities including natural gas, gold, and wheat have higher trade volumes."
                  sources={[
                    { title: "International Coffee Organization", url: "https://www.ico.org" },
                    { title: "World Trade Organization", url: "https://www.wto.org" }
                  ]}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}