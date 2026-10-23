import React, { useState, useEffect } from 'react';
import { BlogPost, Comment } from '../types/blog';
import { 
  ArrowLeft, 
  Bookmark, 
  Heart, 
  Share2, 
  Check, 
  Twitter, 
  Linkedin, 
  Copy, 
  MessageSquare, 
  Clock, 
  Sparkles,
  Type
} from 'lucide-react';

interface ArticleViewProps {
  post: BlogPost;
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
  relatedPosts: BlogPost[];
  isBookmarked: boolean;
  onToggleBookmark: (postId: string) => void;
  onClap: (postId: string) => void;
  onViewJourney: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  post,
  onBack,
  onSelectPost,
  relatedPosts,
  isBookmarked,
  onToggleBookmark,
  onClap,
  onViewJourney,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'compact'>('normal');
  const [userClaps, setUserClaps] = useState(0);

  // Local comments state for this post
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem(`comments_${post.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: 'c1',
        postId: post.id,
        authorName: 'Alex Rivera',
        content: 'Spot on perspective. The verification layer is really where true senior engineers stand out now that anyone can prompt boilerplate.',
        createdAt: '2 days ago',
        likes: 12,
      },
      {
        id: 'c2',
        postId: post.id,
        authorName: 'Fatima Zahra',
        content: 'Loved the quote: "One idea. One blog. One step forward." Starting my own technical writing journey thanks to this post, Zubair!',
        createdAt: 'Yesterday',
        likes: 7,
      },
    ];
  });

  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem(`comments_${post.id}`, JSON.stringify(comments));
  }, [comments, post.id]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShareCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !newCommentName.trim()) return;

    const newComment: Comment = {
      id: `comm_${Date.now()}`,
      postId: post.id,
      authorName: newCommentName.trim(),
      content: newCommentText.trim(),
      createdAt: 'Just now',
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setNewCommentName('');
    setNewCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  const handleClapClick = () => {
    onClap(post.id);
    setUserClaps((prev) => prev + 1);
  };

  // Simple clean markdown parser for rendering article content nicely
  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-2xl sm:text-3xl font-bold text-slate-950 mt-8 mb-4 font-editorial">
            {trimmed.slice(2)}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3 font-editorial pt-4 border-t border-slate-100">
            {trimmed.slice(3)}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-lg sm:text-xl font-semibold text-slate-900 mt-6 mb-2 font-editorial">
            {trimmed.slice(4)}
          </h3>
        );
      } else if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="my-6 pl-4 border-l-2 border-purple-500 italic text-slate-700 bg-purple-50/40 py-3 pr-4 rounded-r-lg">
            {trimmed.slice(2)}
          </blockquote>
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        elements.push(
          <li key={index} className="ml-5 list-disc text-slate-700 my-1">
            {trimmed.slice(2)}
          </li>
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        elements.push(
          <li key={index} className="ml-5 list-decimal text-slate-700 my-1">
            {trimmed.replace(/^\d+\.\s/, '')}
          </li>
        );
      } else if (trimmed.startsWith('---')) {
        elements.push(<hr key={index} className="my-8 border-slate-200" />);
      } else if (trimmed.length === 0) {
        elements.push(<div key={index} className="h-3" />);
      } else {
        // regular paragraph
        elements.push(
          <p key={index} className="text-slate-700 leading-relaxed my-3">
            {trimmed}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Pinned Reading Progress Bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-slate-100 z-30">
        <div
          className="h-full bg-purple-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Reading Navigation Bar */}
      <div className="border-b border-slate-100 bg-white/80 backdrop-blur sticky top-16 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-700 hover:text-purple-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Articles</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Font Size Adjuster */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md">
              <button
                onClick={() => setFontSize('compact')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  fontSize === 'compact' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Compact font"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  fontSize === 'normal' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Normal font"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  fontSize === 'large' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Large font"
              >
                A+
              </button>
            </div>

            <button
              onClick={() => onToggleBookmark(post.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'border-purple-600 bg-purple-50 text-purple-700'
                  : 'border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark this article'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShareCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        {/* Unboxed Metadata (Zero-Pill Rule) */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <span className="font-semibold text-purple-700 uppercase tracking-wide font-mono-code">
            {post.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>{post.publishedAt}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{post.readTimeMinutes} min read</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 font-editorial mb-6 leading-[1.18] text-balance">
          {post.title}
        </h1>

        {/* Lead Excerpt */}
        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal mb-8 border-b border-slate-100 pb-8">
          {post.excerpt}
        </p>

        {/* Author Info Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div>
              <div className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                <span>{post.author.name}</span>
                <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded font-mono-code">
                  Author
                </span>
              </div>
              <div className="text-xs text-slate-500">{post.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClapClick}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-xs font-semibold"
            >
              <Heart className="w-4 h-4 fill-purple-600 text-purple-600" />
              <span className="tabular-nums">{post.claps}</span>
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 bg-slate-100 border border-slate-200">
          <img
            src={post.coverImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div
          className={`prose prose-slate max-w-none transition-all ${
            fontSize === 'compact'
              ? 'text-sm'
              : fontSize === 'large'
              ? 'text-lg sm:text-xl'
              : 'text-base sm:text-lg'
          }`}
        >
          {renderMarkdown(post.content)}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-mono-code uppercase mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Reaction & Claps Bar */}
        <div className="mt-10 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Did you find this essay valuable?</h4>
            <p className="text-xs text-slate-500">
              Support independent technical writing. Leave a clap or share with fellow builders.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClapClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Clap ({post.claps})</span>
            </button>
            <button
              onClick={handleShareCopy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs transition-colors"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Author Bio Section */}
        <div className="mt-12 p-8 border border-slate-200/90 rounded-2xl bg-white shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-100 shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-slate-900 font-editorial">
                  Written by {post.author.name}
                </h3>
                <button
                  onClick={onViewJourney}
                  className="text-xs text-purple-700 hover:text-purple-900 font-medium"
                >
                  View My Journey →
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {post.author.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Reader Comments Section */}
        <section className="mt-14 pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 font-editorial flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              <span>Reader Discussion ({comments.length})</span>
            </h3>
          </div>

          {/* New Comment Box */}
          <form onSubmit={handleAddComment} className="mb-10 bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 font-mono-code">
              Leave a Thoughtful Comment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Your Name (e.g., Sarah Chen)"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                required
                className="text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-purple-600 text-slate-900"
              />
            </div>
            <textarea
              placeholder="What are your thoughts on this topic? Share your experience, ask a question, or add a perspective..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              required
              rows={3}
              className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-purple-600 text-slate-900 mb-3"
            />
            <div className="flex items-center justify-between">
              {commentSuccess && (
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Comment published!
                </span>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-950 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 rounded-xl border border-slate-200/80 bg-white">
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-[10px]">
                      {comment.authorName.charAt(0)}
                    </div>
                    <span className="font-semibold text-slate-900">{comment.authorName}</span>
                  </div>
                  <span className="text-slate-400">{comment.createdAt}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                  {comment.content}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className="flex items-center gap-1 hover:text-purple-700 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span className="tabular-nums">{comment.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 font-editorial mb-6">
              Continue Reading
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.slice(0, 2).map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    onSelectPost(rel);
                  }}
                  className="group cursor-pointer p-5 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-sm bg-slate-50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                      <span className="text-purple-700 font-medium">{rel.category}</span>
                      <span>·</span>
                      <span>{rel.readTimeMinutes} min read</span>
                    </div>
                    <h4 className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors text-base mb-2 line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-xs text-purple-700 font-medium flex items-center justify-between">
                    <span>Read Article</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
