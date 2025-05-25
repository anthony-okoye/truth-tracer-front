import { cn, } from "@/lib/utils";
import {
  Brain,
  Target,
  Network,
  Lightbulb,
  ShieldCheck,
  SearchCheck,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className={cn("container mx-auto px-4 py-12 max-w-5xl")}>
      <div className="relative h-[200px] w-full mb-8 rounded-lg overflow-hidden bg-gradient-to-r from-primary/20 to-primary/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <SearchCheck className="w-16 h-16 mx-auto text-primary" />
            <h1 className={cn("text-3xl font-bold text-foreground")}>
              About Truth Tracer
            </h1>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "prose prose-slate max-w-none dark:prose-invert space-y-12"
        )}
      >
        <p className={cn("text-xl leading-relaxed text-foreground")}>
          Truth Tracer represents the frontier of digital fact verification,
          combining advanced artificial intelligence with rigorous journalistic
          principles to combat misinformation in our increasingly complex
          information landscape.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex items-center justify-center p-10 bg-muted rounded-lg">
            <Brain className="w-32 h-32 text-primary" />
          </div>
          <div className="space-y-4">
            <h2 className={cn("text-2xl font-semibold text-foreground")}>
              Our Technology
            </h2>
            <p className="text-muted-foreground text-lg">
              At the heart of Truth Tracer lies a sophisticated AI engine that
              processes information through multiple layers of verification. Our
              system analyzes patterns, cross-references sources, and employs
              advanced natural language processing to evaluate claims with
              unprecedented accuracy.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className={cn("text-2xl font-semibold text-foreground")}>
            Verification Methodology
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className={cn(
                "bg-card p-8 rounded-lg border hover:border-primary/50 transition-colors"
              )}
            >
              <div className="flex justify-center mb-6">
                <ShieldCheck className="w-16 h-16 text-primary" />
              </div>
              <h3
                className={cn(
                  "text-xl font-semibold mb-4 text-card-foreground text-center"
                )}
              >
                Comprehensive Fact Checking
              </h3>
              <p className="text-muted-foreground text-center">
                Real-time verification against our extensive database of trusted
                sources, academic publications, and verified records.
              </p>
            </div>
            <div
              className={cn(
                "bg-card p-8 rounded-lg border hover:border-primary/50 transition-colors"
              )}
            >
              <div className="flex justify-center mb-6">
                <Network className="w-16 h-16 text-primary" />
              </div>
              <h3
                className={cn(
                  "text-xl font-semibold mb-4 text-card-foreground text-center"
                )}
              >
                Trust Chain Analysis
              </h3>
              <p className="text-muted-foreground text-center">
                Advanced algorithmic assessment of source credibility, citation
                networks, and information propagation patterns.
              </p>
            </div>
            <div
              className={cn(
                "bg-card p-8 rounded-lg border hover:border-primary/50 transition-colors"
              )}
            >
              <div className="flex justify-center mb-6">
                <Lightbulb className="w-16 h-16 text-primary" />
              </div>
              <h3
                className={cn(
                  "text-xl font-semibold mb-4 text-card-foreground text-center"
                )}
              >
                Socratic Reasoning
              </h3>
              <p className="text-muted-foreground text-center">
                Systematic critical analysis through AI-driven questioning and
                logical evaluation frameworks.
              </p>
            </div>
          </div>
        </div>

        <div className={cn("bg-accent p-10 rounded-lg")}>
          <h2
            className={cn(
              "text-2xl font-semibold mb-8 text-accent-foreground text-center"
            )}
          >
            Impact & Statistics
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className={cn("text-4xl font-bold text-primary")}>1M+</div>
              <div className="text-muted-foreground">Claims Verified</div>
            </div>
            <div className="space-y-2">
              <div className={cn("text-4xl font-bold text-primary")}>99.9%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="space-y-2">
              <div className={cn("text-4xl font-bold text-primary")}>500K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className={cn("text-4xl font-bold text-primary")}>200+</div>
              <div className="text-muted-foreground">Source Networks</div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className={cn("text-2xl font-semibold text-foreground")}>
            Our Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <p className={cn("text-lg text-muted-foreground leading-relaxed")}>
              In today&apos;s fast-paced digital world, misinformation can spread at
              unprecedented speeds. Truth Tracer stands as a beacon of accuracy
              and reliability, empowering individuals and organizations to make
              informed decisions based on verified facts. We&apos;re committed to
              democratizing access to truth verification tools while maintaining
              the highest standards of accuracy and transparency.
            </p>
            <div className="flex items-center justify-center p-10 bg-muted rounded-lg">
              <Target className="w-32 h-32 text-primary" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className={cn("text-2xl font-semibold text-foreground")}>
            Looking Forward
          </h2>
          <p className={cn("text-lg text-muted-foreground leading-relaxed")}>
            As we continue to evolve, we&apos;re constantly improving our algorithms,
            expanding our source networks, and developing new features to make
            fact-checking more accessible and efficient. Our vision is to create
            a world where verified information is the norm, not the exception.
          </p>
        </div>

        <div className={cn("bg-muted p-8 rounded-lg")}>
          <h3 className={cn("text-xl font-semibold mb-4 text-foreground")}>
            Important Note
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            While we employ advanced technology and rigorous methodologies, we
            encourage users to maintain critical thinking and cross-reference
            crucial information. Truth Tracer is a powerful tool in the fight
            against misinformation, but it works best when combined with user
            discretion and multiple trusted sources.
          </p>
        </div>
      </div>
    </div>
  );
}