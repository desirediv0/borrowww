// Copy and data for /home-loan-documents. Plain module (no 'use client') so the
// server page and the client islands can both import it.
import { isPublished } from '@/content/draftPages';

const filterPublished = (guides) => guides.filter((guide) => isPublished(guide.href));

export const PAGE_PATH = '/home-loan-documents';
export const DATE_PUBLISHED = '2026-07-15';
export const DATE_MODIFIED = '2026-10-22';

// Shown under the H1 and used as the Article author in structured data.
// Set reviewer to a real person, e.g. { name: 'Full Name', credential: 'Senior Credit Manager, 12 years' }.
export const byline = {
  author: 'Ishan Chugh',
  // Add a role and experience line once confirmed, e.g. 'Home loan advisor, 8 years'.
  authorRole: null,
  // Replace with a confirmed 1 to 2 line bio (role, years of experience, what Ishan handles).
  authorBio: 'Ishan Chugh writes the home loan guides on Borrowww.',
  reviewer: null,
};

export const featuredImage = {
  src: '/images/home-loan-documents-required-checklist.webp',
  width: 1200,
  height: 630,
  alt: 'Home loan documents required checklist: KYC documents, income proof, bank statements, property papers and photos',
};

export const PARENT_COMPANY = 'Premier Penny Ventures Private Limited';
export const OFFICE_ADDRESS = '221, 2nd Floor, JMD Megapolis, Sector 48, Sohna Road, Gurgaon 122002';

export const quickAnswer = [
  'PAN card',
  'Aadhaar card (identity and address)',
  'Salary slips for the last 3 months, or ITR for the last 2 to 3 years if self-employed',
  'Bank statements for the last 6 months (12 months for self-employed)',
  'Form 16, or audited P&L and balance sheet for a business',
  'Proof of employment or business registration',
  '2 to 4 passport-size photographs',
  'Statements of any loans you are already paying',
  'Proof of your own contribution (down payment receipts)',
  'Property papers: sale agreement, title deed, approved plan and encumbrance certificate',
];

export const importanceTable = [
  { purpose: 'Identity', confirms: 'You are the person applying', docs: 'PAN, Aadhaar, passport, voter ID' },
  { purpose: 'Address', confirms: 'Where you live now', docs: 'Aadhaar, utility bill, passport, rent agreement' },
  { purpose: 'Income', confirms: 'You can pay the EMI', docs: 'Salary slips, Form 16, ITR' },
  { purpose: 'Employment', confirms: 'Your job or business is stable', docs: 'Employment certificate, business registration' },
  { purpose: 'Property', confirms: 'The seller owns it and it is free of loans or disputes', docs: 'Sale deed, title deed, encumbrance certificate' },
  { purpose: 'Repayment history', confirms: 'How you handle the loans you already have', docs: 'Bank statements, loan statements' },
  { purpose: 'KYC compliance', confirms: 'The bank meets RBI rules', docs: 'PAN, Aadhaar, signed KYC form' },
];

export const generalChecklist = [
  { key: 'identity', title: 'Identity proof', desc: 'PAN card is mandatory. Add one more: Aadhaar, passport, voter ID or driving licence.' },
  { key: 'address', title: 'Address proof', desc: 'Aadhaar works for most banks. A recent utility bill, passport or registered rent agreement also works.' },
  { key: 'income', title: 'Income proof', desc: 'Salaried: 3 months of salary slips and Form 16. Self-employed: ITR with computation of income for 2 to 3 years.' },
  { key: 'employment', title: 'Employment proof', desc: 'An employment certificate or appointment letter. Business owners send registration papers instead.' },
  { key: 'bank', title: 'Bank statements', desc: '6 months for salaried applicants, 12 months for self-employed. Every page, with the bank seal or as an e-statement.' },
  { key: 'photos', title: 'Photographs', desc: '2 to 4 recent passport-size photos for the form and KYC record.' },
  { key: 'loans', title: 'Existing loan statements', desc: 'If you pay any EMI today, send its statement. The bank deducts it when it works out how much you can borrow.' },
  { key: 'contribution', title: 'Own contribution proof', desc: 'Receipts for the down payment you have paid the builder or seller. Banks fund only 75% to 90% of the property value.' },
  { key: 'fee', title: 'Processing fee', desc: 'A cheque or online payment for the processing fee, collected when you file the application.' },
  { key: 'property', title: 'Property documents', desc: 'Ownership, approval and tax papers for the property. The list changes with the type of purchase, covered below.' },
];

