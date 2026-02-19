import * as creditReportService from '../services/creditReport.service.js';

export const checkCache = async (req, res) => {
    try {
        const result = await creditReportService.checkCache(req.user.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSession = async (req, res) => {
    try {
        // Prioritize form data from body, fallback to user profile
        const userData = {
            firstName: req.body.firstName || req.user.firstName,
            mobileNumber: req.body.mobileNumber || req.user.phoneNumber
        };

        const session = await creditReportService.getSession(userData);
        res.json(session);
    } catch (error) {
        console.error('Get Session Error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const fetchReport = async (req, res) => {
    try {
        const { transactionId } = req.body;
        if (!transactionId) {
            return res.status(400).json({ error: 'Transaction ID is required' });
        }
        const report = await creditReportService.fetchAndSaveReport(req.user.id, transactionId);
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMyReport = async (req, res) => {
    try {
        const report = await creditReportService.getMyReport(req.user.id);
        if (!report) {
            return res.status(404).json({ error: 'No active report found' });
        }
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMyPdf = async (req, res) => {
    try {
        const report = await creditReportService.getMyPdf(req.user.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        if (report.pdfSpacesUrl) {
            return res.json({
                success: true,
                url: report.pdfSpacesUrl
            });
        }

        return res.json({
            success: false,
            status: "PROCESSING",
            message: "PDF is being generated"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllReportsAdmin = async (req, res) => {
    try {
        // Assuming admin check is done in middleware
        const { page, limit, search } = req.query;
        const result = await creditReportService.getAllReportsAdmin(
            parseInt(page) || 1,
            parseInt(limit) || 10,
            search
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getReportDetailAdmin = async (req, res) => {
    try {
        const report = await creditReportService.getReportDetailAdmin(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAdminStats = async (req, res) => {
    try {
        const stats = await creditReportService.getAdminStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
