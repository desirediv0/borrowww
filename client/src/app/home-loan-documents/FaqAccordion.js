'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqAccordion({ faqs }) {
    const [open, setOpen] = useState(() => faqs.map(() => false));

    const toggle = (index) => {
        setOpen((prev) => prev.map((value, i) => (i === index ? !value : value)));
    };

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div
                    key={faq.q}
                    className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300"
                >
                    <h3>
                        <button
                            type="button"
                            id={`faq-q-${index}`}
                            aria-expanded={open[index]}
                            aria-controls={`faq-a-${index}`}
                            onClick={() => toggle(index)}
                            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-gray-900 hover:text-[#3A6EA5] transition-colors"
                        >
                            <span>{faq.q}</span>
                            <ChevronDown
                                aria-hidden="true"
                                className={`h-5 w-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${open[index] ? 'rotate-180' : ''}`}
                            />
                        </button>
                    </h3>
                    <div
                        id={`faq-a-${index}`}
                        role="region"
                        aria-labelledby={`faq-q-${index}`}
                        className={`transition-all duration-300 overflow-hidden ${open[index] ? 'max-h-[600px] border-t border-gray-100' : 'max-h-0'}`}
                    >
                        <p className="px-6 py-5 text-gray-600 leading-relaxed text-sm sm:text-base">
                            {faq.a}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
