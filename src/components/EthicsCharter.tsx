import React, { useState } from 'react';
import { ETHICAL_PILLARS } from '../data/methodology';
import { ShieldCheck, Lock, EyeOff, UserCheck, CheckCircle2, XCircle, FileCode, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export const EthicsCharter: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const commitments = [
    {
      do: 'Air-gap and redact all beneficiary PII before any model inference.',
      dont: 'Never allow beneficiary data to be retained or used for public training.'
    },
    {
      do: 'Require human-in-the-loop sign-off for critical aid determinations.',
      dont: 'Never deploy automated black-box eligibility rejections or denials.'
    },
    {
      do: 'Red-team all models for multilingual and demographic equity.',
      dont: 'Never deploy unverified models that could amplify socioeconomic bias.'
    },
    {
      do: 'Hand over 100% code ownership, documentation, and training to non-profit staff.',
      dont: 'Never lock charities into proprietary, vendor-dependent monthly fees.'
    }
  ];

  return (
    <section id="ethics" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B35] mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#FF6B35]" />
            Ethical AI & Beneficiary Privacy Charter
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A192F] tracking-tight leading-[1.1]">
            Innovation without{' '}
            <span className="font-serif-editorial italic font-normal text-[#FF6B35]">
              compromise.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            When deploying artificial intelligence for vulnerable communities, ethical rigor is not a checklist—it is the foundational architecture.
          </p>
        </div>

        {/* 4 Ethical Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {ETHICAL_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#FAF9F6] border border-slate-200/80 hover:border-[#FF6B35]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B35] bg-orange-100/70 px-2.5 py-1 rounded">
                    {pillar.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    Pillar 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0A192F] mb-2">
                  {pillar.title}
                </h3>

                <p className="text-sm font-semibold text-slate-800 mb-3">
                  "{pillar.principle}"
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.implementation}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* The Non-Profit AI Standard: We Do vs. We NEVER Do Table */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0A192F] text-white">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B35]">
              Governance Verification
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              The Data Diplomats Civic Standards
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What We Commit To */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4" /> What We Build & Enforce
              </div>
              {commitments.map((c, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{c.do}</span>
                </div>
              ))}
            </div>

            {/* What We Explicitly Reject */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-rose-400 flex items-center gap-1.5 mb-2">
                <XCircle className="w-4 h-4" /> What We Strictly Forbid
              </div>
              {commitments.map((c, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                >
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{c.dont}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
