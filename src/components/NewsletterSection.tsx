import React, { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    const current = JSON.parse(localStorage.getItem('zubair_subscribers') || '[]');
    if (!current.includes(email.trim().toLowerCase())) {
      current.push(email.trim().toLowerCase());
      localStorage.setItem('zubair_subscribers', JSON.stringify(current));
    }

    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs font-mono-code mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Weekly Tech & AI Dispatch</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial mb-3 tracking-tight">
          One Idea. Delivered Straight to Your Inbox.
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
          No automated spam. Just unfiltered breakdowns of emerging AI tools, full-stack architecture lessons, and behind-the-scenes building notes from Zubair WebsiteWala.
        </p>

        {subscribed ? (
          <div className="max-w-md mx-auto p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-medium flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Thank you for subscribing! You are now on the dispatch list.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2.5">
            <div className="relative w-full">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="Enter your personal email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shadow-sm"
            >
              Subscribe Free
            </button>
          </form>
        )}

        <div className="text-[11px] text-slate-500 mt-4">
          Unsubscribe anytime with 1 click · Privacy respected 100%
        </div>
      </div>
    </section>
  );
};
