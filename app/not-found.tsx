import Link from "next/link"
import { HomeIcon } from "lucide-react"

export default function NotFound() {
  return (
    <div className="w-full flex items-center justify-center"> 
      <div className="text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <div className="text-4xl sm:text-5xl font-bold text-primary mb-4 sm:mb-0 sm:px-5">404</div>
          <div className="hidden sm:block mx-6 h-16 border-l border-border"></div>
          <div className="sm:px-5 text-lg sm:text-xl">This page could not be found.</div>
        </div>
        <div className="mt-8">
          <Link href="/" className="text-primary hover:underline flex items-center justify-center gap-2">
            <HomeIcon size={16} />
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}