export const profiles = [
  {
    key: 'salaried',
    label: 'Salaried',
    heading: 'salaried employees',
    intro: 'This is the shortest list, because your employer already records your income.',
    docs: [
      { name: 'Salary slips (last 3 months)', purpose: 'Shows your current monthly pay' },
      { name: 'Form 16 (last 2 years)', purpose: 'Shows annual income and tax paid' },
      { name: 'Bank statements (last 6 months)', purpose: 'Shows the salary landing in your account' },
      { name: 'Employment certificate', purpose: 'Confirms you still work there' },
      { name: 'Appointment letter', purpose: 'Asked for if you joined less than a year ago' },
      { name: 'PAN card', purpose: 'Identity and tax record' },
      { name: 'Aadhaar card', purpose: 'Identity and address' },
      { name: 'Passport-size photographs', purpose: 'Form and KYC' },
    ],
    tip: 'Match your salary slips to your bank statements before you submit. If the slip says one amount and the credit says another, verification stops until you explain it.',
  },
  {
    key: 'self-employed',
    label: 'Self-employed',
    heading: 'self-employed professionals',
    intro: 'Doctors, CAs, architects and consultants are judged on tax records and how long the practice has run.',
    docs: [
      { name: 'ITR with computation of income (last 2 to 3 years)', purpose: 'Shows income is steady across years' },
      { name: 'CA-certified P&L and balance sheet (last 2 to 3 years)', purpose: 'Shows the practice makes money' },
      { name: 'Bank statements (last 12 months)', purpose: 'Shows cash flow, business and personal' },
      { name: 'GST returns (last 12 months)', purpose: 'Confirms turnover, where GST applies' },
      { name: 'Business registration or practice licence', purpose: 'Proves the practice legally exists' },
      { name: 'Professional qualification certificate', purpose: 'For doctors, CAs, architects and similar' },
      { name: 'Office address proof', purpose: 'Rent agreement or ownership papers for the workplace' },
    ],
    tip: 'Banks average your income over 2 or 3 years. One weak year pulls the eligible amount down, so file returns on time and keep the CA audit report ready.',
  },
  {
    key: 'business-owners',
    label: 'Business owners',
    heading: 'business owners',
    intro: 'The bank checks the business as closely as it checks you.',
    docs: [
      { name: 'Audited financial statements (last 2 to 3 years)', purpose: 'Profit, assets and debt of the business' },
      { name: 'ITR of the business and the owner', purpose: 'Declared income on both sides' },
      { name: 'Company registration certificate', purpose: 'Legal structure of the business' },
      { name: 'Partnership deed or MOA and AOA', purpose: 'Who owns what, for firms and companies' },
      { name: 'GST returns (last 12 months)', purpose: 'Turnover and tax compliance' },
      { name: 'Business and personal bank statements (last 12 months)', purpose: 'Cash flow and repayment capacity' },
    ],
    tip: 'Three years of steady turnover, GST filed on time and clean bank statements get through review fastest.',
  },
  {
    key: 'nri',
    label: 'NRI',
    heading: 'NRIs (Non-Resident Indians)',
    intro: 'NRIs prove overseas income and residence status on top of the usual KYC.',
    docs: [
      { name: 'Passport', purpose: 'Main identity proof' },
      { name: 'Visa or work permit', purpose: 'Confirms you live and work abroad' },
      { name: 'Employment contract or overseas employment proof', purpose: 'Shows the job is stable' },
      { name: 'Salary certificate and recent salary slips', purpose: 'Shows overseas income' },
      { name: 'NRE or NRO account statements', purpose: 'Shows how the money reaches India' },
      { name: 'Power of attorney', purpose: 'Needed if someone in India will sign for you' },
    ],
    tip: 'Property bought by an NRI has to follow RBI rules under FEMA. Agricultural land, plantation property and farmhouses cannot be bought this way.',
  },
];

