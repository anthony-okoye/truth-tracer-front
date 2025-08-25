import Link from "next/link";
import { CheckCircle, Github, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 w-32 h-32 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>
      
      <div className="relative container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Logo and tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="group flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200" />
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Truth Tracer
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
              Empower yourself with AI-driven fact-checking. Our advanced analysis combines multiple verification methods to help you distinguish truth from misinformation.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                🔍 Deep Analysis
              </div>
              <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                🧠 AI-Powered
              </div>
              <div className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                ⚡ Real-time
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Methodology</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connect</h3>
            <div className="flex space-x-4">
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-1 transition-all duration-200 group"
              >
                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-1 transition-all duration-200 group"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
            
            {/* Newsletter signup */}
            <div className="pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Stay updated</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-r-lg hover:bg-blue-700 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and powered by section */}
        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-600">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <p>© {currentYear} Truth Tracer. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Terms of Service</Link>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Powered by</span>
              <div className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium">
                AI Technology
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}