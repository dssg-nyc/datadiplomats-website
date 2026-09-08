import React from 'react';
import { CaseStudy } from '../types';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Layers, FileText, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onOpenConsultation,
}) => {
  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="bg-[#0A192F] text-white p-6 sm:p-8 flex items-start justify-between relative">
            <div className="pr-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/15 px-2.5 py-0.5 rounded">
                  {caseStudy.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {caseStudy.client}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {caseStudy.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal">
                {caseStudy.tagline}
              </p>
            </div>
            
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-hidden"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-slate-100">
            
            {/* Impact Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-2">
              {caseStudy.metrics.map((metric, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-sans">
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1">
                    {metric.label}
                  </div>
                  {metric.sublabel && (
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {metric.sublabel}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Challenge & Solution Breakdown */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                  The Mission Challenge
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {caseStudy.challenge}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B35] mb-2">
                  Our Frontier AI Solution
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            {/* System Architecture Flow */}
            <div className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-[#FF6B35]" />
                <h4 className="text-sm font-bold text-[#0A192F] uppercase tracking-wide">
                  Deployed System Architecture
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {caseStudy.architectureSteps.map((step, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#FAF9F6] border border-slate-200 relative flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF6B35] bg-orange-50 px-2 py-0.5 rounded inline-block mb-2">
                        {step.badge}
                      </span>
                      <h5 className="font-bold text-sm text-[#0A192F] mb-1.5">
                        {step.title}
                      </h5>
                      <p className="text-xs text-slate-600 leading-normal">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Outcomes */}
            <div className="pt-6">
              <h4 className="text-sm font-bold text-[#0A192F] uppercase tracking-wide mb-3">
                Measurable Mission Outcomes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseStudy.results.map((res, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-800 font-medium leading-relaxed">
                      {res}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ethical Safeguards & Tech Stack */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#FF6B35]" />
                  <h4 className="text-xs font-bold text-[#0A192F] uppercase tracking-wider">
                    Ethical Safeguards & Privacy
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {caseStudy.ethicalSafeguards.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#FF6B35] font-bold">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#0A192F] uppercase tracking-wider mb-2">
                  Core Engineering Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {caseStudy.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote if available */}
            {caseStudy.quote && (
              <div className="pt-6">
                <div className="p-5 rounded-xl bg-slate-50 border-l-4 border-[#FF6B35] relative">
                  <Quote className="w-6 h-6 text-slate-300 absolute top-4 right-4" />
                  <p className="text-sm italic text-slate-800 font-serif leading-relaxed mb-3">
                    "{caseStudy.quote.text}"
                  </p>
                  <div className="text-xs">
                    <span className="font-bold text-[#0A192F]">{caseStudy.quote.author}</span>
                    <span className="text-slate-500"> — {caseStudy.quote.role}, {caseStudy.quote.organization}</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500 font-medium">
              Want a similar system architected for your non-profit?
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors w-full sm:w-auto"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-[#0A192F] text-white hover:bg-[#162B4D] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Request AI Roadmap Session</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF6B35]" />
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