export const comparisonRows = [
  { aspect: 'Main income proof', salaried: 'Salary slips, Form 16', self: 'ITR, P&L statement' },
  { aspect: 'Work proof', salaried: 'Employment certificate', self: 'Business registration, GST returns' },
  { aspect: 'How income is judged', salaried: 'Current monthly salary', self: 'Average of the last 2 to 3 years' },
  { aspect: 'Bank statements', salaried: '6 months', self: '12 months' },
  { aspect: 'Processing time', salaried: 'Faster', self: 'Longer, because of extra checks' },
];

export const commonPropertyDocs = [
  { name: 'Sale agreement', purpose: 'Terms agreed between you and the seller' },
  { name: 'Title deed and sale deed', purpose: 'Who owns the property and how it passes to you' },
  { name: 'Encumbrance certificate', purpose: 'Shows no loan or legal claim on the property, often for the last 13 to 30 years' },
  { name: 'Approved building plan', purpose: 'Construction matches what the local authority sanctioned' },
  { name: 'Latest property tax receipt', purpose: 'No unpaid tax is attached to the property' },
];

export const propertyByPurchase = [
  {
    type: 'Buying from a builder (under construction)',
    docs: 'Allotment letter, builder-buyer agreement, RERA registration number, tripartite agreement between you, the builder and the bank, builder NOC, and the payment schedule.',
  },
  {
    type: 'Buying a ready-to-move flat from a builder',
    docs: 'Everything above, plus the occupancy certificate (OC), completion certificate and possession letter.',
  },
  {
    type: 'Buying a resale property',
    docs: 'The full chain of earlier sale deeds, an encumbrance certificate, society NOC and share certificate for flats, and the seller\'s loan closure letter if the property was mortgaged.',
  },
  {
    type: 'Buying a plot and building on it',
    docs: 'Plot sale deed, approved building plan, a construction cost estimate from an architect or engineer, and land-use papers showing the plot is residential.',
  },
  {
    type: 'Moving an existing loan (balance transfer)',
    docs: 'Your current loan sanction letter, statement for the last 12 months, a list of documents the old bank holds, and its foreclosure letter.',
  },
];

export const commonMistakes = [
  { mistake: 'Missing signatures', delay: 'The form or document comes back for signing' },
  { mistake: 'Wrong PAN details', delay: 'Identity check fails and has to be redone' },
  { mistake: 'Name spelled differently on two documents', delay: 'The bank asks for an affidavit or extra proof' },
  { mistake: 'Old KYC', delay: 'Nothing moves until KYC is updated' },
  { mistake: 'Bank statement pages missing', delay: 'Gaps raise questions about your cash flow' },
  { mistake: 'Wrong income proof for your job type', delay: 'A self-employed file with only salary slips cannot be assessed' },
  { mistake: 'Property paper problems', delay: 'The legal check stalls and sanction waits' },
  { mistake: 'Missing ITR', delay: 'A self-employed application cannot proceed without it' },
  { mistake: 'Copies not self-attested', delay: 'Many banks reject unsigned photocopies' },
  { mistake: 'Form details that differ from documents', delay: 'Every mismatch becomes a query' },
];

export const prepTips = [
  'Start collecting papers before you pick a property. Personal documents do not depend on it.',
  'Update your KYC with your bank if your address or phone number has changed.',
  'Keep originals ready. Banks see them once, even if you submit copies.',
  'Scan in colour and check every page is readable.',
  'For a resale flat, get the property papers checked first. They take the longest.',
  'Put salary slips, ITRs and statements in date order, one folder each.',
  'Ask the bank for its own checklist. Lists differ slightly between banks and NBFCs.',
  'Read your filled application form against your documents before signing it.',
];

export const verificationSteps = [
  { step: '1', title: 'Application', desc: 'You file the form with your personal documents and the processing fee.' },
  { step: '2', title: 'Document check', desc: 'The bank checks each paper against the others and against the form.' },
  { step: '3', title: 'Credit check', desc: 'The bank pulls your CIBIL report and looks at your current EMIs.' },
  { step: '4', title: 'Sanction', desc: 'If your income and credit pass, you get a sanction letter with the amount and rate.' },
  { step: '5', title: 'Legal and technical check', desc: 'A lawyer checks the property title. An engineer values the property.' },
  { step: '6', title: 'Agreement', desc: 'You sign the loan agreement and hand over the original property papers.' },
  { step: '7', title: 'Disbursement', desc: 'The bank pays the seller or builder, in one go or in stages.' },
];

