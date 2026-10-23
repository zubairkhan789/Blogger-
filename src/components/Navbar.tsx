import React from 'react';
import { PenSquare, Bookmark, Sparkles, BookOpen, Compass, User } from 'lucide-react';

interface NavbarProps {
  activeTab: 'articles' | 'categories' | 'journey' | 'write';
  setActiveTab: (tab: 'articles' | 'categories' | 'journey' | 'write') => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onNewPost: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookmarksCount,
  onOpenBookmarks,
  onNewPost,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('articles')}
          className="flex items-center gap-2 text-left group focus:outline-none"
        >
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-purple-700 transition-colors whitespace-nowrap shrink-0 font-editorial">
            Zubair WebsiteWala
          </span>
          <span className="text-purple-600 text-xs font-semibold tracking-wider uppercase font-mono-code hidden sm:inline">
            // Blog
          </span>
        </button>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('articles')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              activeTab === 'articles'
                ? 'border-purple-600 text-slate-950 font-semibold'
                : 'border-transparent hover:text-slate-950'
            }`}
          >
            Articles
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              activeTab === 'categories'
                ? 'border-purple-600 text-slate-950 font-semibold'
                : 'border-transparent hover:text-slate-950'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('journey')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              activeTab === 'journey'
                ? 'border-purple-600 text-slate-950 font-semibold'
                : 'border-transparent hover:text-slate-950'
            }`}
          >
            My Journey & Story
          </button>
        </nav>

        {/* Zone 3: 1 primary action + bookmark quick drawer */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Saved Bookmarks"
            aria-label="Saved Bookmarks"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {bookmarksCount}
              </span>
            )}
          </button>

          <button
            onClick={onNewPost}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-950 hover:bg-purple-700 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>Write a Post</span>
          </button>
        </div>
      </div>

      {/* Mobile nav strip */}
      <div className="flex md:hidden items-center justify-around border-t border-slate-200/60 bg-white/60 px-2 py-1.5 text-xs">
        <button
          onClick={() => setActiveTab('articles')}
          className={`flex items-center gap-1 py-1 px-2 rounded font-medium ${
            activeTab === 'articles' ? 'text-purple-700 font-semibold' : 'text-slate-600'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Articles</span>
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-1 py-1 px-2 rounded font-medium ${
            activeTab === 'categories' ? 'text-purple-700 font-semibold' : 'text-slate-600'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Categories</span>
        </button>
        <button
          onClick={() => setActiveTab('journey')}
          className={`flex items-center gap-1 py-1 px-2 rounded font-medium ${
            activeTab === 'journey' ? 'text-purple-700 font-semibold' : 'text-slate-600'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>My Journey</span>
        </button>
      </div>
    </header>
  );
};
