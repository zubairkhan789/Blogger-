import React, { useState } from 'react';
import { BlogPost, BlogCategory } from '../types/blog';
import { ZUBAIR_AUTHOR } from '../data/initialPosts';
import { 
  ArrowLeft, 
  Sparkles, 
  Save, 
  Eye, 
  PenLine, 
  Trash2, 
  Loader2, 
  CheckCircle2, 
  Image as ImageIcon,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

interface BlogEditorProps {
  initialPost?: BlogPost | null;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
  onDelete?: (postId: string) => void;
}

const PRESET_COVERS = [
  { label: 'AI Future', url: '/src/assets/images/blog_hero_ai_future_1792741622976.jpg' },
  { label: 'Tech & Code', url: '/src/assets/images/blog_tech_coding_journey_1792741624256.jpg' },
  { label: 'Business Strategy', url: '/src/assets/images/blog_business_scaling_1792741624261.jpg' },
  { label: 'Author Portrait', url: '/src/assets/images/zubair_author_portrait_1792741621492.jpg' },
];

export const BlogEditor: React.FC<BlogEditorProps> = ({
  initialPost,
  onSave,
  onCancel,
  onDelete,
}) => {
  const isEditing = Boolean(initialPost);

  const [title, setTitle] = useState(initialPost?.title || '');
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [category, setCategory] = useState<Exclude<BlogCategory, 'All'>>(
    initialPost?.category || 'Artificial Intelligence'
  );
  const [coverImage, setCoverImage] = useState(
    initialPost?.coverImage || PRESET_COVERS[0].url
  );
  const [tagsInput, setTagsInput] = useState(
    initialPost ? initialPost.tags.join(', ') : 'AI, WebDev, Insights'
  );
  const [content, setContent] = useState(
    initialPost?.content || `# Enter Your Heading Here

Write your thoughts and experiences with total clarity. Markdown headings, quotes, and bullet points are fully supported.`
  );
  const [status, setStatus] = useState<'published' | 'draft'>(
    initialPost?.status || 'published'
  );

  // Tab: 'editor' | 'preview'
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // AI Co-Pilot State
  const [aiPromptTopic, setAiPromptTopic] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiActionType, setAiActionType] = useState<string | null>(null);

  // Calculate estimated read time: ~200 words per minute
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const handleAiAction = async (action: 'generate_draft' | 'improve_writing' | 'generate_titles' | 'summarize' | 'suggest_tags') => {
    setIsAiLoading(true);
    setAiError(null);
    setAiResult(null);
    setAiActionType(action);

    try {
      const response = await fetch('/api/ai/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          topic: aiPromptTopic || title || 'Modern AI and Technology',
          currentContent: content,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error('AI service failed to respond');
      }

      const data = await response.json();
      setAiResult(data.result);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Unable to generate AI assistance right now');
    } finally {
      setIsAiLoading(false);
    }
  };

  const applyAiResultToContent = () => {
    if (!aiResult) return;
    if (aiActionType === 'generate_draft') {
      setContent(aiResult);
      // Try to parse title if draft starts with #
      const lines = aiResult.split('\n');
      if (lines[0].startsWith('# ')) {
        setTitle(lines[0].slice(2).trim());
      }
    } else if (aiActionType === 'improve_writing') {
      setContent(aiResult);
    } else if (aiActionType === 'summarize') {
      setExcerpt(aiResult.slice(0, 280));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a title for your blog post.');
      return;
    }

    if (!content.trim()) {
      alert('Please write some content before publishing.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const postData: BlogPost = {
      id: initialPost?.id || `post_${Date.now()}`,
      title: title.trim(),
      slug: slug || `post-${Date.now()}`,
      excerpt: excerpt.trim() || content.slice(0, 160) + '...',
      content,
      category,
      coverImage: coverImage.trim() || PRESET_COVERS[0].url,
      author: initialPost?.author || ZUBAIR_AUTHOR,
      publishedAt: initialPost?.publishedAt || new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      readTimeMinutes,
      tags: tags.length > 0 ? tags : ['Technology', 'Insights'],
      claps: initialPost?.claps || 0,
      featured: initialPost?.featured || false,
      status,
    };

    onSave(postData);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="p-2 text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
              title="Cancel and go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-editorial">
                {isEditing ? 'Edit Blog Post' : 'Publish New Blog Post'}
              </h1>
              <p className="text-xs text-slate-500 font-mono-code">
                {isEditing ? `Post ID: ${initialPost?.id}` : 'Zubair WebsiteWala Studio'} · {wordCount} words · ~{readTimeMinutes} min read
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEditing && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to permanently delete this post?')) {
                    onDelete(initialPost!.id);
                  }
                }}
                className="p-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors text-xs flex items-center gap-1.5"
                title="Delete Post"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            )}

            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-5 py-2 bg-slate-950 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{status === 'published' ? 'Publish Post' : 'Save as Draft'}</span>
            </button>
          </div>
        </div>

        {/* AI Co-Pilot Accordion Banner */}
        <div className="mb-6 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-5 rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-purple-500/20 border border-purple-400/30 rounded-xl">
                <Sparkles className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight">
                  Gemini 3.8 AI Writing Co-Pilot
                </h3>
                <p className="text-xs text-purple-200/80">
                  Instant drafts, punchy titles, style improvements, and SEO tags powered by server-side Gemini.
                </p>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                disabled={isAiLoading}
                onClick={() => handleAiAction('generate_draft')}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Draft Full Article
              </button>
              <button
                type="button"
                disabled={isAiLoading}
                onClick={() => handleAiAction('improve_writing')}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Polish Writing
              </button>
              <button
                type="button"
                disabled={isAiLoading}
                onClick={() => handleAiAction('generate_titles')}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                5 Titles
              </button>
              <button
                type="button"
                disabled={isAiLoading}
                onClick={() => handleAiAction('summarize')}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Generate Summary
              </button>
            </div>
          </div>

          {/* AI Custom Topic input */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              placeholder="Custom topic or instruction for AI (e.g. 'Why Serverless TypeScript beats complex Kubernetes clusters')..."
              value={aiPromptTopic}
              onChange={(e) => setAiPromptTopic(e.target.value)}
              className="flex-1 text-xs px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-purple-200/50 focus:outline-none focus:bg-white/20"
            />
          </div>

          {/* AI Loading indicator */}
          {isAiLoading && (
            <div className="mt-4 p-3 bg-white/10 rounded-xl flex items-center gap-2 text-xs text-purple-200">
              <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
              <span>Gemini is generating editorial suggestions for you...</span>
            </div>
          )}

          {/* AI Result Card */}
          {aiResult && (
            <div className="mt-4 p-4 bg-slate-900/90 border border-purple-500/30 rounded-xl text-xs space-y-3">
              <div className="flex items-center justify-between text-purple-300 font-semibold font-mono-code">
                <span>AI Output ({aiActionType})</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={applyAiResultToContent}
                    className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-[11px] font-medium transition-colors"
                  >
                    Apply to Article
                  </button>
                  <button
                    onClick={() => setAiResult(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto whitespace-pre-wrap text-slate-200 font-sans leading-relaxed bg-black/30 p-3 rounded-lg border border-white/10">
                {aiResult}
              </div>
            </div>
          )}

          {aiError && (
            <div className="mt-3 text-xs text-rose-300">
              Error: {aiError}
            </div>
          )}
        </div>

        {/* Editor Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 font-mono-code">
                Article Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., The Future of Autonomous Web Engineering"
                required
                className="w-full text-lg sm:text-xl font-bold px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-600 focus:bg-white text-slate-900 transition-colors"
              />
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 font-mono-code">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-600 text-slate-900"
                >
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Technology & Coding">Technology & Coding</option>
                  <option value="Business & Strategy">Business & Strategy</option>
                  <option value="My Journey">My Journey</option>
                  <option value="Web Engineering">Web Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 font-mono-code">
                  Publishing Status
                </label>
                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl text-xs">
                  <button
                    type="button"
                    onClick={() => setStatus('published')}
                    className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                      status === 'published'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Published
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('draft')}
                    className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                      status === 'draft'
                        ? 'bg-white text-amber-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Draft Only
                  </button>
                </div>
              </div>
            </div>

            {/* Excerpt / Summary */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 font-mono-code">
                Hook / Excerpt (Displayed on Cards & Social Previews)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                placeholder="A compelling 1-2 sentence hook summarizing the core thesis..."
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-600 focus:bg-white text-slate-900"
              />
            </div>

            {/* Cover Image Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 font-mono-code">
                Cover Image
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                {PRESET_COVERS.map((preset) => (
                  <div
                    key={preset.url}
                    onClick={() => setCoverImage(preset.url)}
                    className={`relative cursor-pointer rounded-xl overflow-hidden border-2 aspect-video transition-all ${
                      coverImage === preset.url
                        ? 'border-purple-600 ring-2 ring-purple-200'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                      {preset.label}
                    </span>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Or paste any custom image URL..."
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-600 text-slate-900"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 font-mono-code">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. AI, React, Solopreneur, Architecture"
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-600 text-slate-900"
              />
            </div>

            {/* Content Editor with Write vs Preview Tabs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono-code">
                  Article Content (Markdown Supported)
                </label>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('editor')}
                    className={`flex items-center gap-1 px-3 py-1 rounded font-medium transition-colors ${
                      activeTab === 'editor'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <PenLine className="w-3.5 h-3.5" />
                    <span>Write</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center gap-1 px-3 py-1 rounded font-medium transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              {activeTab === 'editor' ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={16}
                  placeholder="Write in clean markdown: # Heading 1, ## Heading 2, > quotes, - lists, code snippets..."
                  className="w-full font-mono text-xs leading-relaxed px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-600 focus:bg-white text-slate-900"
                />
              ) : (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl min-h-[380px] prose prose-slate max-w-none text-xs leading-relaxed">
                  <div className="whitespace-pre-wrap">{content}</div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-slate-950 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Publish Article Now'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
