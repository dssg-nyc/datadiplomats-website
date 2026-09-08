import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Cpu, Sparkles, CheckCircle2, ChevronRight, BarChart3 } from 'lucide-react';
import { TRUST_STATS } from '../data/methodology';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreWork: () => void;
  onExploreSandbox: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultation,
  onExploreWork,
  onExploreSandbox,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-32 bg-[#FAF9F6]">
      {/* Background Subtle Gradient & Grid Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-radial-gradient pointer-events-none" />

      {/* Floating Decorative Civic Nodes */}
      <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full bg-[#FF6B35]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-[#0A192F]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Eyebrow Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs mb-6 sm:mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#FF6B35] animate-pulse" />
            <span className="text-xs font-semibold text-slate-700 tracking-tight">
              The Ode of Nonprofits · Frontier AI for Social Impact
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-mono font-bold text-[#FF6B35]">501(c)(3)</span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0A192F] tracking-tight leading-[1.08] mb-6"
          >
            Frontier AI, deployed for{' '}
            <span className="font-serif-editorial italic font-normal text-[#FF6B35] font-serif pr-1">
              social good.
            </span>
          </motion.h1>

          {/* Subtitle / Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mb-10"
          >
            Data Diplomats is the mission-first enterprise AI firm partnering with charities, NGOs, and foundations to move frontier intelligence from isolated experiments to secure, production-grade systems.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14"
          >
            <button
              type="button"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0A192F] text-white font-semibold hover:bg-[#162B4D] active:scale-98 transition-all shadow-md group cursor-pointer"
            >
              <span>Accelerate Your AI Roadmap</span>
              <ArrowRight className="w-4 h-4 text-[#FF6B35] transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={onExploreSandbox}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white text-slate-800 font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-xs cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span>Interactive AI Blueprint Sandbox</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onExploreWork}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 text-slate-600 hover:text-[#0A192F] font-semibold transition-colors cursor-pointer"
            >
              <span>View Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Social Proof & Guarantees Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs font-semibold text-slate-500 mb-12"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero Beneficiary Data Retention</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Subsidized & Pro Bono Tier</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Direct Frontier Model Lab Access</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Code Ownership for Nonprofits</span>
            </div>
          </motion.div>

        </div>

        {/* Interactive Stats Counter Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs"
        >
          {TRUST_STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col p-3 ${
                idx < TRUST_STATS.length - 1 ? 'md:border-r md:border-slate-100' : ''
              }`}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A192F] tracking-tight font-sans">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                {stat.change}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
