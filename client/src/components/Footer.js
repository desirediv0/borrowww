'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

import { motion } from 'framer-motion';

import { GUIDE_GROUPS, GUIDE_GROUP_ORDER } from '@/content/guideLinks';
import { companyInfo } from '@/lib/seo';
import { isPublished } from '@/content/draftPages';

export default function Footer() {
  const footerLinks = {
    Services: [
      { name: 'Credit Check', href: '/credit-check' },
      { name: 'EMI Calculator', href: '/loan-emi-calculator' },
      { name: 'Balance Transfer', href: '/balance-transfer' },
      { name: 'Home Loan', href: '/home-loan' },
      { name: 'Loan Against Property', href: '/loan-against-property' },
      { name: 'Loan Comparison', href: '/comparison' },
      { name: 'Home Loan Documents', href: '/home-loan-documents' },
      { name: 'Home Loan Eligibility', href: '/home-loan-eligibility' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Refer a Friend', href: '/referral' },
      { name: 'Partners', href: '#' },
      { name: 'Sitemap', href: '/sitemap' },
    ],
    Support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Documentation', href: '#' },
      { name: 'Status', href: '#' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'RBI Compliance', href: '/rbi-compliance' },
      { name: 'Grievance Redressal', href: '/grievance-redressal' },
    ],
  };

  return (
    <footer className="bg-gray-200 text-gray-800 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-12 items-start">
          {/* Logo and Description */}
          <div className="col-span-2 flex flex-col gap-4">
            <Link href="/">
              <div className="flex items-center gap-3 mb-1">
                <Image
                  src={'/newlogo.png'}
                  alt="Borrowww Logo"
                  width={170}
                  height={40}
                  className="rounded-lg p-1"
                />
              </div>
            </Link>
            <span className="text-[#396A9F] font-medium text-sm mb-1">
              Free Credit Check & Loan Advisory
            </span>
            <p className="text-gray-600 leading-relaxed max-w-sm text-base">
              We help you compare loan offers from RBI-regulated banks and NBFCs. An advisor stays with you from your credit check to disbursal.
            </p>

            {/* Contact Information */}
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <FaPhone className="text-[#396A9F] mt-1 shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+919560069525" className="text-gray-600 hover:text-[#396A9F] transition-colors text-sm">
                    +91 9560069525
                  </a>
                  <a href="tel:+918264111345" className="text-gray-600 hover:text-[#396A9F] transition-colors text-sm">
                    +91 8264111345
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-[#396A9F] mt-1 shrink-0" />
                <a href="mailto:support.borrowww@gmail.com" className="text-gray-600 hover:text-[#396A9F] transition-colors text-sm">
                  support.borrowww@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#396A9F] mt-1 shrink-0" />
                <p className="text-gray-600 text-sm">
                  221, 2nd Floor, JMD Megapolis,<br />
                  Sector 48, Sohna Road,<br />
                  Gurgaon 122002
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FaWhatsapp className="text-[#396A9F] mt-1 shrink-0" />
                <a href="https://wa.me/919560069525" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#396A9F] transition-colors text-sm">
                  WhatsApp: +91 9560069525
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="font-semibold text-[#396A9F] mb-4 tracking-wide uppercase text-sm letter-spacing-1">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.filter((link) => isPublished(link.href)).map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={false}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + categoryIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-[#396A9F] transition-colors duration-200 font-medium text-base"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="block"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Loan guides: crawlable links to every guide page */}
        <nav aria-label="Loan guides" className="mb-12 border-t border-gray-300 pt-10">
          <h3 className="font-semibold text-[#396A9F] mb-6 tracking-wide uppercase text-sm">Loan Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {GUIDE_GROUP_ORDER.map((key) => {
              const group = GUIDE_GROUPS[key];
              if (group.links.length === 0) return null;
              return (
                <div key={key}>
                  <Link
                    href={group.hubPath}
                    className="font-semibold text-gray-800 hover:text-[#396A9F] transition-colors"
                  >
                    {group.hubLabel}
                  </Link>
                  <ul className="mt-3 space-y-2">
                    {group.links.map((link) => (
                      <li key={link.path}>
                        <Link
                          href={link.path}
                          className="text-sm text-gray-600 hover:text-[#396A9F] transition-colors"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-[#396A9F]/20 via-gray-100 to-[#396A9F]/20 mb-8" />

        {/* Regulatory disclosure, shown on every page */}
        <p className="text-xs leading-relaxed text-gray-500 mb-8">
          <strong className="text-gray-600">Disclaimer:</strong> Borrowww is a loan advisory and
          comparison service operated by {companyInfo.legalName} (CIN: {companyInfo.cin}). We are
          not a bank or a Non-Banking Financial Company (NBFC) registered with the Reserve Bank of
          India, and we do not lend money or accept deposits. Loan approval, interest rates, fees and
          all other loan terms are decided solely by the partner bank or NBFC under its own credit
          policy.
        </p>

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-gray-500 text-sm mb-2 md:mb-0">
            © {new Date().getFullYear()} Borrowww, a brand of {companyInfo.legalName}. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/privacy-policy"
              className="text-gray-500 hover:text-[#396A9F] transition-colors duration-200 font-medium"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-500 hover:text-[#396A9F] transition-colors duration-200 font-medium"
            >
              Terms of Service
            </Link>
            <Link
              href="/rbi-compliance"
              className="text-gray-500 hover:text-[#396A9F] transition-colors duration-200 font-medium"
            >
              RBI Compliance
            </Link>
            <Link
              href="/grievance-redressal"
              className="text-gray-500 hover:text-[#396A9F] transition-colors duration-200 font-medium"
            >
              Grievance Redressal
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
