import React from 'react';
import { BlogPost } from '../types/blog';
import { ArrowRight, Sparkles, BookOpen, Clock, Heart } from 'lucide-react';

interface HeroSectionProps {
  featuredPost: BlogPost;
  onReadPost: (post: BlogPost) => void;
  onExploreCategories: () => void;
  onViewJourney: () => void;
  onWritePost: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredPost,
  onReadPost,
  onExploreCategories,
  onViewJourney,
  onWritePost,
}) => {
  return (
    <section className="border-b border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Split Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-purple-700 uppercase font-mono-code mb-4">
              <span>Personal Publication</span>
              <span aria-hidden="true">·</span>
              <span>By Zubair WebsiteWala</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 font-editorial mb-5 text-balance leading-[1.15]">
              Exploring AI, Modern Web Engineering & Digital Business.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              One idea. One blog. One step forward. 💜 Welcome to my personal digital platform where I dissect real-world software architecture, generative AI workflows, and solopreneur strategies with complete honesty.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onReadPost(featuredPost)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-950 hover:bg-purple-700 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
              >
                <span>Read Featured Essay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewJourney}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>Discover My Journey</span>
              </button>

              <button
                onClick={onWritePost}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-purple-700 hover:text-purple-900 transition-colors whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Blog Studio</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Container (Featured Article Card) */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              onClick={() => onReadPost(featuredPost)}
              className="group cursor-pointer flex-1 flex flex-col bg-slate-50 border border-slate-200/90 rounded-2xl overflow-hidden hover:border-purple-300 hover:shadow-md transition-all"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-200">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-mono-code uppercase tracking-wider text-purple-200">
                    Featured Deep Dive
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-medium text-purple-700">{featuredPost.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredPost.publishedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredPost.readTimeMinutes} min read</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors mb-2 line-clamp-2">
                    {featuredPost.title}
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-medium text-slate-700">{featuredPost.author.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-purple-600 fill-purple-100" />
                      <span className="tabular-nums">{featuredPost.claps}</span>
                    </span>
                    <span className="text-purple-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI / Proof Strip below the split */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="text-2xl lg:text-3xl font-bold text-slate-900 font-editorial tabular-nums">
              100%
            </div>
            <div className="text-xs text-slate-500 mt-1">Independent & Self-Taught Craftsman</div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-bold text-slate-900 font-editorial tabular-nums">
              5+ Core
            </div>
            <div className="text-xs text-slate-500 mt-1">Foundational Tech & AI Essays</div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-bold text-slate-900 font-editorial tabular-nums">
              4 Pillars
            </div>
            <div className="text-xs text-slate-500 mt-1">AI, Engineering, Business, Journey</div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-bold text-slate-900 font-editorial tabular-nums">
              Gemini 3.8
            </div>
            <div className="text-xs text-slate-500 mt-1">AI-Assisted Writing & Outlining</div>
          </div>
        </div>
      </div>
    </section>
  );
};
