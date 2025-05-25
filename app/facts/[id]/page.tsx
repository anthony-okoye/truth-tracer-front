'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, ExternalLink, Calendar, User, Globe } from 'lucide-react';

interface FactInfo {
  id: string;
  claim: string;
  verdict: 'true' | 'false' | 'mixed' | 'unverified';
  confidence: number;
  summary: string;
  sources: Array<{
    title: string;
    url: string;
    credibility: number;
    publishedDate: string;
  }>;
  analysis: string;
  lastUpdated: string;
  category: string;
  relatedClaims: string[];
}

export default function FactDetailPage() {
  const params = useParams();
  const [factInfo, setFactInfo] = useState<FactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, fetch from API using params.id
    const mockFactInfo: FactInfo = {
      id: params.id as string,
      claim: "The Great Wall of China is visible from space",
      verdict: "false",
      confidence: 95,
      summary: "This is a persistent myth that has been thoroughly debunked by astronauts and space agencies.",
      sources: [
        {
          title: "NASA - Great Wall of China Myth",
          url: "https://nasa.gov/great-wall-myth",
          credibility: 98,
          publishedDate: "2023-01-15"
        },
        {
          title: "Snopes - Great Wall Visibility",
          url: "https://snopes.com/great-wall-space",
          credibility: 92,
          publishedDate: "2022-11-20"
        }
      ],
      analysis: "Multiple astronauts, including those from NASA and other space agencies, have confirmed that the Great Wall of China is not visible from space with the naked eye. While some human-made structures can be seen from low Earth orbit under perfect conditions, the Great Wall is not among them due to its narrow width and materials that blend with the surrounding landscape.",
      lastUpdated: "2024-01-15",
      category: "Science & Technology",
      relatedClaims: [
        "The Great Wall is the only man-made structure visible from the moon",
        "You can see city lights from space",
        "The pyramids are visible from space"
      ]
    };

    setTimeout(() => {
      setFactInfo(mockFactInfo);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'true':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'false':
        return <XCircle className="h-6 w-6 text-red-600" />;
      case 'mixed':
        return <AlertCircle className="h-6 w-6 text-yellow-600" />;
      default:
        return <AlertCircle className="h-6 w-6 text-gray-600" />;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'true':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'false':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'mixed':
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

  if (!factInfo) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Fact not found</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">The requested fact information could not be found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          {getVerdictIcon(factInfo.verdict)}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {factInfo.claim}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <Badge className={getVerdictColor(factInfo.verdict)}>
                {factInfo.verdict.toUpperCase()}
              </Badge>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Confidence: {factInfo.confidence}%
              </span>
              <Badge variant="outline">{factInfo.category}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {factInfo.summary}
          </p>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {factInfo.analysis}
          </p>
        </CardContent>
      </Card>

      {/* Sources */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {factInfo.sources.map((source, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {source.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(source.publishedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        Credibility: {source.credibility}%
                      </div>
                    </div>
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Related Claims */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Related Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {factInfo.relatedClaims.map((claim, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                <p className="text-gray-700 dark:text-gray-300">{claim}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Last updated: {new Date(factInfo.lastUpdated).toLocaleDateString()}
      </div>
    </div>
  );
}