import React, { useState } from 'react';
import { APPROACH_STEPS } from '../data/methodology';
import { Compass, Cpu, ShieldCheck, Rocket, Check, ArrowRight, Clock, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface ApproachProps {
  onOpenConsultation: () => void;
}

export const Approach: React.FC<ApproachProps> = ({ onOpenConsultation }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const activeStep = APPROACH_STEPS[activeStepIndex];

  return (
    <section id="approach" className="py-24 bg-white border-t border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B35] mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
            Our Deployment Methodology
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A192F] tracking-tight leading-[1.1]">
            From roadmap to production in{' '}
            <span className="font-serif-editorial italic font-normal text-[#FF6B35]">
              12 weeks.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We operate as an embedded enterprise AI engineering force, walking non-profit leadership through each milestone with uncompromising security, rigorous evaluation, and sustainable handoff.
          </p>
        </div>

        {/* Step Navigation Pill Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {APPROACH_STEPS.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-md'
                    : 'bg-[#FAF9F6] text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? 'text-[#FF6B35]' : 'text-slate-400'
                    }`}
                  >
                    Phase {step.number}
                  </span>
                  <span
                    className={`p-1.5 rounded-lg ${
                      isSelected ? 'bg-white/10 text-white' : 'bg-slate-200/60 text-slate-600'
                    }`}
                  >
                    {getStepIcon(step.iconName)}
                  </span>
                </div>
                <div className="text-sm font-bold tracking-tight line-clamp-1">
                  {step.title}
                </div>
                <div
                  className={`text-[11px] font-mono mt-1 ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {step.timeframe}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Container */}
        <motion.div
          key={activeStepIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8 sm:p-12 rounded-2xl bg-[#FAF9F6] border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Description & Subtitle */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200 text-xs font-mono font-bold text-slate-700">
              <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Target Duration: {activeStep.timeframe}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] tracking-tight">
              {activeStep.title}
            </h3>

            <p className="text-base text-[#FF6B35] font-semibold">
              {activeStep.subtitle}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {activeStep.description}
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A192F] text-white text-xs font-bold hover:bg-[#162B4D] transition-colors cursor-pointer"
              >
                <span>Initiate Stage {activeStep.number} for Your Mission</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF6B35]" />
              </button>
            </div>
          </div>

          {/* Right Column: Key Deliverables Checklist */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#FF6B35]" />
              Phase {activeStep.number} Verified Deliverables
            </h4>

            <ul className="space-y-3">
              {activeStep.deliverables.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed pb-3 border-b border-slate-100 last:border-0 last:pb-0"
                >
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF6B35] flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
