import React, { useState } from 'react';
import { ArrowRight, Send, CheckCircle2, Shield, Calendar, Sparkles, Building, Mail, User, Phone } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactSectionProps {
  initialSector?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSector }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    orgType: '501(c)(3) Charity',
    sector: initialSector || 'Food Relief & Basic Needs',
    stage: 'Planning / Exploring Options',
    message: '',
    newsletter: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Value Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B35] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
              Start Your Engagement
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A192F] tracking-tight leading-[1.1]">
              Accelerate your AI roadmap with{' '}
              <span className="font-serif-editorial italic font-normal text-[#FF6B35]">
                Data Diplomats.
              </span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Whether you are looking to automate complex intake triage, deploy a grounded grant writing assistant, or optimize cold-chain food delivery, our applied AI fellows are ready to collaborate.
            </p>

            <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-slate-200 space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                What to Expect
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF6B35] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                <span><strong>30-Min Discovery Call:</strong> We review your operational bottlenecks and mission priorities.</span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF6B35] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                <span><strong>Custom Technical Scoping:</strong> We produce a feasibility memo, ROI projection, and privacy architecture.</span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF6B35] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                <span><strong>Subsidized / Pro Bono Matching:</strong> We align suitable foundation grant subsidies for eligible 501(c)(3)s.</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>100% Confidential · Zero Data Retention Guarantee</span>
            </div>
          </div>

          {/* Right Column: Intake Form or Confirmation */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-12 rounded-2xl bg-[#0A192F] text-white shadow-xl space-y-6 border border-slate-800"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Discovery Request Received
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. An Applied AI Director from Data Diplomats has received your scoping brief for <strong>{formData.organization}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="text-[#FF6B35] font-bold">PROJECT BRIEF SUMMARY:</div>
                  <div className="text-slate-300">Sector: {formData.sector}</div>
                  <div className="text-slate-300">Organization Type: {formData.orgType}</div>
                  <div className="text-slate-300">Current AI Stage: {formData.stage}</div>
                  <div className="text-slate-300">Estimated Response Time: Within 24 Business Hours</div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        organization: '',
                        orgType: '501(c)(3) Charity',
                        sector: 'Food Relief & Basic Needs',
                        stage: 'Planning / Exploring Options',
                        message: '',
                        newsletter: true
                      });
                    }}
                    className="px-5 py-2.5 rounded-full bg-white text-[#0A192F] text-xs font-bold hover:bg-slate-100 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 sm:p-10 rounded-2xl bg-[#FAF9F6] border border-slate-200 shadow-xs space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-xs font-bold text-[#0A192F] mb-1.5 block">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Maya Lin"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-[#0A192F] placeholder-slate-400 focus:outline-hidden focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
                    />
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className="text-xs font-bold text-[#0A192F] mb-1.5 block">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maya@nonprofit.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-[#0A192F] placeholder-slate-400 focus:outline-hidden focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Organization Name */}
                  <div>
                    <label className="text-xs font-bold text-[#0A192F] mb-1.5 block">
                      Organization / Charity Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Community Food Advocates"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-[#0A192F] placeholder-slate-400 focus:outline-hidden focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
                    />
                  </div>

                  {/* Organization Type */}
                  <div>
                    <label className="text-xs font-bold text-[#0A192F] mb-1.5 block">
                      Organization Entity Type
                    </label>
                    <select
                      value={formData.orgType}
                      onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-[#0A192F] focus:outline-hidden focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
                    >
                      <option>501(c)(3) Public Charity</option>
                      <option>Private Foundation / Philanthropy</option>
                      <option>International NGO</option>
                      <option>Civic / Municipal Agency</option>
                      <option>Legal Aid Collective</option>
                      <option>Other Mission-Driven Entity</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Sector */}
                  <div>
                    <label className="text-xs font-bold text-[#0A192F] mb-1.5 block">
                      Primary Mission Sector
                    </label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-[#0A192F] focus:outline-hidden focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
                    >
                      <option>Food Relief & Basic Needs</option>
                      <option>Legal Aid & Housing Defense</option>
                      <option>Emergency Aid & Disaster Relief</option>
                      <option>Philanthropy & Grant Operations</option>
                      <option>Public Health & Clinic Care</option>
                      <option>Environmental Justice & Climate</option>
                      <option>Education & Youth Development</option>
                    </select>
                  </div>

                  {/* AI Stage */}
                  <div>
                    <label className="text-xs font-bold text-[#0A192F] mb-1.5 block">
                      Current AI Stage
                    </label>
                    <select
                      value={formData.stage}
                      onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-[#0A192F] focus:outline-hidden focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
                    >
                      <option>Planning / Exploring Options</option>
                      <option>Have an early prototype / pilot</option>
                      <option>Ready for custom production engineering</option>
                      <option>Need an Ethical AI audit & privacy review</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-bold text-[#0A192F] mb-1.5 block">
                    Describe your primary bottleneck or what you'd like to build
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the workflows consuming your staff time, current software tools, or specific mission goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-[#0A192F] placeholder-slate-400 focus:outline-hidden focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-[#0A192F] text-white font-bold text-xs sm:text-sm hover:bg-[#162B4D] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
                >
                  {loading ? (
                    <span>Processing Scoping Request...</span>
                  ) : (
                    <>
                      <span>Schedule 30-Minute AI Discovery Session</span>
                      <ArrowRight className="w-4 h-4 text-[#FF6B35]" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-500">
                  By submitting, you agree to our 100% confidential non-profit discovery protocol. No spam, ever.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
