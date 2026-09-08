import React from 'react';
import { TEAM_MEMBERS, FAQS } from '../data/methodology';
import { Users, ChevronDown, Award, Globe, Building2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Leadership: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const partners = [
    { name: 'NYC DSSG', desc: 'Data Science for Social Good Alliance' },
    { name: 'Frontier AI Lab Alumni', desc: 'Anthropic & Google DeepMind Fellows' },
    { name: 'United Way NYC', desc: 'Civic Impact Partner' },
    { name: '501(c)(3) Collective', desc: 'Social Sector Advisory Council' }
  ];

  return (
    <section id="leadership" className="py-24 bg-[#FAF9F6] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B35] mb-2 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#FF6B35]" />
            People & Ecosystem
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A192F] tracking-tight leading-[1.1]">
            Led by seasoned AI engineers &{' '}
            <span className="font-serif-editorial italic font-normal text-[#FF6B35]">
              civic leaders.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Data Diplomats bridges the world’s most advanced research labs with the frontline realities of non-profit service delivery.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-[#FF6B35]/40 transition-colors"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 text-[#0A192F] font-extrabold flex items-center justify-center text-sm mb-4 font-mono">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>

                <h3 className="font-bold text-base text-[#0A192F]">
                  {member.name}
                </h3>
                <div className="text-xs font-semibold text-[#FF6B35] mt-0.5 mb-2">
                  {member.role}
                </div>

                <div className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded inline-block mb-3">
                  {member.formerOrg}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {member.bio}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                Focus: {member.focusArea}
              </div>
            </div>
          ))}
        </div>

        {/* Partner & Backing Ecosystem Strip */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs mb-20">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 text-center mb-6">
            Supported By Civic Tech Fellows, Alumni & Non-Profit Coalitions
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {partners.map((p, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
                <div className="font-extrabold text-sm text-[#0A192F]">{p.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0A192F]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Everything you need to know about working with Data Diplomats
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-sm text-[#0A192F] flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#FF6B35]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
