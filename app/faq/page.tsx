import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";

export default function FAQPage() {
  return (
    <div className={cn("container mx-auto px-4 py-8 max-w-5xl")}>
      <div className="relative h-[200px] w-full mb-8 rounded-lg overflow-hidden bg-gradient-to-r from-primary/20 to-primary/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <HelpCircle className="w-16 h-16 mx-auto text-primary" />
            <h1 className={cn("text-3xl font-bold text-foreground")}>
              Frequently Asked Questions
            </h1>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-card rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-4 text-card-foreground">
            How does Truth Tracer verify information?
          </h2>
          <p className="text-muted-foreground">
            Truth Tracer uses a three-pronged approach: comprehensive fact
            checking against trusted sources, trust chain analysis of
            information propagation, and Socratic reasoning to evaluate logical
            validity. Our AI-powered system processes claims through multiple
            verification layers to ensure accuracy.
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-4 text-card-foreground">
            How accurate are the results?
          </h2>
          <p className="text-muted-foreground">
            We maintain a 99.9% accuracy rate through our rigorous verification
            process. However, we always encourage users to cross-reference
            crucial information with multiple trusted sources and maintain
            critical thinking.
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-4 text-card-foreground">
            What types of claims can be verified?
          </h2>
          <p className="text-muted-foreground">
            Truth Tracer can verify factual claims across various domains
            including news, science, history, and statistics. However, it&apos;s
            important to note that subjective opinions, personal experiences,
            and future predictions cannot be definitively verified.
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-4 text-card-foreground">
            How often is the database updated?
          </h2>
          <p className="text-muted-foreground">
            Our source database is continuously updated in real-time. We
            maintain connections with over 200 trusted source networks and
            regularly integrate new verified sources to ensure comprehensive
            coverage of current events and topics.
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-4 text-card-foreground">
            Is my search history private?
          </h2>
          <p className="text-muted-foreground">
            Yes, your search history is stored locally on your device and is not
            shared with our servers. You can view your recent verifications in
            the history panel and clear them at any time.
          </p>
        </div>

        <div className={cn("bg-muted p-6 rounded-lg mt-8")}>
          <h3 className={cn("text-xl font-semibold mb-3 text-foreground")}>
            Still have questions?
          </h3>
          <p className="text-muted-foreground">
            If you couldn&apos;t find the answer you were looking for, feel free to
            contact our support team. We&apos;re here to help ensure you get the most
            out of Truth Tracer&apos;s verification capabilities.
          </p>
        </div>
      </div>
    </div>
  );
}