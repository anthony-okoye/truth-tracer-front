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
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 overflow-hidden'>
        {/* Background Elements */}
        <div className='absolute inset-0 -z-10'>
          <div className='absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float'></div>
          <div className='absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float' style={{animationDelay: '2s'}}></div>
          <div className='absolute -bottom-8 left-40 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float' style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className='container mx-auto max-w-6xl text-center'>
          <div className='space-y-8'>
            {/* Main heading with enhanced design */}
            <div className='space-y-4'>
              <h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight'>
                <span className='block gradient-text animate-pulse-slow'>
                  Truth Tracer
                </span>
              </h1>
              <div className='max-w-4xl mx-auto'>
                <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed'>
                  Discover the truth behind every claim with{' '}
                  <span className='text-gradient-blue font-semibold'>AI-powered fact-checking</span>,{' '}
                  <span className='text-gradient-purple font-semibold'>source verification</span>, and{' '}
                  <span className='text-gradient-blue font-semibold'>logical analysis</span>
                </p>
              </div>
            </div>

            {/* Feature highlights */}
            <div className='flex flex-wrap justify-center gap-4 pt-8'>
              <div className='glass-effect px-4 py-2 rounded-full hover-lift'>
                <span className='text-sm font-medium text-blue-600 dark:text-blue-400'>🔍 Deep Analysis</span>
              </div>
              <div className='glass-effect px-4 py-2 rounded-full hover-lift'>
                <span className='text-sm font-medium text-purple-600 dark:text-purple-400'>🧠 Socratic Method</span>
              </div>
              <div className='glass-effect px-4 py-2 rounded-full hover-lift'>
                <span className='text-sm font-medium text-indigo-600 dark:text-indigo-400'>🔗 Trust Chain</span>
              </div>
              <div className='glass-effect px-4 py-2 rounded-full hover-lift'>
                <span className='text-sm font-medium text-cyan-600 dark:text-cyan-400'>⚡ Real-time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className='relative py-12 px-4'>
        <div className='container mx-auto max-w-4xl'>
          <div className='glass-effect rounded-2xl p-8 glow-on-hover'>
            <FactSearchForm />
          </div>
        </div>
      </section>

      {/* Popular Claims Section */}
      <section className='py-16 px-4'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              <span className='text-gradient-blue'>Popular Claims</span> to Verify
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
              Explore these trending claims and see our AI-powered analysis in action
            </p>
          </div>
          
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-2'>
            {randomSuggestions.map((suggestion, index) => (
              <div key={suggestion} className='hover-lift' style={{animationDelay: `${index * 0.1}s`}}>
                <FactSuggestionCard claim={suggestion} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className='py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            <div className='space-y-2'>
              <div className='text-4xl font-bold'>99.9%</div>
              <div className='text-blue-100'>Accuracy Rate</div>
            </div>
            <div className='space-y-2'>
              <div className='text-4xl font-bold'>30s</div>
              <div className='text-blue-100'>Average Analysis Time</div>
            </div>
            <div className='space-y-2'>
              <div className='text-4xl font-bold'>1000+</div>
              <div className='text-blue-100'>Trusted Sources</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}