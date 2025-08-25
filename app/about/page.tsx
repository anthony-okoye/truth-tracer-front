"use client"

import { cn } from "@/lib/utils";
import {
  Brain,
  Target,
  Network,
  Lightbulb,
  ShieldCheck,
  SearchCheck,
  Zap,
  Globe,
  Users,
  Award,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Clock,
  Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms process information through sophisticated natural language understanding and reasoning frameworks.",
      color: "text-blue-600"
    },
    {
      icon: ShieldCheck,
      title: "Triple Verification",
      description: "Every claim undergoes fact-checking, trust chain analysis, and Socratic reasoning for comprehensive validation.",
      color: "text-green-600"
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Lightning-fast analysis delivers results in seconds, not minutes, without compromising accuracy or depth.",
      color: "text-yellow-600"
    },
    {
      icon: Globe,
      title: "Global Source Network",
      description: "Access to 1000+ trusted sources including academic institutions, news agencies, and fact-checking organizations worldwide.",
      color: "text-purple-600"
    }
  ];

  const methodology = [
    {
      icon: ShieldCheck,
      title: "Comprehensive Fact Checking",
      description: "Real-time verification against our extensive database of trusted sources, academic publications, and verified records.",
      step: "01"
    },
    {
      icon: Network,
      title: "Trust Chain Analysis",
      description: "Advanced algorithmic assessment of source credibility, citation networks, and information propagation patterns.",
      step: "02"
    },
    {
      icon: Lightbulb,
      title: "Socratic Reasoning",
      description: "Systematic critical analysis through AI-driven questioning and logical evaluation frameworks.",
      step: "03"
    }
  ];

  const stats = [
    { value: "1M+", label: "Claims Verified", icon: CheckCircle },
    { value: "99.9%", label: "Accuracy Rate", icon: Award },
    { value: "500K+", label: "Active Users", icon: Users },
    { value: "30s", label: "Average Analysis", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="container mx-auto max-w-6xl text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                The Future of Fact-Checking
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                <span className="block">About</span>
                <span className="block gradient-text animate-pulse-slow">Truth Tracer</span>
              </h1>
              <div className="max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Pioneering the frontier of <span className="text-gradient-blue font-semibold">digital fact verification</span> with advanced AI, combining cutting-edge technology with rigorous journalistic principles to combat misinformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass-effect shadow-2xl">
            <CardContent className="p-12 text-center">
              <Target className="h-16 w-16 mx-auto mb-6 text-blue-600 animate-float" />
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-gradient-purple">Our Mission</span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                In today's fast-paced digital world, misinformation can spread at unprecedented speeds. Truth Tracer stands as a beacon of accuracy and reliability, empowering individuals and organizations to make informed decisions based on verified facts. We're committed to democratizing access to truth verification tools while maintaining the highest standards of accuracy and transparency.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient-blue">Why Choose</span> Truth Tracer?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover what makes our AI-powered fact-checking platform the most trusted choice for truth verification
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-effect card-hover border-2 border-white/20 dark:border-gray-700/20 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 ${feature.color}`}>
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Methodology */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Verification Methodology
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              A comprehensive three-step approach that ensures maximum accuracy and reliability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodology.map((method, index) => (
              <div key={index} className="relative">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                        {method.step}
                      </div>
                    </div>
                    <method.icon className="h-16 w-16 mx-auto mb-6 text-white" />
                    <h3 className="text-xl font-bold mb-4">
                      {method.title}
                    </h3>
                    <p className="text-blue-100 leading-relaxed">
                      {method.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient-blue">Impact &</span> Statistics
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our numbers speak for themselves - see the impact we're making in the fight against misinformation
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-effect text-center p-6 hover-lift">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Deep Dive */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="px-3 py-1">
                <Brain className="h-4 w-4 mr-2" />
                Advanced Technology
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-gradient-purple">Cutting-Edge</span> AI Engine
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p className="text-lg leading-relaxed">
                  At the heart of Truth Tracer lies a sophisticated AI engine that processes information through multiple layers of verification. Our system analyzes patterns, cross-references sources, and employs advanced natural language processing to evaluate claims with unprecedented accuracy.
                </p>
                <p>
                  Our technology stack includes state-of-the-art machine learning models, real-time data processing, and advanced reasoning algorithms that work together to deliver results you can trust.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Neural Networks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">NLP Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Real-time Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Source Validation</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Card className="glass-effect p-12 shadow-2xl">
                <Brain className="h-32 w-32 mx-auto text-blue-600 animate-float" />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass-effect shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>
            <CardContent className="relative p-12 text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-6 text-purple-600 animate-float" />
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-gradient-blue">Looking Forward</span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                As we continue to evolve, we're constantly improving our algorithms, expanding our source networks, and developing new features to make fact-checking more accessible and efficient. Our vision is to create a world where verified information is the norm, not the exception.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Innovation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Continuous improvement and innovation</p>
                </div>
                <div className="text-center">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Global Reach</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Expanding worldwide accessibility</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Community</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Building a truth-seeking community</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-800 rounded-lg">
                  <ShieldCheck className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-yellow-800 dark:text-yellow-200">
                    Important Note
                  </h3>
                  <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
                    While we employ advanced technology and rigorous methodologies, we encourage users to maintain critical thinking and cross-reference crucial information. Truth Tracer is a powerful tool in the fight against misinformation, but it works best when combined with user discretion and multiple trusted sources.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}