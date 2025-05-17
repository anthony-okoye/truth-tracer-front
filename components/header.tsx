"use client";

import Link from "next/link";
import { CheckCircle, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { ConversationHistory } from "./conversation-history";
import { useState } from "react";
import { Button } from "./ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="flex items-center font-bold text-xl">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                FactFinder
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex md:items-center md:gap-6 mx-4 flex-1 justify-center">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <ConversationHistory />
            <ThemeToggle />
            
            {/* Mobile menu toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container max-w-6xl mx-auto px-4 md:hidden border-t">
          <nav className="flex flex-col py-4">
            <Link 
              href="/" 
              className="py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/faq" 
              className="py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
} 