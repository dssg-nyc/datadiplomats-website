import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/caseStudies';
import { CaseStudy } from '../types';
import { CaseStudyModal } from './CaseStudyModal';
import { ArrowRight, Layers, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { motion } from 'motion/react';

interface CaseStudiesProps {
  onOpenConsultation: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  const categories = [
    'All',
    'Food Security',
    'Legal Aid',
    'Emergency Aid',
    'Fundraising',
    'Public Health'
  ];

  const filteredStudies = selectedCategory === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.category === selectedCategory);

  return (
    <section id="our-work" className="py-24 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B35] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
              Our Work & Realized Outcomes
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A192F] tracking-tight leading-[1.1]">
              Frontier AI deployed in the{' '}
              <span className="font-serif-editorial italic font-normal text-[#FF6B35]">
                real world.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              We partner with charities, legal collectives, and humanitarian coalitions to design, build, and deploy production AI systems with measurable human impact.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              {CASE_STUDIES.length} Verified Social Impact Systems Deployed
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0A192F] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-[#0A192F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#FF6B35]/40"
            >
              <div className="p-6 sm:p-8">
                {/* Meta Top Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/10 px-2.5 py-1 rounded">
                    {study.category}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold truncate max-w-[200px]">
                    {study.client}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#0A192F] tracking-tight mb-3 group-hover:text-[#FF6B35] transition-colors leading-snug">
                  {study.title}
                </h3>

                {/* Tagline Summary */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {study.tagline}
                </p>

                {/* High-Impact Metric Highlight Cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {study.metrics.slice(0, 2).map((m, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#FAF9F6] border border-slate-100">
                      <div className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-sans">
                        {m.value}
                      </div>
                      <div className="text-xs font-bold text-slate-700 mt-0.5">
                        {m.label}
                      </div>
                      {m.sublabel && (
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {m.sublabel}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* System Architecture Preview Pills */}
                <div className="mb-4">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Core AI Architecture
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {study.techStack.slice(0, 3).map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-700 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                    {study.techStack.length > 3 && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-50 text-slate-600 font-medium">
                        +{study.techStack.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="px-6 sm:px-8 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModalStudy(study)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A192F] group-hover:text-[#FF6B35] transition-colors cursor-pointer"
                >
                  <span>Explore Architecture & Deep Dive</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  Live in Production
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner for Custom Inquiries */}
        <div className="mt-14 p-8 rounded-2xl bg-[#0A192F] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-mono font-bold text-[#FF6B35] uppercase tracking-wider">
              Bespoke Non-Profit Engineering
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Have a unique operational bottleneck in your mission?
            </h4>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              We design custom frontier AI systems for charities of all sizes. All solutions include our 100% zero beneficiary data retention guarantee.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenConsultation}
            className="shrink-0 px-6 py-3.5 rounded-full bg-[#FF6B35] text-white text-xs sm:text-sm font-bold hover:bg-[#E8551E] active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Request Pro Bono Scoping Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Deep Dive Case Study Modal */}
      <CaseStudyModal
        caseStudy={activeModalStudy}
        onClose={() => setActiveModalStudy(null)}
        onOpenConsultation={onOpenConsultation}
      />
    </section>
  );
};
