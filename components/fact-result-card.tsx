import {
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { type VerificationStatus, type Source } from "@/components/fact-search-form"

interface FactResultCardProps {
  claim: string
  verification: VerificationStatus
  confidence: number
  explanation: string
  sources: Source[]
}

export function FactResultCard({
  claim,
  verification,
  confidence,
  explanation,
  sources,
}: FactResultCardProps) {
  const getStatusColor = (status: VerificationStatus) => {
    switch (status) {
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

  const getStatusIcon = (status: VerificationStatus) => {
    switch (status) {
      case "True":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "False":
        return <XCircle className="h-6 w-6 text-red-500" />
      case "Misleading":
        return <AlertCircle className="h-6 w-6 text-amber-500" />
      default:
        return <AlertCircle className="h-6 w-6 text-gray-500" />
    }
  }

  const confidencePercent = Math.round(confidence * 100)

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl line-clamp-2">{claim}</CardTitle>
          <div className="flex-shrink-0">
            {getStatusIcon(verification)}
          </div>
        </div>
        <CardDescription className="flex items-center gap-1 mt-2">
          <span className={getStatusColor(verification)}>{verification}</span>
          <span className="mx-1">•</span>
          <span className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            {confidencePercent}% confidence
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3 flex-grow">
        <p className="text-sm text-muted-foreground">{explanation}</p>
        {sources.length > 0 && (
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium">Sources:</h4>
            <ul className="space-y-1">
              {sources.map((source, index) => (
                <li key={index} className="text-sm">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary underline-offset-4 hover:underline"
                  >
                    {source.title}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-end gap-2">
        <Button variant="outline" size="sm">
          Save
        </Button>
        <Button variant="ghost" size="sm">
          Share
        </Button>
      </CardFooter>
    </Card>
  )
} 