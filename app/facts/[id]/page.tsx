'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, ExternalLink, Globe, ArrowLeft, Brain, Link } from 'lucide-react';
import { getFactResults } from '@/lib/utils';
import { IFactResult } from '@/types';

export default function FactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [factInfo, setFactInfo] = useState<IFactResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const factId = params.id as string;
    
    if (!factId) {
      setError('No fact ID provided');
      setLoading(false);
      return;
    }

    try {
      // Get all stored facts from localStorage
      const storedFacts = getFactResults();
      
      if (!storedFacts || storedFacts.length === 0) {
        setError('No saved facts found');
        setLoading(false);
        return;
      }

      // Find the specific fact by ID
      const fact = storedFacts.find(f => f.id === factId);
      
      if (!fact) {
        setError(`Fact with ID "${factId}" not found`);
        setLoading(false);
        return;
      }

      setFactInfo(fact);
      setLoading(false);
    } catch (err) {
      console.error('Error loading fact:', err);
      setError('Failed to load fact information');
      setLoading(false);
    }
  }, [params.id]);

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <Card className="text-center py-12">
            <CardContent>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Fact Not Found</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => router.push('/')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
                <Button variant="outline" onClick={() => router.push('/facts/result')}>
                  Search Facts
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
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Fact not found</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">The requested fact information could not be found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Main Fact Card */}
        {isStatusFulfilled(factInfo?.status?.factCheck) && factInfo?.factCheck && (
          <Card className="border-2 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl font-bold mb-2">{factInfo?.claim || 'Unknown claim'}</CardTitle>
                  <div className="flex items-center gap-3">
                    {getVerdictIcon(factInfo?.factCheck?.verdict || null)}
                    <Badge className={`${getVerdictColor(factInfo?.factCheck?.verdict || null)} px-3 py-1 text-sm font-semibold`}>
                      {factInfo?.factCheck?.verdict ? String(factInfo.factCheck.verdict).toUpperCase() : "UNVERIFIED"}
                    </Badge>
                    {factInfo?.trustChain?.confidence !== undefined && (
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000"
                            style={{ width: `${Math.round(factInfo.trustChain.confidence * 100)}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">
                          {Math.round(factInfo.trustChain.confidence * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-lg leading-relaxed mb-4">{factInfo?.factCheck?.explanation || 'No explanation available'}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>Updated {factInfo?.status?.timestamp ? new Date(factInfo.status.timestamp).toLocaleDateString() : 'Unknown'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fact Check Sources */}
        {isStatusFulfilled(factInfo?.status?.factCheck) && factInfo?.factCheck?.sources && factInfo.factCheck.sources.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Fact Check Sources ({factInfo.factCheck.sources.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {factInfo.factCheck.sources.map((source, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {source?.title || 'Unknown source'}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <div className={`h-2 w-2 rounded-full ${
                              source?.reliability === 'High' ? 'bg-green-500' : 
                              source?.reliability === 'Medium' ? 'bg-yellow-500' : 
                              'bg-gray-500'
                            }`} />
                            <span>Reliability: {source?.reliability || 'Unknown'}</span>
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
                  <div key={index} className="border-l-4 border-purple-200 dark:border-purple-800 pl-4 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
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
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-md transition-all duration-200">
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
  );
}