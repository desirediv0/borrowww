'use client';

import { useState } from 'react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, PhoneCall } from 'lucide-react';

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <button
        className="flex w-full items-center justify-between gap-4 text-left"
        onClick={onToggle}
        type="button"
      >
        <span className="text-base font-semibold text-slate-900">{item.question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-slate-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen ? (
        <motion.div
          initial={false}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 text-sm leading-7 text-slate-600"
          dangerouslySetInnerHTML={{ __html: item.answer }}
        />
      ) : null}
    </motion.div>
  );
}

export default function SeoContentBlock({
  heading,
  intro,
  sections,
  faqs = [],
  ctaTitle = 'Talk to Borrowww',
  ctaDescription = 'Discuss your profile with our team and understand the next practical step before applying.',
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pb-16 pt-8 sm:pb-20">
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,#c4d7e044,transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          {sections.map((section, idx) => (
            <motion.article
              key={section.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-[var(--primary-blue)]/30 hover:shadow-md"
            >
              <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
              <div className="seo-content-rich-text mt-5 space-y-4 text-base leading-8 text-slate-600">
                {section.paragraphs.map((paragraph) => (
                  <div
                    key={paragraph.slice(0, 36)}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 rounded-[28px] bg-[var(--primary-blue-dark)] p-8 text-white shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold">{ctaTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-white/80">{ctaDescription}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+919560069525"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--primary-blue-dark)] transition hover:bg-slate-100"
              >
                <PhoneCall className="h-4 w-4" />
                Call Borrowww
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </div>

        {faqs.length ? (
          <div className="mt-14">
            <div className="max-w-2xl">
              <h3 className="text-3xl font-semibold tracking-tight text-slate-900">FAQs</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Quick answers to common questions related to this topic.
              </p>
            </div>
            <div className="mt-8 grid gap-4">
              {faqs.map((item, index) => (
                <FaqItem
                  key={item.question}
                  item={item}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