export const relatedGuides = filterPublished([
  { href: '/home-loan-eligibility', label: 'Home loan eligibility', note: 'How much you can borrow on your salary' },
  { href: '/home-loan/salaried', label: 'Home loan for salaried employees', note: 'Rates and limits for salaried borrowers' },
  { href: '/home-loan/self-employed', label: 'Home loan for self-employed borrowers', note: 'How banks read business income' },
  { href: '/loan-emi-calculator', label: 'Loan EMI calculator', note: 'Your monthly EMI by amount and tenure' },
  { href: '/balance-transfer/documents', label: 'Balance transfer documents', note: 'Papers needed to move an existing loan' },
]);

export const faqs = [
  {
    q: 'What documents are required for a home loan?',
    a: 'You need PAN, Aadhaar, income proof (3 months of salary slips and Form 16, or 2 to 3 years of ITR if self-employed), 6 to 12 months of bank statements, photographs, statements of any current loans and proof of your down payment. Once you choose the property, you add its sale agreement, title deed, approved plan and encumbrance certificate.',
  },
  {
    q: 'What documents does a salaried employee need for a home loan?',
    a: 'PAN, Aadhaar, salary slips for the last 3 months, Form 16 for the last 2 years, bank statements for the last 6 months, an employment certificate and 2 to 4 photographs. If you joined your job less than a year ago, add the appointment letter.',
  },
  {
    q: 'What documents does a self-employed person need for a home loan?',
    a: 'ITR with computation of income for the last 2 to 3 years, CA-certified P&L and balance sheet for the same years, 12 months of bank statements, GST returns where they apply, and proof that the business or practice is registered. Doctors, CAs and architects also send their qualification certificate. Banks average your income across those years, so one weak year lowers the amount you can get.',
  },
  {
    q: 'What documents are required for an NRI home loan?',
    a: 'Passport, visa or work permit, overseas employment contract, salary certificate with recent slips, and NRE or NRO account statements. If you cannot be in India to sign, you also need a power of attorney for the person signing for you. The purchase must follow RBI rules under FEMA.',
  },
  {
    q: 'What property documents are needed for a home loan?',
    a: 'For every purchase: sale agreement, title deed, encumbrance certificate, approved building plan and the latest property tax receipt. An under-construction flat adds the allotment letter, RERA number and tripartite agreement. A ready flat adds the occupancy certificate. A resale property adds the full chain of earlier sale deeds and a society NOC.',
  },
  {
    q: 'How long does home loan approval take?',
    a: 'With a complete file, most banks sanction a salaried applicant in about 1 to 2 weeks. Self-employed files and resale properties take longer because of the extra income and legal checks. The clock really starts when the last document arrives, so missing papers are the main cause of delay.',
  },
  {
    q: 'How long does home loan document verification take?',
    a: 'Usually 7 to 15 working days once every document is in. Clean salaried files are at the short end. Files with income gaps or title questions on the property run longer.',
  },
  {
    q: 'Why do banks ask for so many documents?',
    a: 'A home loan runs 15 to 30 years and is often the largest loan a person takes. The bank checks who you are, whether you can pay, and whether the property is legally clean, because it holds that property as security until you repay. RBI\'s KYC rules also require identity and address proof for every borrower.',
  },
  {
    q: 'What mistakes delay home loan documentation?',
    a: 'Missing signatures, a name spelled differently across documents, outdated KYC, missing bank statement pages and income proof that does not fit your job type. Each one turns into a query from the bank. Reading your form against your documents before you submit catches most of them.',
  },
  {
    q: 'Can I apply for a home loan without all the documents?',
    a: 'You can start with basic details and your personal documents. The bank will not issue a sanction letter until income proof is in, and it will not pay out until the property papers clear the legal check.',
  },
  {
    q: 'How does Borrowww help with home loan documents?',
    a: 'We give you a checklist for your profile, check your documents for mismatches before they go to a bank, and tell you what each lender on our panel asks for. That way the file goes in once instead of coming back with queries.',
  },
];

export const sources = [
  {
    href: 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=11566',
    label: 'RBI Master Direction: Know Your Customer (KYC) Direction, 2016',
  },
];
