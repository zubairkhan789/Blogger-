import React from 'react';
import { BlogPost } from '../types/blog';
import { Bookmark, Heart, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  onReadPost: (post: BlogPost) => void;
  isBookmarked: boolean;
  onToggleBookmark: (postId: string, e: React.MouseEvent) => void;
  onClap: (postId: string, e: React.MouseEvent) => void;
  onEditPost?: (post: BlogPost, e: React.MouseEvent) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  onReadPost,
  isBookmarked,
  onToggleBookmark,
  onClap,
  onEditPost,
}) => {
  return (
    <article
      onClick={() => onReadPost(post)}
      className="group cursor-pointer flex flex-col bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={post.coverImage}
          alt={post.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Styled graceful fallback
            (e.target as HTMLElement).style.display = 'none';
          }}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />

        {/* Quick action buttons on hover */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => onToggleBookmark(post.id, e)}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              isBookmarked
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white/90 text-slate-700 hover:bg-white hover:text-purple-700'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark for later'}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark for later'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {post.status === 'draft' && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono-code">
            Draft
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean unboxed metadata with dot separators (Zero-Pill Rule) */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
            <span className="font-semibold text-purple-700">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{post.readTimeMinutes} min read</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors mb-2.5 line-clamp-2 leading-snug">
            {post.title}
          </h3>

          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="font-medium text-slate-700 truncate max-w-[120px]">
              {post.author.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={(e) => onClap(post.id, e)}
              className="flex items-center gap-1 text-slate-500 hover:text-purple-700 p-1 -m-1 transition-colors"
              title="Clap for this post"
            >
              <Heart className="w-3.5 h-3.5 text-purple-600 fill-purple-100" />
              <span className="tabular-nums font-medium">{post.claps}</span>
            </button>

            {onEditPost && (
              <button
                onClick={(e) => onEditPost(post, e)}
                className="text-slate-400 hover:text-slate-700 transition-colors font-medium text-[11px]"
              >
                Edit
              </button>
            )}

            <span className="text-purple-700 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              Read <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
