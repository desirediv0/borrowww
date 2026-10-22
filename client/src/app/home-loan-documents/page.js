import Image from 'next/image';
import Link from 'next/link';
import {
    AlertCircle,
    ArrowRight,
    BadgeCheck,
    Building2,
    ClipboardCheck,
    FileCheck2,
    FileText,
    Home,
    IndianRupee,
    Percent,
    Phone,
    Receipt,
    UserCheck,
    Users,
    Wallet,
} from 'lucide-react';

import PartnerBanks from '@/components/PartnerBanks';
import { buildMetadata, companyInfo } from '@/lib/seo';

import FaqAccordion from './FaqAccordion';
import LeadForm from './LeadForm';
import ProfileTabs from './ProfileTabs';
import {
    DATE_MODIFIED,
    DATE_PUBLISHED,
    OFFICE_ADDRESS,
    PAGE_PATH,
    PARENT_COMPANY,
    byline,
    commonMistakes,
    commonPropertyDocs,
    comparisonRows,
    faqs,
    featuredImage,
    generalChecklist,
    importanceTable,
    prepTips,
    profiles,
    propertyByPurchase,
    quickAnswer,
    relatedGuides,
    sources,
    verificationSteps,
} from './content';

const TITLE = 'Home Loan Documents Required: Complete Checklist | Borrowww';
const H1 = 'Home Loan Documents Required: Complete Checklist for Faster Approval';
const DESCRIPTION =
    'Home loan documents required in India for salaried, self-employed, business and NRI applicants, plus property papers by purchase type. Updated October 2026.';
const PAGE_URL = `${companyInfo.siteUrl}${PAGE_PATH}`;

const baseMetadata = buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: PAGE_PATH,
    type: 'article',
    keywords: [
        'home loan documents required',
        'documents required for home loan',
        'home loan documents list',
        'home loan documents checklist',
        'property documents for home loan',
        'self-employed home loan documents',
        'NRI home loan documents',
    ],
});

// The share image comes from opengraph-image.js / twitter-image.js in this
// folder, so the logo images from buildMetadata are dropped here.
const { images: _ogLogo, ...baseOpenGraph } = baseMetadata.openGraph;
const { images: _twitterLogo, ...baseTwitter } = baseMetadata.twitter;

export const metadata = {
    ...baseMetadata,
    authors: [{ name: byline.author }],
    creator: byline.author,
    openGraph: {
        ...baseOpenGraph,
        publishedTime: DATE_PUBLISHED,
        modifiedTime: DATE_MODIFIED,
        authors: [byline.author],
        section: 'Home Loan',
        tags: ['home loan documents', 'home loan checklist', 'property documents', 'KYC'],
    },
    twitter: baseTwitter,
};

const CHECKLIST_ICONS = {
    identity: UserCheck,
    address: Home,
    income: IndianRupee,
    employment: FileText,
    bank: ClipboardCheck,
    photos: Users,
    loans: Percent,
    contribution: Wallet,
    fee: Receipt,
    property: Building2,
};

const UPDATED_LABEL = new Date(`${DATE_MODIFIED}T00:00:00+05:30`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
});

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: H1,
    description: DESCRIPTION,
    mainEntityOfPage: PAGE_URL,
    image: {
        '@type': 'ImageObject',
        url: `${companyInfo.siteUrl}${featuredImage.src}`,
        width: featuredImage.width,
        height: featuredImage.height,
        caption: featuredImage.alt,
    },
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    author: {
        '@type': 'Person',
        name: byline.author,
        ...(byline.authorRole ? { jobTitle: byline.authorRole } : {}),
        worksFor: { '@type': 'Organization', name: companyInfo.name, url: companyInfo.siteUrl },
    },
    ...(byline.reviewer
        ? { reviewedBy: { '@type': 'Person', name: byline.reviewer.name, jobTitle: byline.reviewer.credential } }
        : {}),
    publisher: {
        '@type': 'Organization',
        name: companyInfo.name,
        url: companyInfo.siteUrl,
        logo: { '@type': 'ImageObject', url: companyInfo.logo },
        parentOrganization: { '@type': 'Organization', name: PARENT_COMPANY },
        address: { '@type': 'PostalAddress', streetAddress: OFFICE_ADDRESS, addressCountry: 'IN' },
    },
    citation: sources.map((source) => source.href),
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${companyInfo.siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Home Loan', item: `${companyInfo.siteUrl}/home-loan` },
        { '@type': 'ListItem', position: 3, name: 'Home Loan Documents', item: PAGE_URL },
    ],
};

