import React from 'react';
import { Counter, Reveal } from './primitives';
import { AT_A_GLANCE } from '../data/site';

export const Glance: React.FC = () => (
  <section className="bg-slate-50">
    <div className="shell py-16 sm:py-20">
      <Reveal className="pb-10">
        <span className="eyebrow">Membership at a glance</span>
      </Reveal>

      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {AT_A_GLANCE.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.08}
            className="border-t border-slate-200 py-7 lg:border-r lg:pr-8 lg:last:border-r-0"
          >
            <dd className="font-display text-[clamp(2.75rem,4.4vw,4rem)] leading-none text-navy">
              <Counter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                duration={1.8}
              />
            </dd>
            <dt className="mt-5 max-w-[22ch]">
              <span className="block text-[0.9375rem] font-semibold text-slate-800">
                {stat.label}
              </span>
              <span className="eyebrow mt-2 block">{stat.note}</span>
            </dt>
          </Reveal>
        ))}
      </dl>
    </div>
  </section>
);
