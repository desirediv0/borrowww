import axios from 'axios';
import { ApiError } from '../utils/ApiError.js';

class DeepVueService {
    constructor() {
        this.baseURL = process.env.DEEPVUE_BASE_URL || 'https://production.deepvue.tech';
        this.clientId = process.env.DEEPVUE_CLIENT_ID;
        this.clientSecret = process.env.DEEPVUE_CLIENT_SECRET;
        this.apiKey = process.env.DEEPVUE_API_KEY;
        this.accessToken = null;
        this.tokenExpiry = null;
    }

    // Get access token for DeepVue API
    async getAccessToken() {
        try {
            // Check if we have a valid token
            if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
                return this.accessToken;
            }

            const params = new URLSearchParams();
            params.append('client_id', this.clientId);
            params.append('client_secret', this.clientSecret);

            const response = await axios.post(`${this.baseURL}/v1/authorize`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.data.access_token) {
                this.accessToken = response.data.access_token;
                // Set expiry to 23 hours from now (tokens expire in 24 hours)
                this.tokenExpiry = new Date(Date.now() + 23 * 60 * 60 * 1000);
                return this.accessToken;
            } else {
                throw new ApiError(500, 'Failed to get access token from DeepVue');
            }
        } catch (error) {
            console.error('DeepVue token error:', error.response?.data || error.message);
            throw new ApiError(500, 'Failed to authenticate with DeepVue API');
        }
    }

    // Create CIBIL SDK session - Simplified
    async createCibilSession(userData) {
        try {
            if (!this.clientId || !this.clientSecret || !this.apiKey) {
                throw new ApiError(500, 'DeepVue credentials not configured');
            }

            const token = await this.getAccessToken();

            // Use working redirect_uri with proper TLD (as confirmed working)
            const payload = {
                redirect_uri: "https://borrowww.vercel.app/callback",  // This worked before!
                full_name: userData.firstName || "",
                mobile_number: userData.mobileNumber || "",
                enrich: true
            };

            console.log('Creating DeepVue session with payload:', payload);

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

            console.log('DeepVue session response:', response.data);

            if (response.data.code === 201 && response.data.data?.redirect_url) {
                return {
                    success: true,
                    transaction_id: response.data.transaction_id,
                    redirect_url: response.data.data.redirect_url,
                    session_data: response.data.data
                };
            } else {
                throw new ApiError(500, 'DeepVue session creation failed');
            }
        } catch (error) {
            console.error('DeepVue CIBIL session error:', error.response?.data || error.message);

            // Return proper error for production use
            return {
                success: false,
                error: error.response?.data || error.message,
                message: 'Failed to create DeepVue session'
            };
        }
    }

    // Fetch CIBIL report using transaction ID
    async fetchCibilReport(transactionId) {
        try {
            if (!this.clientId || !this.clientSecret || !this.apiKey) {
                throw new ApiError(500, 'DeepVue credentials not configured');
            }

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
                    credit_score: response.data.data.credit_score,
                    credit_report: response.data.data.credit_report,
                    pan: response.data.data.pan,
                    mobile: response.data.data.mobile,
                    name: response.data.data.name,
                    pdf_url: response.data.data.pdf_url,
                    raw_data: response.data.data
                };
            } else {
                throw new ApiError(404, 'CIBIL report not ready or not found');
            }
        } catch (error) {
            console.error('DeepVue fetch report error:', error.response?.data || error.message);

            // If report is not ready, return a specific status
            if (error.response?.status === 404 || error.response?.data?.message?.includes('not found')) {
                return {
                    success: false,
                    status: 'PROCESSING',
                    message: 'Report is being processed, please try again later'
                };
            }

            // Return proper error for production use
            return {
                success: false,
                error: error.response?.data || error.message,
                message: 'Failed to fetch CIBIL report from DeepVue'
            };
        }
    }    // Download PDF report
    async downloadCibilPdf(pdfUrl) {
        try {
            const response = await axios.get(pdfUrl, {
                responseType: 'arraybuffer',
                headers: {
                    'Authorization': `Bearer ${await this.getAccessToken()}`,
                },
            });

            return {
                success: true,
                pdfBuffer: response.data,
                contentType: 'application/pdf'
            };
        } catch (error) {
            console.error('PDF download error:', error);
            throw new ApiError(500, 'Failed to download CIBIL PDF');
        }
    }
}

export const deepVueService = new DeepVueService();