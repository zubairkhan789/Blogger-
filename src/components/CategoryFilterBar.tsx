import React from 'react';
import { BlogCategory } from '../types/blog';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface CategoryFilterBarProps {
  categories: readonly BlogCategory[];
  activeCategory: BlogCategory;
  onSelectCategory: (cat: BlogCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'latest' | 'popular' | 'readTime';
  onSortChange: (sort: 'latest' | 'popular' | 'readTime') => void;
  totalFilteredPosts: number;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalFilteredPosts,
}) => {
  return (
    <div className="py-6 space-y-4">
      {/* Search and Sort row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles by title, topic, or keyword..."
            className="w-full pl-9 pr-9 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 placeholder:text-slate-400 text-slate-900 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort & Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500">
          <span className="tabular-nums">
            Showing <strong className="text-slate-900 font-semibold">{totalFilteredPosts}</strong> {totalFilteredPosts === 1 ? 'article' : 'articles'}
          </span>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-white border border-slate-200 text-xs text-slate-700 py-1.5 px-2.5 rounded-lg focus:outline-none focus:border-purple-600 cursor-pointer font-medium"
            >
              <option value="latest">Latest Published</option>
              <option value="popular">Most Clapped</option>
              <option value="readTime">Read Time (Shortest)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs (Segmented control) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none text-xs">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium transition-all ${
                isActive
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};
