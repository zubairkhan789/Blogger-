import React from 'react';
import { BlogCategory } from '../types/blog';
import { Heart } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: BlogCategory) => void;
  onNavigateTab: (tab: 'articles' | 'categories' | 'journey' | 'write') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateTab,
}) => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 pb-8 border-b border-slate-100">
        {/* Brand Lockup */}
        <div className="max-w-sm">
          <span className="text-xl font-bold tracking-tight text-slate-900 font-editorial">
            Zubair WebsiteWala
          </span>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            My personal digital space for publishing articles, exploring artificial intelligence, discussing modern software engineering, and sharing solopreneur lessons with builders worldwide.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-purple-700 font-medium">
            <Heart className="w-3.5 h-3.5 fill-purple-600 text-purple-600" />
            <span>One idea. One blog. One step forward.</span>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
          <div>
            <div className="font-semibold text-slate-900 uppercase tracking-wider mb-3 font-mono-code">
              Navigation
            </div>
            <ul className="space-y-2 text-slate-600">
              <li>
                <button
                  onClick={() => onNavigateTab('articles')}
                  className="hover:text-purple-700 transition-colors"
                >
                  All Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('categories')}
                  className="hover:text-purple-700 transition-colors"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('journey')}
                  className="hover:text-purple-700 transition-colors"
                >
                  My Journey & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('write')}
                  className="hover:text-purple-700 transition-colors font-medium text-purple-700"
                >
                  AI Blog Studio
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-slate-900 uppercase tracking-wider mb-3 font-mono-code">
              Pillars
            </div>
            <ul className="space-y-2 text-slate-600">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Artificial Intelligence');
                    onNavigateTab('articles');
                  }}
                  className="hover:text-purple-700 transition-colors"
                >
                  Artificial Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Technology & Coding');
                    onNavigateTab('articles');
                  }}
                  className="hover:text-purple-700 transition-colors"
                >
                  Technology & Coding
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Business & Strategy');
                    onNavigateTab('articles');
                  }}
                  className="hover:text-purple-700 transition-colors"
                >
                  Business & Strategy
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('My Journey');
                    onNavigateTab('articles');
                  }}
                  className="hover:text-purple-700 transition-colors"
                >
                  My Journey
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-slate-900 uppercase tracking-wider mb-3 font-mono-code">
              Platform
            </div>
            <div className="space-y-1.5 text-slate-500">
              <div>Vite & React 19</div>
              <div>Tailwind CSS</div>
              <div>Gemini 3.8 Flash SDK</div>
              <div>Local-First Persistence</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div>
          © {new Date().getFullYear()} Zubair WebsiteWala. All rights reserved.
        </div>
        <div className="text-slate-500">
          Built with creativity, technology, and AI-powered coding.
        </div>
      </div>
    </footer>
  );
};
