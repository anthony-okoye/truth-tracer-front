'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import axios from 'axios';
import { toast } from 'sonner';
import { IFactResult } from '@/types';
import { useState, useEffect, Suspense } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, AlertCircle, ExternalLink, User, Globe, ArrowLeft, Save, Search, Loader2, Brain, Link } from 'lucide-react';
import { storeFactResult } from '@/lib/utils';

function FactResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('query');
  const [factInfo, setFactInfo] = useState<IFactResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    const fetchFactInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/truth-tracer/claims/analyze`, {
          claim: query
        });

        console.log({response});
        
        // Add the claim to the response if it's not included
        const factData = {
          ...response.data,
          claim: response.data.claim || query
        };
        
        setFactInfo(factData);
      } catch (err) {
        console.error('Error fetching fact info:', err);
        setError('Failed to analyze the claim. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFactInfo();
  }, [query]);

  const generateFactId = (): string => {
    return `fact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSaveFact = async () => {
    if (!factInfo) return;

    setSaving(true);
    try {
      const factWithId = { 
        ...factInfo, 
        id: generateFactId(),
        claim: factInfo.claim || query || 'Unknown claim'
      };
      storeFactResult(factWithId);
      toast.success('Fact saved successfully!');
      
      // Navigate to the saved fact detail page
      router.push(`/facts/${factWithId.id}`);
    } catch (error) {
      console.error('Error saving fact:', error);
      toast.error('Failed to save fact. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleNewSearch = () => {
    router.push('/');
  };

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No query provided</h1>
          <Button onClick={() => router.push('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full mx-auto px-4 py-8">
        <div className="mx-auto">
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
          
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" />
              <h2 className="text-2xl font-semibold mb-2">Analyzing your claim...</h2>
              <p className="text-muted-foreground mb-4">
                We&apos;re checking multiple sources to verify: &quot;{query}&quot;
              </p>
              <div className="flex justify-center space-x-2">
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
          
          <Card className="text-center py-12">
            <CardContent>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Error</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
                <Button variant="outline" onClick={handleNewSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  New Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!factInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No results found</h1>
          <Button onClick={() => router.push('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const getVerdictIcon = (verdict: string | null) => {
    const verdictStr = verdict?.toString().toLowerCase() || 'unverified';
    switch (verdictStr) {
      case 'true':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'false':
        return <XCircle className="h-6 w-6 text-red-600" />;
      case 'misleading':
        return <AlertCircle className="h-6 w-6 text-yellow-600" />;
      default:
        return <AlertCircle className="h-6 w-6 text-gray-600" />;
    }
  };

  const getVerdictColor = (verdict: string | null) => {
    const verdictStr = verdict?.toString().toLowerCase() || 'unverified';
    switch (verdictStr) {
      case 'true':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'false':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'misleading':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleSaveFact}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Fact'}
            </Button>
            <Button 
              variant="outline"
              onClick={handleNewSearch}
            >
              <Search className="h-4 w-4 mr-2" />
              New Search
            </Button>
          </div>
        </div>

        {/* Main Fact Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold mb-2">{factInfo?.claim || query}</CardTitle>
                <div className="flex items-center gap-3">
                  {getVerdictIcon(factInfo?.factCheck || null)}
                  <Badge className={getVerdictColor(factInfo?.factCheck || null)}>
                    {factInfo?.factCheck ? String(factInfo.factCheck).toUpperCase() : "UNVERIFIED"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Confidence: {Math.round((factInfo?.trustChain?.confidence || 0) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{factInfo?.trustChain?.explanation || 'No explanation available'}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>Updated {factInfo?.status?.timestamp ? new Date(factInfo.status.timestamp).toLocaleDateString() : 'Unknown'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust Chain Analysis */}
        {factInfo?.trustChain && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                Trust Chain Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {factInfo?.trustChain?.explanation || 'No explanation available'}
              </p>
              
              {factInfo?.trustChain?.context && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Context</h4>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    {factInfo.trustChain.context}
                  </p>
                </div>
              )}
              
              {factInfo?.trustChain?.gaps && factInfo.trustChain.gaps.length > 0 && (
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Information Gaps</h4>
                  <ul className="text-yellow-800 dark:text-yellow-200 text-sm space-y-1">
                    {factInfo.trustChain.gaps.map((gap, index) => (
                      <li key={index}>• {gap}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Socratic Analysis */}
        {factInfo?.socratic && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Socratic Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {factInfo?.socratic?.reasoningSteps && factInfo.socratic.reasoningSteps.length > 0 && factInfo.socratic.reasoningSteps.map((step, index) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {step?.question || 'No question available'}
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Analysis: </span>
                        <span className="text-gray-600 dark:text-gray-400">{step?.analysis || 'No analysis available'}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Evidence: </span>
                        <span className="text-gray-600 dark:text-gray-400">{step?.evidence || 'No evidence available'}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Implications: </span>
                        <span className="text-gray-600 dark:text-gray-400">{step?.implications || 'No implications available'}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {factInfo?.socratic?.conclusion && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Conclusion</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Logical Validity: </span>
                        <span className="text-gray-600 dark:text-gray-400">{factInfo?.socratic?.conclusion?.logicalValidity || 'No validity assessment available'}</span>
                      </div>
                      
                      {factInfo?.socratic?.conclusion?.keyFlaws && Array.isArray(factInfo.socratic.conclusion.keyFlaws) && factInfo.socratic.conclusion.keyFlaws.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Key Flaws: </span>
                          <ul className="text-gray-600 dark:text-gray-400 mt-1">
                            {factInfo.socratic.conclusion.keyFlaws.map((flaw, index) => (
                              <li key={index}>• {flaw}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {factInfo?.socratic?.conclusion?.strengths && Array.isArray(factInfo.socratic.conclusion.strengths) && factInfo.socratic.conclusion.strengths.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Strengths: </span>
                          <ul className="text-gray-600 dark:text-gray-400 mt-1">
                            {factInfo.socratic.conclusion.strengths.map((strength, index) => (
                              <li key={index}>• {strength}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Recommendations: </span>
                        <span className="text-gray-600 dark:text-gray-400">{factInfo?.socratic?.conclusion?.recommendations || 'No recommendations available'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sources Card */}
        {factInfo?.trustChain?.sources && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Sources ({factInfo.trustChain.sources.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {factInfo.trustChain.sources.length > 0 ? (
                <div className="space-y-4">
                  {factInfo.trustChain.sources.map((source, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                            {source?.name || 'Unknown source'}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              Reliability: {Math.round((source?.reliability || 0) * 100)}%
                            </div>
                          </div>
                        </div>
                        {source?.url && (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No sources available for this fact check.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Status Information */}
        {factInfo?.status && (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Fact Check</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{factInfo?.status?.factCheck || 'Unknown'}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Trust Chain</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{factInfo?.status?.trustChain || 'Unknown'}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Socratic Analysis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{factInfo?.status?.socratic || 'Unknown'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function FactResultPage() {
  return (
    <Suspense fallback={
      <div className="w-full mx-auto px-4 py-8">
        <div className="mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" />
              <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
              <p className="text-muted-foreground mb-4">
                Preparing your fact check results
              </p>
            </div>
          </div>
        </div>
      </div>
    }>
      <FactResultContent />
    </Suspense>
  );
}