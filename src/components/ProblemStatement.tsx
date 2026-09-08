import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Zap, Lock, Users, ArrowUpRight, Scale, Heart } from 'lucide-react';

export const ProblemStatement: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF9F6] border-t border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B35] mb-2">
            The Sector Challenge
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight leading-tight">
            The social sector is at risk of falling behind in the{' '}
            <span className="font-serif-editorial italic font-normal text-[#FF6B35]">
              frontier AI revolution.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            While commercial enterprises rapidly deploy generative AI to expand margins, 92% of non-profits remain trapped between fragile pilot scripts, prohibitive enterprise SaaS costs, and critical data privacy risks for vulnerable communities.
          </p>
        </div>

        {/* 3-Pillar Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Talent Divide */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF6B35] flex items-center justify-center mb-6 font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">
                The Engineering Talent Chasm
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Elite applied AI engineers command multi-hundred-thousand dollar salaries in private tech, putting in-house frontier model specialization out of reach for mission-driven budgets.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Data Diplomats Solution</span>
              <span className="text-[#FF6B35]">Embedded Pro Bono Fellows</span>
            </div>
          </motion.div>

          {/* Card 2: Privacy & Vulnerability */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0A192F] flex items-center justify-center mb-6 font-bold">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">
                Beneficiary Privacy & Trust
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Standard commercial tools routinely log user queries for model training. For refugees, domestic violence survivors, and unhoused families, data leakage is an unacceptable risk.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Data Diplomats Solution</span>
              <span className="text-[#FF6B35]">Air-gapped Zero-Retention Gateways</span>
            </div>
          </motion.div>

          {/* Card 3: Fragmented Legacy Workflows */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6 font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">
                Production-Grade Deployment
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Non-profits don’t need another experimental chatbot mockup; they require reliable, resilient pipelines integrated directly into Salesforce, case files, and field telephony.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Data Diplomats Solution</span>
              <span className="text-[#FF6B35]">Full-Stack Scalable Infrastructure</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
