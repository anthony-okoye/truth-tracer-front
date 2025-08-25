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
import { CheckCircle, XCircle, AlertCircle, ExternalLink, Globe, ArrowLeft, Save, Search, Loader2, Brain, Link } from 'lucide-react';
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
      <div className="mx-auto max-w-6xl min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="mb-8 glass-effect hover-lift"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
          
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-6 max-w-2xl">
              {/* Animated logo */}
              <div className="relative">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-pulse-slow">
                  <Brain className="h-12 w-12 text-white animate-float" />
                </div>
                <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-blue-300 animate-ping"></div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  <span className="text-gradient-blue">Analyzing</span> your claim...
                </h2>
                <div className="glass-effect rounded-xl p-6 text-left">
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    &quot;{query}&quot;
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Our AI is examining multiple sources, checking facts, and building a comprehensive analysis
                </p>
              </div>
              
              {/* Progress indicators */}
              <div className="space-y-4">
                <div className="flex justify-center space-x-8">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Search className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-pulse" />
                    </div>
                    <span className="text-xs text-gray-500">Fact Check</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <Link className="h-6 w-6 text-purple-600 dark:text-purple-400 animate-pulse" style={{animationDelay: '0.5s'}} />
                    </div>
                    <span className="text-xs text-gray-500">Trust Chain</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400 animate-pulse" style={{animationDelay: '1s'}} />
                    </div>
                    <span className="text-xs text-gray-500">Socratic Analysis</span>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
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

  const isStatusFulfilled = (status?: string) => {
    return status === 'fulfilled';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => router.push('/')}
              className="glass-effect hover-lift"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handleSaveFact}
                disabled={saving}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Analysis'}
              </Button>
              <Button 
                variant="outline"
                onClick={handleNewSearch}
                className="glass-effect hover-lift"
              >
                <Search className="h-4 w-4 mr-2" />
                New Search
              </Button>
            </div>
          </div>

        {/* Main Fact Card */}
        {isStatusFulfilled(factInfo?.status?.factCheck) && factInfo?.factCheck && (
          <Card className="glass-effect border-2 border-white/20 dark:border-gray-700/20 shadow-2xl card-hover overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>
            <CardHeader className="relative bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/50 dark:to-indigo-950/50 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
                    {factInfo?.claim || query}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3">
                      {getVerdictIcon(factInfo?.factCheck?.verdict || null)}
                      <Badge className={`${getVerdictColor(factInfo?.factCheck?.verdict || null)} px-4 py-2 text-sm font-bold rounded-full shadow-md`}>
                        {factInfo?.factCheck?.verdict ? String(factInfo.factCheck.verdict).toUpperCase() : "UNVERIFIED"}
                      </Badge>
                    </div>
                    {factInfo?.trustChain?.confidence !== undefined && (
                      <div className="flex items-center gap-3 bg-white/70 dark:bg-gray-800/70 rounded-full px-4 py-2 backdrop-blur-sm">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence</span>
                        <div className="h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 shadow-inner"
                            style={{ width: `${Math.round(factInfo.trustChain.confidence * 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {Math.round(factInfo.trustChain.confidence * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative pt-8 pb-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                  {factInfo?.factCheck?.explanation || 'No explanation available'}
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Updated {factInfo?.status?.timestamp ? new Date(factInfo.status.timestamp).toLocaleDateString() : 'Unknown'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span>AI-Powered Analysis</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fact Check Sources */}
        {isStatusFulfilled(factInfo?.status?.factCheck) && factInfo?.factCheck?.sources && factInfo.factCheck.sources.length > 0 && (
          <Card className="glass-effect card-hover border-2 border-white/20 dark:border-gray-700/20 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/30 dark:to-cyan-950/30">
              <CardTitle className="flex items-center gap-3 text-xl font-bold">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-gradient-blue">Fact Check Sources</span>
                <Badge variant="secondary" className="text-xs">{factInfo.factCheck.sources.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:gap-6">
                {factInfo.factCheck.sources.map((source, index) => (
                  <div
                    key={index}
                    className="group border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {source?.title || 'Unknown source'}
                        </h4>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className={`h-3 w-3 rounded-full shadow-inner ${
                              source?.reliability === 'High' ? 'bg-green-500' : 
                              source?.reliability === 'Medium' ? 'bg-yellow-500' : 
                              'bg-gray-500'
                            }`} />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {source?.reliability || 'Unknown'} Reliability
                            </span>
                          </div>
                        </div>
                      </div>
                      {source?.url && (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Source
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Trust Chain Analysis */}
        {isStatusFulfilled(factInfo?.status?.trustChain) && factInfo?.trustChain && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5 text-indigo-600" />
                Trust Chain Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {factInfo?.trustChain?.explanation || 'No explanation available'}
              </p>
              
              {factInfo?.trustChain?.context && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full" />
                    Context
                  </h4>
                  <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                    {factInfo.trustChain.context}
                  </p>
                </div>
              )}
              
              {factInfo?.trustChain?.gaps && factInfo.trustChain.gaps.length > 0 && (
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Information Gaps
                  </h4>
                  <ul className="text-yellow-800 dark:text-yellow-200 text-sm space-y-1">
                    {factInfo.trustChain.gaps.map((gap, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-0.5">•</span>
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Socratic Analysis */}
        {isStatusFulfilled(factInfo?.status?.socratic) && factInfo?.socratic && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Socratic Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {factInfo?.socratic?.reasoningSteps && factInfo.socratic.reasoningSteps.length > 0 && factInfo.socratic.reasoningSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className="border-l-4 border-purple-200 dark:border-purple-800 pl-4 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-lg">
                      {step?.question || 'No question available'}
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Analysis: </span>
                        <span className="text-gray-600 dark:text-gray-400">{step?.analysis || 'No analysis available'}</span>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                        <span className="font-medium text-blue-700 dark:text-blue-300">Evidence: </span>
                        <span className="text-blue-600 dark:text-blue-400">{step?.evidence || 'No evidence available'}</span>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md">
                        <span className="font-medium text-purple-700 dark:text-purple-300">Implications: </span>
                        <span className="text-purple-600 dark:text-purple-400">{step?.implications || 'No implications available'}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {factInfo?.socratic?.conclusion && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-lg flex items-center gap-2">
                      <div className="h-2 w-2 bg-purple-500 rounded-full" />
                      Conclusion
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Logical Validity: </span>
                        <span className="text-gray-600 dark:text-gray-400">{factInfo?.socratic?.conclusion?.logicalValidity || 'No validity assessment available'}</span>
                      </div>
                      
                      {factInfo?.socratic?.conclusion?.keyFlaws && Array.isArray(factInfo.socratic.conclusion.keyFlaws) && factInfo.socratic.conclusion.keyFlaws.length > 0 && (
                        <div>
                          <span className="font-medium text-red-700 dark:text-red-300">Key Flaws: </span>
                          <ul className="text-red-600 dark:text-red-400 mt-1 space-y-1">
                            {factInfo.socratic.conclusion.keyFlaws.map((flaw, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <XCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                <span>{flaw}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {factInfo?.socratic?.conclusion?.strengths && Array.isArray(factInfo.socratic.conclusion.strengths) && factInfo.socratic.conclusion.strengths.length > 0 && (
                        <div>
                          <span className="font-medium text-green-700 dark:text-green-300">Strengths: </span>
                          <ul className="text-green-600 dark:text-green-400 mt-1 space-y-1">
                            {factInfo.socratic.conclusion.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                        <span className="font-medium text-blue-700 dark:text-blue-300">Recommendations: </span>
                        <span className="text-blue-600 dark:text-blue-400">{factInfo?.socratic?.conclusion?.recommendations || 'No recommendations available'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Trust Chain Sources */}
        {isStatusFulfilled(factInfo?.status?.trustChain) && factInfo?.trustChain?.sources && factInfo.trustChain.sources.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-indigo-600" />
                Trust Chain Sources ({factInfo.trustChain.sources.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {factInfo.trustChain.sources.map((source, index) => (
                  <div 
                    key={index} 
                    className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {source?.name || 'Unknown source'}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                                style={{ width: `${Math.round((source?.reliability || 0) * 100)}%` }}
                              />
                            </div>
                            <span className="font-medium">{Math.round((source?.reliability || 0) * 100)}%</span>
                          </div>
                        </div>
                      </div>
                      {source?.url && (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Fact Check</h4>
                  <p className={`text-sm font-medium ${
                    factInfo?.status?.factCheck === 'fulfilled' ? 'text-green-600' : 'text-gray-600'
                  } dark:${
                    factInfo?.status?.factCheck === 'fulfilled' ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {factInfo?.status?.factCheck || 'Unknown'}
                  </p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Trust Chain</h4>
                  <p className={`text-sm font-medium ${
                    factInfo?.status?.trustChain === 'fulfilled' ? 'text-green-600' : 'text-gray-600'
                  } dark:${
                    factInfo?.status?.trustChain === 'fulfilled' ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {factInfo?.status?.trustChain || 'Unknown'}
                  </p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Socratic Analysis</h4>
                  <p className={`text-sm font-medium ${
                    factInfo?.status?.socratic === 'fulfilled' ? 'text-green-600' : 'text-gray-600'
                  } dark:${
                    factInfo?.status?.socratic === 'fulfilled' ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {factInfo?.status?.socratic || 'Unknown'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        </div>
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