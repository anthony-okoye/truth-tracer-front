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
import { CheckCircle, XCircle, AlertCircle, ExternalLink, User, Globe, ArrowLeft, Brain, Link } from 'lucide-react';
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
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold mb-2">{factInfo?.claim || 'Unknown claim'}</CardTitle>
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