import React, { useState } from 'react';
import { ZUBAIR_AUTHOR } from '../data/initialPosts';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Code2, 
  BrainCircuit, 
  Rocket, 
  Terminal,
  Heart,
  ExternalLink
} from 'lucide-react';

export const AboutJourney: React.FC<{ onWritePost: () => void }> = ({ onWritePost }) => {
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorMessage, setVisitorMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !visitorMessage) return;

    // Save message locally
    const existing = JSON.parse(localStorage.getItem('zubair_inquiries') || '[]');
    existing.push({
      id: Date.now(),
      name: visitorName,
      email: visitorEmail,
      message: visitorMessage,
      sentAt: new Date().toISOString(),
    });
    localStorage.setItem('zubair_inquiries', JSON.stringify(existing));

    setMessageSent(true);
    setVisitorName('');
    setVisitorEmail('');
    setVisitorMessage('');
    setTimeout(() => setMessageSent(false), 5000);
  };

  const milestones = [
    {
      year: '2020',
      title: 'The Spark & The First Lines of HTML',
      description: 'Started self-teaching web development on a battered dual-core laptop. Built ugly, broken websites, fell in love with turning blank screens into interactive layouts.',
      icon: Terminal,
    },
    {
      year: '2022',
      title: 'Full-Stack Engineering & Client Crafts',
      description: 'Mastered React, Node.js, and TypeScript. Shipped custom web portals and performance-optimized websites for local businesses under the "WebsiteWala" brand.',
      icon: Code2,
    },
    {
      year: '2024',
      title: 'The Generative AI Turning Point',
      description: 'Deep dived into multimodal AI, prompt orchestration, and intelligent backend architectures. Discovered how small teams and solopreneurs can build with 10x leverage.',
      icon: BrainCircuit,
    },
    {
      year: '2026',
      title: 'Zubair WebsiteWala Platform',
      description: 'Launched this personal blogging and publication platform to share lessons, explore cutting-edge AI, analyze tech businesses, and empower fellow builders worldwide.',
      icon: Rocket,
    },
  ];

  const tools = [
    { name: 'TypeScript & React', category: 'Frontend Architecture' },
    { name: 'Gemini 3.8 & Multimodal SDKs', category: 'Artificial Intelligence' },
    { name: 'Tailwind CSS & Motion', category: 'Styling & Micro-interactions' },
    { name: 'Express & Node.js', category: 'Server Runtimes' },
    { name: 'Zero-Pill Typography', category: 'Editorial Design Philosophy' },
    { name: 'Server-Authoritative State', category: 'Resilience & Security' },
  ];

  return (
    <div className="min-h-screen bg-white py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Bio Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-slate-200">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-100">
                <img
                  src={ZUBAIR_AUTHOR.avatar}
                  alt={ZUBAIR_AUTHOR.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-white border border-slate-200 rounded-2xl p-2.5 shadow-md flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold text-slate-800 font-mono-code">
                  Building & Writing
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="text-xs font-semibold text-purple-700 tracking-wider uppercase font-mono-code mb-2">
              About the Creator
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-950 font-editorial mb-3">
              Zubair WebsiteWala
            </h1>
            <p className="text-base font-medium text-slate-700 mb-4">
              Web Architect, AI Explorer & Independent Craftsman
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Hi, I'm Zubair! I build websites that solve real problems, explore the cutting edges of artificial intelligence, and write openly about technology, business strategy, and personal growth.
            </p>
            <div className="p-4 bg-purple-50/70 border border-purple-100 rounded-xl">
              <p className="text-xs sm:text-sm font-semibold text-purple-900 italic flex items-center gap-2">
                <Heart className="w-4 h-4 fill-purple-600 text-purple-600 shrink-0" />
                <span>"One idea. One blog. One step forward. 💜"</span>
              </p>
            </div>
          </div>
        </div>

        {/* The Manifesto / Philosophy */}
        <section className="py-12 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 font-editorial mb-4">
            Why I Built Zubair WebsiteWala
          </h2>
          <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              The modern web is filled with derivative content, automated junk, and bloated templates that treat readers as conversion statistics. I built this digital space as an antidote to that trend.
            </p>
            <p>
              Every post on this platform is guided by three non-negotiables:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                <strong>Radical Honesty:</strong> We document what worked, what completely failed, and what the real numbers looked like. No vanity metrics.
              </li>
              <li>
                <strong>Craft & Restraint:</strong> Interfaces should respect human attention. No intrusive popups, no garish colored pills, no AI slop.
              </li>
              <li>
                <strong>Actionable Engineering:</strong> When we discuss AI, we don't just speak in abstract hype—we provide code patterns, architectural trade-offs, and verifiable benchmarks.
              </li>
            </ul>
          </div>
        </section>

        {/* Milestones Timeline */}
        <section className="py-12 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 font-editorial mb-8">
            My Journey in Tech & AI
          </h2>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200">
            {milestones.map((milestone) => {
              const Icon = milestone.icon;
              return (
                <div key={milestone.year} className="relative flex items-start gap-5 group">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-purple-600 text-purple-700 flex items-center justify-center shrink-0 z-10 shadow-xs group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-purple-300 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-purple-700 font-mono-code tabular-nums">
                        {milestone.year}
                      </span>
                      <span className="text-slate-300">·</span>
                      <h3 className="font-bold text-slate-900 text-sm">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tech Stack & Philosophy */}
        <section className="py-12 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 font-editorial mb-6">
            Stack & Standards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tools.map((t) => (
              <div
                key={t.name}
                className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.category}</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-purple-600" />
              </div>
            ))}
          </div>
        </section>

        {/* Connect & Direct Inquiry Form */}
        <section className="py-12">
          <div className="p-8 bg-slate-950 text-white rounded-3xl shadow-sm">
            <div className="max-w-xl">
              <h3 className="text-xl sm:text-2xl font-bold font-editorial mb-2">
                Have an idea, project, or question?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                Whether you want to discuss AI integration, web performance, collaborating on a digital product, or just say hello — send me a note.
              </p>

              {messageSent ? (
                <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Message delivered! Zubair will get back to you shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      required
                      className="text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    <input
                      type="email"
                      placeholder="Your Email (Optional)"
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      className="text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <textarea
                    placeholder="Your message or project details..."
                    value={visitorMessage}
                    onChange={(e) => setVisitorMessage(e.target.value)}
                    required
                    rows={3}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={onWritePost}
                      className="text-xs text-purple-400 hover:text-purple-300 font-medium"
                    >
                      Or open the AI Studio →
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send to Zubair</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
