'use client';

import { motion } from 'framer-motion';

export default function SeoHero({ page }) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f8fbff_0%,#ffffff_55%,#d9e6ef_100%)] py-24 sm:py-32">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[var(--primary-blue)]/10 blur-[100px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[var(--primary-blue-dark)]/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--primary-blue)]">
              {page.type === 'blog' ? 'Borrowww Insights' : 'Borrowww Loan Guide'}
            </p>
          </motion.div>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
          >
            {page.heading}
          </motion.h1>
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-xl leading-9 text-slate-600"
            dangerouslySetInnerHTML={{ __html: page.intro }}
          />
        </div>
      </div>
    </section>
  );
}
