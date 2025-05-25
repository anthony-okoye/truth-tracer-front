'use client';

import { useState } from 'react';
import { FactSearchForm } from '@/components/fact-search-form';
import { FactSuggestionCard } from '@/components/fact-suggestion-card';

export default function Home() {
  const [suggestions] = useState<string[]>([
    'The sky is blue.',
    'The earth is flat.',
    'The moon landing was faked.',
    'Humans only use 10% of their brains.',
    'Lightning never strikes the same place twice.',
    'Coffee is the second most traded commodity after oil.',
    'Vaccines cause autism.',
    'Goldfish have a 3-second memory.',
    'Cracking your knuckles causes arthritis.',
    'You need to wait 24 hours before filing a missing person report.',
    'The Great Wall of China is visible from space.'
  ]);

  // Randomly select 5 suggestions
  const getRandomSuggestions = () => {
    const shuffled = [...suggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const randomSuggestions = getRandomSuggestions();

  return (
    <div className='container mx-auto px-4 py-8'>
      <section className='mb-12'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2 max-w-3xl mx-auto'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent'>
              Truth Tracer
            </h1>
            <p className='text-lg text-muted-foreground md:text-xl'>
              Your trusted companion in the quest for truth and accuracy
            </p>
          </div>
        </div>
      </section>

      <section className='mb-16'>
        <div className='mx-auto max-w-3xl'>
          <FactSearchForm />
        </div>
      </section>

      <section>
        <div className='mx-auto max-w-5xl'>
          <h2 className='text-2xl font-bold mb-6 text-center sm:text-left text-gray-900 dark:text-gray-100'>
            Popular Claims to Verify
          </h2>
          <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2'>
            {randomSuggestions.map((suggestion) => (
              <FactSuggestionCard
                key={suggestion}
                claim={suggestion}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}