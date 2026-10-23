import React from 'react';
import { BlogPost } from '../types/blog';
import { X, Bookmark, ArrowRight, Trash2, Download, Upload } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedPosts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onRemoveBookmark: (postId: string) => void;
  onExportPosts: () => void;
  onImportPosts: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedPosts,
  onSelectPost,
  onRemoveBookmark,
  onExportPosts,
  onImportPosts,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-purple-600 fill-purple-100" />
              <h2 className="text-lg font-bold text-slate-900 font-editorial">
                Saved Reading List
              </h2>
              <span className="text-xs text-slate-500 font-mono-code tabular-nums">
                ({bookmarkedPosts.length})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Bookmarks List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {bookmarkedPosts.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Bookmark className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium text-slate-700">No saved articles yet</p>
                <p className="text-xs text-slate-500 mt-1">
                  Click the bookmark icon on any article to save it for reading later.
                </p>
              </div>
            ) : (
              bookmarkedPosts.map((post) => (
                <div
                  key={post.id}
                  className="group relative bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-purple-300 hover:bg-purple-50/20 transition-all"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-purple-700">{post.category}</span>
                    <span>{post.readTimeMinutes} min read</span>
                  </div>

                  <h4 
                    onClick={() => {
                      onSelectPost(post);
                      onClose();
                    }}
                    className="font-bold text-slate-900 text-sm group-hover:text-purple-700 transition-colors cursor-pointer line-clamp-2 mb-2"
                  >
                    {post.title}
                  </h4>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <span className="text-slate-400 text-[11px]">{post.publishedAt}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRemoveBookmark(post.id)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove from reading list"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onSelectPost(post);
                          onClose();
                        }}
                        className="text-purple-700 font-semibold flex items-center gap-1 hover:underline"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Backup & Data Actions Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 font-mono-code mb-1">
              Data Management
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={onExportPosts}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
              <label className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 font-medium cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Import JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={onImportPosts}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
