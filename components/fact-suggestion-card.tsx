import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FactSuggestionCardProps {
  claim: string
}

export function FactSuggestionCard({
  claim,
}: FactSuggestionCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/facts/result?query=${encodeURIComponent(claim)}`)
  }

  return (
    <Card 
      className='group h-full flex flex-col cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 overflow-hidden'
      onClick={handleClick}
    >
      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      
      <CardHeader className='relative pb-4 pt-6 px-6'>
        <CardTitle className='text-lg font-semibold leading-tight text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>
          {claim}
        </CardTitle>
      </CardHeader>
      
      <CardContent className='relative pt-0 pb-6 px-6 mt-auto'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300'>
            <span className='text-sm font-medium'>Verify this claim</span>
            <ExternalLink className='h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300' />
          </div>
          
          {/* Analysis indicator */}
          <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
            <span className='text-xs text-gray-500 dark:text-gray-400'>Ready to analyze</span>
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
      </CardContent>
    </Card>
  )
}