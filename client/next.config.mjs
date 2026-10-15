/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/emi',
        destination: '/loan-emi-calculator',
        permanent: true,
      },
      // Flat URLs used by the hyperlinks inside the category-page briefs; the
      // pages themselves live at the nested "Suggested URL" given in each brief.
      ...[
        ['/loan-against-property-eligibility', '/loan-against-property/eligibility'],
        ['/loan-against-property-interest-rates', '/loan-against-property/interest-rates'],
        ['/loan-against-property-documents', '/loan-against-property/documents'],
        ['/loan-against-property-for-self-employed', '/loan-against-property/self-employed'],
        ['/loan-against-property-for-business', '/loan-against-property/business'],
        ['/loan-against-property-tax-benefits', '/loan-against-property/tax-benefits'],
        ['/loan-against-property-emi-calculator', '/loan-emi-calculator/loan-against-property'],
        ['/home-loan-emi-calculator', '/loan-emi-calculator/home-loan'],
        ['/20-lakh-home-loan-emi', '/loan-emi-calculator/20-lakh-home-loan-emi'],
        ['/30-lakh-home-loan-emi', '/loan-emi-calculator/30-lakh-home-loan'],
        ['/50-lakh-home-loan-emi', '/loan-emi-calculator/50-lakh-home-loan-emi'],
        ['/home-loan-balance-transfer-eligibility', '/balance-transfer/eligibility'],
        ['/home-loan-balance-transfer-interest-rates', '/balance-transfer/interest-rates'],
        ['/home-loan-balance-transfer-documents', '/balance-transfer/documents'],
        ['/home-loan-balance-transfer-benefits', '/balance-transfer/benefits'],
        ['/home-loan-balance-transfer-calculator', '/balance-transfer/home-loan-balance-transfer-calculator'],
        ['/home-loan-balance-transfer-for-self-employed', '/balance-transfer/self-employed'],
      ].map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
};

export default nextConfig;
