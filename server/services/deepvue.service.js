import axios from 'axios';
import { ApiError } from '../utils/ApiError.js';
import { getDeepvueCallbackUrl, DEEPVUE_CONFIG } from '../config/deepvue.js';

class DeepVueService {
    constructor() {
        this.accessToken = null;
        this.tokenExpiry = null;
    }

    get baseURL() {
        return DEEPVUE_CONFIG.BASE_URL;
    }

    get clientId() {
        return DEEPVUE_CONFIG.CLIENT_ID;
    }

    get clientSecret() {
        return DEEPVUE_CONFIG.CLIENT_SECRET;
    }

    get apiKey() {
        return DEEPVUE_CONFIG.API_KEY;
    }

    async getAccessToken() {
        if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
            return this.accessToken;
        }

        console.log('[DeepVue] Auth Request Start');

        try {
            const params = new URLSearchParams();
            params.append('client_id', this.clientId);
            params.append('client_secret', this.clientSecret);

            const response = await axios.post(
                `${this.baseURL}/v1/authorize`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'x-api-key': this.apiKey,
                    },
                }
            );

            console.log('[DeepVue] Auth Success');

            this.accessToken = response.data.access_token;
            // Default 24h, use 23h buffer
            this.tokenExpiry = new Date(Date.now() + 23 * 60 * 60 * 1000);
            return this.accessToken;

        } catch (error) {
            console.error('[DeepVue] Auth Failed:', error.response?.data || error.message);
            throw new Error('DeepVue Authentication Failed');
        }
    }

    async createCibilSession(userData) {
        console.log('[DeepVue] Session Request Start');

        try {
            // Validate required fields
            if (!userData.firstName || !userData.mobileNumber) {
                throw new ApiError(400, "Full Name and Mobile Number are required for DeepVue Session");
            }

            const token = await this.getAccessToken();
            const callbackUrl = getDeepvueCallbackUrl();
            console.log('[DeepVue] Using Callback URL:', callbackUrl);

            const payload = {
                redirect_uri: callbackUrl,
                full_name: userData.firstName,
                mobile_number: userData.mobileNumber,
                enrich: true
            };

            const response = await axios.post(
                `${this.baseURL}/v2/financial-services/credit-bureau/equifax/credit-report/sdk/session`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'x-api-key': this.apiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('[DeepVue] Session Success', { txnId: response.data.transaction_id });

            if (response.data.code === 201 && response.data.data?.redirect_url) {
                return {
                    success: true,
                    transaction_id: response.data.transaction_id,
                    redirect_url: response.data.data.redirect_url,
                    session_data: response.data.data
                };
            }

            return {
                success: false,
                message: 'Unexpected response code from DeepVue',
                deepvue_error: response.data
            };

        } catch (error) {
            console.error('[DeepVue] Session Failure:', error.response?.data || error.message);
            return {
                success: false,
                message: 'Failed to create DeepVue session',
                deepvue_error: error.response?.data || error.message
            };
        }
    }

    async fetchCibilReport(transactionId) {
        try {
            const token = await this.getAccessToken();

            const response = await axios.get(
                `${this.baseURL}/v2/financial-services/credit-bureau/credit-report/sdk/report?transaction_id=${transactionId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'x-api-key': this.apiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.code === 200 && response.data.data) {
                return {
                    success: true,
                    data: response.data.data // Wrapper for creditReportService compatibility
                };
            }

            return {
                success: false,
                message: 'Report not ready or invalid response',
                deepvue_error: response.data
            };

        } catch (error) {
            console.error('[DeepVue] Fetch Report Error:', error.response?.data || error.message);

            if (error.response?.status === 404) {
                return {
                    success: false,
                    status: 'PROCESSING',
                    message: 'Report is being processed'
                };
            }

            return {
                success: false,
                message: 'Failed to fetch CIBIL report',
                deepvue_error: error.response?.data || error.message
            };
        }
    }

    async downloadCibilPdf(pdfUrl) {
        try {
            const token = await this.getAccessToken();
            const response = await axios.get(pdfUrl, {
                responseType: 'arraybuffer',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            return {
                success: true,
                pdfBuffer: response.data,
                contentType: 'application/pdf'
            };
        } catch (error) {
            console.error('[DeepVue] PDF Download Error:', error.message);
            throw new ApiError(500, 'Failed to download CIBIL PDF');
        }
    }
}

export const deepVueService = new DeepVueService();