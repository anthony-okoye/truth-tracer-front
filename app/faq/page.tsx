"use client"

import { cn } from "@/lib/utils";
import { HelpCircle, Mail, MessageCircle, Book, Shield, Clock, Users, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FAQPage() {
  const faqs = [
    {
      question: "How does Truth Tracer verify information?",
      answer: "Truth Tracer uses a sophisticated three-pronged approach: comprehensive fact checking against trusted sources, trust chain analysis of information propagation, and Socratic reasoning to evaluate logical validity. Our AI-powered system processes claims through multiple verification layers, cross-referencing with over 1000+ trusted sources, academic publications, and verified databases to ensure maximum accuracy."
    },
    {
      question: "How accurate are the results?",
      answer: "We maintain a 99.9% accuracy rate through our rigorous verification process. Our AI system undergoes continuous training and validation against known facts. However, we always encourage users to cross-reference crucial information with multiple trusted sources and maintain critical thinking. Remember, no system is perfect, and we provide confidence scores to help you assess the reliability of each analysis."
    },
    {
      question: "What types of claims can be verified?",
      answer: "Truth Tracer can verify factual claims across various domains including news, science, history, statistics, technology, health, politics, and economics. We excel at verifying: statistical claims, historical facts, scientific statements, news reports, product claims, and publicly verifiable information. However, subjective opinions, personal experiences, future predictions, and matters of personal taste cannot be definitively verified."
    },
    {
      question: "How fast is the analysis process?",
      answer: "Most analyses complete within 30 seconds. Simple fact checks may take 10-15 seconds, while complex claims requiring deep analysis across multiple domains may take up to 60 seconds. Our system processes information in parallel across three analysis engines (fact-checking, trust chain, and Socratic analysis) to maximize both speed and accuracy."
    },
    {
      question: "Is my search history private?",
      answer: "Absolutely. Your privacy is our top priority. All search history is stored locally on your device and is never transmitted to our servers. You can view your recent verifications in the history panel and clear them at any time. We only process the claims you submit for analysis - no personal data is collected or stored."
    },
    {
      question: "How often is the database updated?",
      answer: "Our source database is continuously updated in real-time. We maintain active connections with over 200 trusted source networks including news agencies, academic institutions, government databases, and fact-checking organizations. New sources are verified and integrated automatically, ensuring comprehensive coverage of current events and emerging topics."
    },
    {
      question: "Can I save and share analysis results?",
      answer: "Yes! You can save analysis results locally for future reference. Each saved analysis includes the original claim, verdict, confidence score, sources, and detailed reasoning. While sharing features are currently in development, you can copy the analysis details to share manually. Saved analyses are stored locally and remain private to your device."
    },
    {
      question: "What makes Truth Tracer different from other fact-checkers?",
      answer: "Truth Tracer combines three unique analysis methods: traditional fact-checking, innovative trust chain analysis, and Socratic reasoning. This multi-layered approach provides deeper insights than simple source matching. Additionally, our real-time processing, transparent confidence scoring, and comprehensive source analysis set us apart from traditional fact-checking services."
    },
    {
      question: "Is Truth Tracer free to use?",
      answer: "Yes, Truth Tracer is completely free to use. We believe access to truth verification should be available to everyone. All features including fact-checking, trust chain analysis, Socratic reasoning, and result saving are available at no cost. We're committed to democratizing access to reliable information verification tools."
    },
    {
      question: "How can I report incorrect results or provide feedback?",
      answer: "We welcome feedback to improve our system. If you encounter incorrect results, you can report them through our feedback system (coming soon) or contact our support team. Include the original claim, our analysis result, and any evidence showing the discrepancy. Your feedback helps train our AI and improve accuracy for all users."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-6">
            <div className="relative">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-pulse-slow">
                <HelpCircle className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="gradient-text">Frequently Asked Questions</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about Truth Tracer's AI-powered fact verification system
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <Card className="glass-effect text-center p-6 hover-lift">
              <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">30s</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Analysis</div>
            </Card>
            <Card className="glass-effect text-center p-6 hover-lift">
              <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">99.9%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</div>
            </Card>
            <Card className="glass-effect text-center p-6 hover-lift">
              <Book className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">1000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Trusted Sources</div>
            </Card>
            <Card className="glass-effect text-center p-6 hover-lift">
              <Users className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">500K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass-effect shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold">
                <span className="text-gradient-blue">Common Questions</span>
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                Click on any question below to see the detailed answer
              </p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-gray-200 dark:border-gray-700">
                    <AccordionTrigger className="text-left hover:text-blue-600 dark:hover:text-blue-400 text-lg font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass-effect shadow-xl">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Still have questions?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Can't find the answer you're looking for? Our support team is here to help you get the most out of Truth Tracer's verification capabilities.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="glass-effect">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Join Community
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center space-y-2">
                    <Zap className="h-6 w-6 mx-auto text-blue-600" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Fast Response</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We typically respond within 24 hours
                    </p>
                  </div>
                  <div className="text-center space-y-2">
                    <Shield className="h-6 w-6 mx-auto text-green-600" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Expert Help</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Our team includes fact-checking experts
                    </p>
                  </div>
                  <div className="text-center space-y-2">
                    <Users className="h-6 w-6 mx-auto text-purple-600" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Community</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Join thousands of truth seekers
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}