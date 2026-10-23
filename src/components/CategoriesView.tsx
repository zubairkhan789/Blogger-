import React from 'react';
import { BlogPost, BlogCategory } from '../types/blog';
import { 
  Sparkles, 
  Code, 
  TrendingUp, 
  Compass, 
  Layers, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface CategoriesViewProps {
  posts: BlogPost[];
  onSelectCategory: (cat: BlogCategory) => void;
  onReadPost: (post: BlogPost) => void;
}

const CATEGORY_CARDS: {
  category: Exclude<BlogCategory, 'All'>;
  icon: any;
  tagline: string;
  description: string;
}[] = [
  {
    category: 'Artificial Intelligence',
    icon: Sparkles,
    tagline: 'Multimodal Models & Autonomous Agents',
    description: 'Practical architectural breakdowns of deploying LLMs, multimodal vision/audio systems, prompt optimization, and agentic workflows.',
  },
  {
    category: 'Technology & Coding',
    icon: Code,
    tagline: 'Modern Full-Stack & Developer Velocity',
    description: 'Clean coding patterns, TypeScript mastery, performance profiling, debugging real-world bottlenecks, and developer tooling.',
  },
  {
    category: 'Business & Strategy',
    icon: TrendingUp,
    tagline: 'Solopreneurship & Product Monetization',
    description: 'Actionable playbooks on discovering high-pain problems, zero-overhead bootstrapped software, client acquisition, and pricing.',
  },
  {
    category: 'My Journey',
    icon: Compass,
    tagline: 'Learning in Public & Unfiltered Stories',
    description: 'The authentic stories, failures, hard pivots, and milestones of Zubair WebsiteWala building in public.',
  },
  {
    category: 'Web Engineering',
    icon: Layers,
    tagline: 'Anti-Slop Design & High-Performance Frontends',
    description: 'Zero-pill interfaces, accessible typography, sub-second latency budgets, and enduring UI design systems.',
  },
];

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  posts,
  onSelectCategory,
  onReadPost,
}) => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title Banner */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-purple-700 tracking-wider uppercase font-mono-code mb-2">
            Curated Knowledge Hubs
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 font-editorial mb-4">
            Explore Blog Categories
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Dive deep into specialized archives covering cutting-edge artificial intelligence, resilient web engineering, startup strategy, and Zubair's personal building journey.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CATEGORY_CARDS.map((cat) => {
            const Icon = cat.icon;
            const categoryPosts = posts.filter((p) => p.category === cat.category);
            return (
              <div
                key={cat.category}
                className="group p-6 rounded-2xl border border-slate-200/90 bg-slate-50 hover:bg-white hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono-code text-slate-500 tabular-nums font-semibold">
                      {categoryPosts.length} {categoryPosts.length === 1 ? 'post' : 'posts'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors mb-1 font-editorial">
                    {cat.category}
                  </h3>
                  <div className="text-xs font-medium text-purple-700 mb-3">
                    {cat.tagline}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                {/* Recent post teaser */}
                {categoryPosts.length > 0 && (
                  <div className="pt-4 border-t border-slate-200/70">
                    <div className="text-[11px] font-mono-code uppercase text-slate-400 mb-1">
                      Latest Essay:
                    </div>
                    <div
                      onClick={() => onReadPost(categoryPosts[0])}
                      className="text-xs font-semibold text-slate-800 hover:text-purple-700 cursor-pointer line-clamp-1 mb-3"
                    >
                      {categoryPosts[0].title}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => onSelectCategory(cat.category)}
                  className="w-full mt-2 py-2 px-3 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-600 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Browse All in {cat.category}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
