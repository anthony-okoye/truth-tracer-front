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
      className='h-full flex flex-col cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-200 bg-card border'
      onClick={handleClick}
    >
      <CardHeader className='pb-3'>
        <CardTitle className='text-xl font-bold leading-tight tracking-tight'>{claim}</CardTitle>
      </CardHeader>
      <CardContent className='pt-0 mt-auto'>
        <div className='flex items-center gap-2 text-blue-600 dark:text-blue-400 group'>
          <span className='text-sm font-semibold group-hover:underline'>Verify this claim</span>
          <ExternalLink className='h-4 w-4 group-hover:translate-x-0.5 transition-transform' />
        </div>
      </CardContent>
    </Card>
  )
}