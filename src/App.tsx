import React, { useState, useEffect, useMemo } from 'react';
import { BlogPost, BlogCategory } from './types/blog';
import { INITIAL_POSTS, CATEGORIES_LIST } from './data/initialPosts';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { BlogCard } from './components/BlogCard';
import { ArticleView } from './components/ArticleView';
import { BlogEditor } from './components/BlogEditor';
import { AboutJourney } from './components/AboutJourney';
import { CategoriesView } from './components/CategoriesView';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { PenSquare, Sparkles, FilterX } from 'lucide-react';

export default function App() {
  // Persistent Posts State
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('zubair_posts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved posts, using initial defaults');
      }
    }
    return INITIAL_POSTS;
  });

  // Persistent Bookmarks State
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('zubair_bookmarks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ['post-1'];
      }
    }
    return ['post-1'];
  });

  // Navigation and View state
  const [activeTab, setActiveTab] = useState<'articles' | 'categories' | 'journey' | 'write'>('articles');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Filter and Search state
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'readTime'>('latest');

  // Save posts to localStorage
  useEffect(() => {
    localStorage.setItem('zubair_posts', JSON.stringify(posts));
  }, [posts]);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('zubair_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Handlers
  const handleReadPost = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToArticles = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const handleClap = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, claps: p.claps + 1 } : p))
    );
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => (prev ? { ...prev, claps: prev.claps + 1 } : null));
    }
  };

  const handleOpenNewPost = () => {
    setEditingPost(null);
    setSelectedPost(null);
    setActiveTab('write');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditPost = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPost(post);
    setSelectedPost(null);
    setActiveTab('write');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePost = (savedPost: BlogPost) => {
    setPosts((prev) => {
      const exists = prev.some((p) => p.id === savedPost.id);
      if (exists) {
        return prev.map((p) => (p.id === savedPost.id ? savedPost : p));
      }
      return [savedPost, ...prev];
    });
    setEditingPost(null);
    setSelectedPost(savedPost);
    setActiveTab('articles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    setBookmarkedIds((prev) => prev.filter((id) => id !== postId));
    setEditingPost(null);
    setSelectedPost(null);
    setActiveTab('articles');
  };

  // Export posts as JSON backup
  const handleExportPosts = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(posts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `zubair_websitewala_posts_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import posts from JSON file
  const handleImportPosts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPosts(parsed);
          alert(`Successfully imported ${parsed.length} posts!`);
        } else {
          alert('Invalid JSON format for posts.');
        }
      } catch (err) {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        // Category filter
        if (selectedCategory !== 'All' && post.category !== selectedCategory) {
          return false;
        }

        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = post.title.toLowerCase().includes(q);
          const matchExcerpt = post.excerpt.toLowerCase().includes(q);
          const matchTags = post.tags.some((t) => t.toLowerCase().includes(q));
          const matchCategory = post.category.toLowerCase().includes(q);
          if (!matchTitle && !matchExcerpt && !matchTags && !matchCategory) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') {
          return b.claps - a.claps;
        }
        if (sortBy === 'readTime') {
          return a.readTimeMinutes - b.readTimeMinutes;
        }
        // Default latest: preserve array order or published date
        return 0;
      });
  }, [posts, selectedCategory, searchQuery, sortBy]);

  // Featured post is the first featured or first post
  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  // Bookmarked blog objects
  const bookmarkedPosts = useMemo(() => {
    return posts.filter((p) => bookmarkedIds.includes(p.id));
  }, [posts, bookmarkedIds]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedPost(null);
          setEditingPost(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onNewPost={handleOpenNewPost}
      />

      {/* Main Content View Switcher */}
      <div className="flex-1">
        {selectedPost ? (
          <ArticleView
            post={selectedPost}
            onBack={handleBackToArticles}
            onSelectPost={handleReadPost}
            relatedPosts={posts.filter((p) => p.id !== selectedPost.id && p.category === selectedPost.category)}
            isBookmarked={bookmarkedIds.includes(selectedPost.id)}
            onToggleBookmark={(id) => handleToggleBookmark(id)}
            onClap={(id) => handleClap(id)}
            onViewJourney={() => {
              setSelectedPost(null);
              setActiveTab('journey');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeTab === 'write' ? (
          <BlogEditor
            initialPost={editingPost}
            onSave={handleSavePost}
            onCancel={() => {
              setActiveTab('articles');
              setEditingPost(null);
            }}
            onDelete={handleDeletePost}
          />
        ) : activeTab === 'journey' ? (
          <AboutJourney onWritePost={handleOpenNewPost} />
        ) : activeTab === 'categories' ? (
          <CategoriesView
            posts={posts}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setActiveTab('articles');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReadPost={handleReadPost}
          />
        ) : (
          /* Articles Main View */
          <div>
            {/* Show Hero only when not actively searching and on 'All' category */}
            {!searchQuery && selectedCategory === 'All' && featuredPost && (
              <HeroSection
                featuredPost={featuredPost}
                onReadPost={handleReadPost}
                onExploreCategories={() => {
                  setActiveTab('categories');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onViewJourney={() => {
                  setActiveTab('journey');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onWritePost={handleOpenNewPost}
              />
            )}

            {/* Articles List Container */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 font-editorial tracking-tight">
                    {selectedCategory === 'All' ? 'All Published Articles' : selectedCategory}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Carefully crafted essays on artificial intelligence, software engineering, and business architecture.
                  </p>
                </div>
              </div>

              {/* Category Filter and Search Toolbar */}
              <CategoryFilterBar
                categories={CATEGORIES_LIST}
                activeCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                totalFilteredPosts={filteredPosts.length}
              />

              {/* Blog Posts Grid */}
              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl p-8 my-6">
                  <FilterX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-800 font-editorial mb-1">
                    No articles found matching your criteria
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                    Try clearing your search query or switching to another category.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Reset All Filters
                    </button>
                    <button
                      onClick={handleOpenNewPost}
                      className="px-4 py-2 text-xs font-semibold text-white bg-slate-950 hover:bg-purple-700 rounded-lg transition-colors"
                    >
                      Write This Article
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 my-6">
                  {filteredPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      onReadPost={handleReadPost}
                      isBookmarked={bookmarkedIds.includes(post.id)}
                      onToggleBookmark={handleToggleBookmark}
                      onClap={handleClap}
                      onEditPost={handleEditPost}
                    />
                  ))}
                </div>
              )}
            </main>

            {/* Newsletter Section */}
            <NewsletterSection />
          </div>
        )}
      </div>

      {/* Bookmarks Drawer Modal */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedPosts={bookmarkedPosts}
        onSelectPost={handleReadPost}
        onRemoveBookmark={(id) => handleToggleBookmark(id)}
        onExportPosts={handleExportPosts}
        onImportPosts={handleImportPosts}
      />

      {/* Editorial Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveTab('articles');
          setSelectedPost(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setSelectedPost(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
