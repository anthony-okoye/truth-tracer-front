import Link from "next/link";
import { CheckCircle, Github, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-border/40 bg-background py-6">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Logo and tagline */}
          <div className="flex flex-col space-y-3">
            <Link href="/" className="flex items-center space-x-2">
              <span className="flex items-center font-bold text-xl">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                FactFinder
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Verify information with confidence using our advanced fact-checking tools.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-muted-foreground hover:text-primary">
                  Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Social media */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright and powered by section */}
        <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} FactFinder. All rights reserved.
          </p>
          <div className="flex items-center mt-4 sm:mt-0">
            <p className="text-sm text-muted-foreground">
              AI-Powered Search by <span className="font-semibold text-primary">Perplexity AI</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}