export const getDeepvueCallbackUrl = () => {
    // DeepVue requires TLD (e.g. .com), so localhost is rejected.
    // Always use production URL for callback.
    return 'https://borrowww.com/credit-check';
};

export const DEEPVUE_CONFIG = {
    BASE_URL: process.env.DEEPVUE_BASE_URL || 'https://production.deepvue.tech',
    CLIENT_ID: process.env.DEEPVUE_CLIENT_ID,
    CLIENT_SECRET: process.env.DEEPVUE_CLIENT_SECRET,
    API_KEY: process.env.DEEPVUE_API_KEY
};