export default function HomeLoanDocumentsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
            {/* HERO */}
            <section className="relative overflow-hidden border-b border-gray-100">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-48 -right-32 h-96 w-96 rounded-full bg-[#2D3E50]/10 blur-3xl" />
                    <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#3A6EA5]/10 blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
                        <ol className="flex flex-wrap items-center gap-1.5">
                            <li><Link href="/" className="hover:text-[#3A6EA5]">Home</Link></li>
                            <li aria-hidden="true">›</li>
                            <li><Link href="/home-loan" className="hover:text-[#3A6EA5]">Home Loan</Link></li>
                            <li aria-hidden="true">›</li>
                            <li aria-current="page" className="text-gray-700">Documents</li>
                        </ol>
                    </nav>
                    <div className="grid lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-7">
                            <h1 className="text-4xl sm:text-5xl tracking-tight font-medium text-black leading-tight">
                                {H1}
                            </h1>
                            <p className="mt-4 text-sm text-gray-500">
                                By {byline.author}
                                {byline.reviewer ? `, reviewed by ${byline.reviewer.name} (${byline.reviewer.credential})` : ''}
                                {' · '}Updated <time dateTime={DATE_MODIFIED}>{UPDATED_LABEL}</time>
                            </p>

                            <div className="mt-6 rounded-2xl border border-[#3A6EA5]/20 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    The short answer: documents most banks ask for
                                </h2>
                                <ol className="mt-3 list-decimal pl-5 space-y-1.5 text-gray-700">
                                    {quickAnswer.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ol>
                                <p className="mt-4 text-sm text-gray-600">
                                    Self-employed, business and NRI applicants add a few more papers. Each list is{' '}
                                    <a href="#profile-checklists" className="text-[#3A6EA5] font-medium hover:underline">further down the page</a>.
                                </p>
                            </div>

                            <p className="mt-6 text-base text-gray-600 max-w-2xl leading-relaxed">
                                Most home loans that get stuck are held up by paperwork, not by income. A name spelled one way on your PAN and another way on Aadhaar, or a bank statement with a missing month, can hold a file for two weeks. Collect everything below before you apply and the bank only has to look at it once.
                            </p>
                            <figure className="mt-8">
                                <Image
                                    src={featuredImage.src}
                                    width={featuredImage.width}
                                    height={featuredImage.height}
                                    alt={featuredImage.alt}
                                    sizes="(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 100vw"
                                    className="w-full h-auto rounded-2xl border border-gray-100 shadow-md"
                                />
                            </figure>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#lead-form"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2D3E50] to-[#3A6EA5] px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    Get your documents checked <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </a>
                                <a
                                    href="tel:+919560069525"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#2D3E50] px-6 py-3 text-[#2D3E50] font-semibold hover:bg-[#2D3E50] hover:text-white transition-all"
                                >
                                    <Phone className="h-4 w-4" aria-hidden="true" /> Call +91 95600 69525
                                </a>
                            </div>
                        </div>

                        <div id="lead-form" className="lg:col-span-5 lg:sticky lg:top-24">
                            <LeadForm />
                        </div>
                    </div>
                </div>
            </section>

            <PartnerBanks />

            {/* WHAT EACH DOCUMENT PROVES */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5">
                            <h2 className="text-3xl font-semibold text-gray-900 leading-tight">
                                What each document proves to the bank
                            </h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Every paper answers one question the bank has to settle before it lends: who you are, where you live, what you earn, how stable that income is, and whether the property is legally clean.
                            </p>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                The bank holds the property as security for 15 to 30 years. That is why the property papers get the closest look, and why identity and address proof follow RBI&apos;s{' '}
                                <a href={sources[0].href} target="_blank" rel="noopener noreferrer" className="text-[#3A6EA5] font-medium hover:underline">KYC rules</a>.
                            </p>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#2D3E50]">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Check</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">What it proves</th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Documents used</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100 text-sm">
                                        {importanceTable.map((item) => (
                                            <tr key={item.purpose} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4 font-semibold text-gray-900">{item.purpose}</td>
                                                <td className="px-6 py-4 text-gray-600">{item.confirms}</td>
                                                <td className="px-6 py-4 text-[#3A6EA5] font-medium">{item.docs}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPLETE CHECKLIST */}
            <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50 border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">
                            Home loan documents list
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Ten groups of papers. Nearly every applicant needs all of them.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {generalChecklist.map((item) => {
                            const Icon = CHECKLIST_ICONS[item.key];
                            return (
                                <div
                                    key={item.key}
                                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-[#3A6EA5]/10 text-[#3A6EA5] flex items-center justify-center mb-5 group-hover:bg-[#3A6EA5] group-hover:text-white transition-all duration-300">
                                        <Icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* PROFILE-SPECIFIC CHECKLISTS */}
            <section id="profile-checklists" className="py-16 bg-white scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">
                            Documents by applicant type
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            The income papers change with how you earn. Pick your profile.
                        </p>
                    </div>
                    <ProfileTabs profiles={profiles} />
                    <p className="mt-8 text-center text-gray-600">
                        Not sure how much these papers will get you?{' '}
                        <Link href="/home-loan/eligibility" className="text-[#3A6EA5] font-medium hover:underline">Check your home loan eligibility</Link>{' '}
                        or see the guides for{' '}
                        <Link href="/home-loan/salaried" className="text-[#3A6EA5] font-medium hover:underline">salaried</Link> and{' '}
                        <Link href="/home-loan/self-employed" className="text-[#3A6EA5] font-medium hover:underline">self-employed</Link> borrowers.
                    </p>
                </div>
            </section>

            {/* COMPARISON TABLE */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-semibold text-gray-900">Salaried vs self-employed: what changes</h2>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-lg bg-white">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Aspect</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Salaried</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Self-employed</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                                {comparisonRows.map((row) => (
                                    <tr key={row.aspect} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-4 font-semibold text-gray-900">{row.aspect}</td>
                                        <td className="px-6 py-4">{row.salaried}</td>
                                        <td className="px-6 py-4">{row.self}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* PROPERTY DOCUMENTS */}
            <section className="py-16 bg-white border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-semibold text-gray-900 leading-tight">
                            Property documents required for a home loan
                        </h2>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            The bank&apos;s lawyer reads these before any money moves. For a resale flat this is the slowest part of the whole loan, so start here.
                        </p>
                    </div>

                    <h3 className="mt-10 text-xl font-semibold text-gray-900">Needed for every purchase</h3>
                    <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {commonPropertyDocs.map((doc) => (
                            <li key={doc.name} className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <span className="flex items-center gap-2 font-semibold text-gray-900">
                                    <FileCheck2 className="w-4 h-4 text-[#2D3E50]" aria-hidden="true" />
                                    {doc.name}
                                </span>
                                <span className="block text-sm text-gray-500 mt-1 leading-relaxed">{doc.purpose}</span>
                            </li>
                        ))}
                    </ul>

                    <h3 className="mt-12 text-xl font-semibold text-gray-900">Extra papers by type of purchase</h3>
                    <div className="mt-4 overflow-x-auto rounded-3xl border border-gray-200 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">If you are</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Also bring</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-600 bg-white">
                                {propertyByPurchase.map((row) => (
                                    <tr key={row.type}>
                                        <td className="px-6 py-4 font-semibold text-gray-900 align-top">{row.type}</td>
                                        <td className="px-6 py-4">{row.docs}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                        Moving a loan you already have? The{' '}
                        <Link href="/balance-transfer/documents" className="text-[#3A6EA5] font-medium hover:underline">balance transfer documents guide</Link>{' '}
                        covers it in detail.
                    </p>
                </div>
            </section>

            {/* COMMON MISTAKES */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold text-gray-900">
                            Mistakes that delay approval
                        </h2>
                        <p className="mt-3 text-gray-600">
                            Each one turns into a query from the bank, and each query adds days.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-xl">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-red-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-red-900 uppercase">Mistake</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-red-900 uppercase">What happens</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-600 bg-white">
                                {commonMistakes.map((item) => (
                                    <tr key={item.mistake} className="hover:bg-red-50/10">
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            <span className="flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" aria-hidden="true" />
                                                {item.mistake}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{item.delay}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* TIPS TO PREPARE */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-white border-t border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl font-semibold text-gray-900 text-center mb-10">
                        How to get your documents ready
                    </h2>

                    <ol className="grid gap-4">
                        {prepTips.map((tip, idx) => (
                            <li key={tip} className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                                    {idx + 1}
                                </span>
                                <span className="text-gray-700 leading-relaxed text-sm sm:text-base">{tip}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* VERIFICATION PROCESS */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold text-gray-900">
                            What happens after you submit
                        </h2>
                        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                            Document checks usually take 7 to 15 working days once the file is complete. Here is the order banks work in.
                        </p>
                    </div>

                    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {verificationSteps.map((item) => (
                            <li key={item.step} className="relative bg-gray-50 rounded-3xl p-6 border border-gray-100">
                                <span className="absolute -top-4 -left-4 h-10 w-10 rounded-xl bg-[#2D3E50] text-white flex items-center justify-center text-base font-bold shadow-lg">
                                    {item.step}
                                </span>
                                <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                            </li>
                        ))}
                    </ol>
                    <p className="mt-10 text-center text-gray-600">
                        Want to see the monthly cost before you apply? Try the{' '}
                        <Link href="/loan-emi-calculator" className="text-[#3A6EA5] font-medium hover:underline">loan EMI calculator</Link>.
                    </p>
                </div>
            </section>

            {/* HOW BORROWWW HELPS */}
            <section className="py-14 bg-[#2D3E50]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl font-semibold text-white leading-tight">
                        How Borrowww helps with home loan documents
                    </h2>
                    <p className="mt-4 text-gray-200 leading-relaxed">
                        We send you a checklist for your profile, read your papers for mismatches before they reach a bank, and tell you what each lender on our panel asks for. Your file goes to the bank once instead of bouncing back with queries.
                    </p>
                    <a
                        href="#lead-form"
                        className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-[#2D3E50] font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        <BadgeCheck className="h-5 w-5" aria-hidden="true" /> Get your documents checked
                    </a>
                </div>
            </section>

            {/* FAQS */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
                            Home loan documents: common questions
                        </h2>
                    </div>
                    <FaqAccordion faqs={faqs} />
                </div>
            </section>

            {/* ABOUT THIS GUIDE (author, accuracy, disclosure) */}
            <section aria-labelledby="about-this-guide" className="py-14 bg-white border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <h2 id="about-this-guide" className="text-2xl font-semibold text-gray-900">About this guide</h2>
                    <div className="mt-6 grid md:grid-cols-3 gap-6">
                        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                            <h3 className="text-base font-semibold text-gray-900">About the writer</h3>
                            <p className="mt-3 flex items-center gap-3">
                                <span aria-hidden="true" className="h-11 w-11 rounded-full bg-[#2D3E50] text-white flex items-center justify-center font-semibold">
                                    {byline.author.split(' ').map((part) => part[0]).join('')}
                                </span>
                                <span>
                                    <span className="block font-semibold text-gray-900">{byline.author}</span>
                                    {byline.authorRole && <span className="block text-sm text-gray-500">{byline.authorRole}</span>}
                                </span>
                            </p>
                            <p className="mt-3 text-sm text-gray-600 leading-relaxed">{byline.authorBio}</p>
                        </div>
                        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                            <h3 className="text-base font-semibold text-gray-900">How this page is kept accurate</h3>
                            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                                First published <time dateTime={DATE_PUBLISHED}>15 July 2026</time>. Last updated <time dateTime={DATE_MODIFIED}>{UPDATED_LABEL}</time>.
                                The lists follow RBI&apos;s KYC rules and the papers lenders on our panel ask for. Each bank can add its own items, so your lender&apos;s checklist is final.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                            <h3 className="text-base font-semibold text-gray-900">Who we are</h3>
                            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                                Borrowww is a {PARENT_COMPANY} company. It is not a bank or NBFC and does not provide loans or accept deposits. We act as a loan advisory and facilitation platform connecting users with regulated lenders.{' '}
                                <Link href="/rbi-compliance" className="text-[#3A6EA5] hover:underline">RBI compliance</Link>
                            </p>
                            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                                {OFFICE_ADDRESS}. Phone {companyInfo.phones[0]}. Email {companyInfo.email}.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* RELATED GUIDES AND SOURCES */}
            <section className="py-14 bg-gray-50 border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Related home loan guides</h2>
                    <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {relatedGuides.map((guide) => (
                            <li key={guide.href}>
                                <Link
                                    href={guide.href}
                                    className="block h-full rounded-2xl bg-white p-5 border border-gray-100 hover:border-[#3A6EA5]/40 hover:shadow-md transition-all"
                                >
                                    <span className="block font-semibold text-gray-900">{guide.label}</span>
                                    <span className="block mt-1 text-sm text-gray-500">{guide.note}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 text-sm text-gray-500">
                        Source:{' '}
                        {sources.map((source) => (
                            <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="text-[#3A6EA5] hover:underline">
                                {source.label}
                            </a>
                        ))}
                        . Bank and NBFC checklists differ slightly; your lender&apos;s own list is final.
                    </p>
                </div>
            </section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
        </div>
    );
}
