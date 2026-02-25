import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Eye,
    Download,
    Shield,
    Loader2,
    X,
} from 'lucide-react';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const MONTHS = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 4 }, (_, i) => currentYear - i);

const CreditReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const [stats, setStats] = useState({ totalReports: 0, activeReports: 0, expiredReports: 0, averageCreditScore: 0, uniqueUsers: 0 });

    // Month/Year filter
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');

    useEffect(() => {
        fetchReports();
        fetchStats();
    }, [page, searchTerm, filterMonth, filterYear]);

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${API_URL}/credit-report/admin/stats`, {
                withCredentials: true,
            });
            setStats(res.data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const fetchReports = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/credit-report/admin/all`, {
                params: {
                    page,
                    limit: 10,
                    search: searchTerm || undefined,
                    month: filterMonth || undefined,
                    year: filterYear || undefined,
                },
                withCredentials: true,
            });
            setReports(res.data.reports || []);
            setTotalPages(res.data.pages || 1);
        } catch (error) {
            console.error('Failed to fetch reports:', error);
            toast.error('Failed to load credit reports');
        } finally {
            setLoading(false);
        }
    };

    const fetchReportDetail = async (id: string) => {
        setDetailLoading(true);
        setIsModalOpen(true);
        try {
            const res = await axios.get(`${API_URL}/credit-report/admin/${id}`, {
                withCredentials: true,
            });
            setSelectedReport(res.data);
        } catch (error) {
            console.error('Failed to fetch detail:', error);
            toast.error('Failed to load report details');
            setIsModalOpen(false);
        } finally {
            setDetailLoading(false);
        }
    };

    /**
     * Stream PDF download for admin — uses /admin/:id/download-pdf
     * Blob approach: let server validate auth, then browser saves file.
     */
    const handleAdminDownloadPdf = async (reportId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setDownloadingId(reportId);
        try {
            const response = await fetch(`${API_URL}/credit-report/admin/${reportId}/download-pdf`, {
                method: 'GET',
                credentials: 'include',
                headers: { Accept: 'application/pdf' },
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                toast.error(err.message || 'Failed to download PDF');
                return;
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `credit-report-${reportId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success('PDF downloaded');
        } catch (err) {
            toast.error('PDF download failed');
        } finally {
            setDownloadingId(null);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
    };

    const clearFilters = () => {
        setFilterMonth('');
        setFilterYear('');
        setSearchTerm('');
        setPage(1);
    };

    const hasFilters = !!(filterMonth || filterYear || searchTerm);

    return (
        <div className="space-y-6">
            {/* Header + Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Credit Reports</h1>
                    <p className="text-gray-500">Manage and view user credit reports</p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Month */}
                    <select
                        value={filterMonth}
                        onChange={(e) => { setFilterMonth(e.target.value); setPage(1); }}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Months</option>
                        {MONTHS.slice(1).map((m, i) => (
                            <option key={i + 1} value={String(i + 1)}>{m}</option>
                        ))}
                    </select>

                    {/* Year */}
                    <select
                        value={filterYear}
                        onChange={(e) => { setFilterYear(e.target.value); setPage(1); }}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Years</option>
                        {YEARS.map((y) => (
                            <option key={y} value={String(y)}>{y}</option>
                        ))}
                    </select>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-52 text-sm"
                        />
                    </form>

                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1"
                        >
                            <X className="h-4 w-4" /> Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                    { label: 'Total Reports', value: stats.totalReports, color: 'text-gray-900' },
                    { label: 'Active', value: stats.activeReports, color: 'text-green-600' },
                    { label: 'Expired', value: stats.expiredReports, color: 'text-red-500' },
                    { label: 'Unique Users', value: stats.uniqueUsers, color: 'text-blue-600' },
                    { label: 'Avg Score', value: stats.averageCreditScore, color: 'text-purple-600' },
                ].map((s) => (
                    <div key={s.label} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-xs text-gray-500">{s.label}</p>
                        <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fetch Date</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
                                        <p className="mt-2 text-gray-500">Loading reports...</p>
                                    </td>
                                </tr>
                            ) : reports.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        No credit reports found.
                                    </td>
                                </tr>
                            ) : (
                                reports.map((report: any) => (
                                    <tr key={report.id} className="hover:bg-gray-50">
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm flex-shrink-0">
                                                    {report.user?.firstName?.[0]?.toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {report.user?.firstName ? `${report.user.firstName} ${report.user.lastName || ''}`.trim() : 'Unknown'}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{report.user?.phoneNumber || '—'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${!report.creditScore ? 'bg-gray-100 text-gray-700' :
                                                    report.creditScore >= 750 ? 'bg-green-100 text-green-800' :
                                                        report.creditScore >= 650 ? 'bg-yellow-100 text-yellow-800' :
                                                            report.creditScore >= 550 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {report.creditScore ?? 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                                            {report.pan ?? '—'}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {report.fetch_date_formatted || new Date(report.fetchedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {report.expiry_date_formatted || new Date(report.expiresAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${report.statusLabel === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {report.statusLabel === 'active' ? 'Active' : 'Expired'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center gap-2 justify-end">
                                                {/* PDF Download — only show if report has PDF */}
                                                {report.pdfSpacesPath && (
                                                    <button
                                                        onClick={(e) => handleAdminDownloadPdf(report.id, e)}
                                                        disabled={downloadingId === report.id}
                                                        title="Download PDF"
                                                        className="text-gray-500 hover:text-blue-600 disabled:opacity-50"
                                                    >
                                                        {downloadingId === report.id
                                                            ? <Loader2 className="h-4 w-4 animate-spin" />
                                                            : <Download className="h-4 w-4" />
                                                        }
                                                    </button>
                                                )}
                                                {/* View Details */}
                                                <button
                                                    onClick={() => fetchReportDetail(report.id)}
                                                    className="text-blue-600 hover:text-blue-900 flex items-center gap-1 text-sm"
                                                >
                                                    <Eye className="h-4 w-4" /> View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-500">Page {page} of {totalPages}</div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage(Math.max(1, page - 1))}
                            disabled={page === 1}
                            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setPage(Math.min(totalPages, page + 1))}
                            disabled={page === totalPages}
                            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-900">Report Details</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            {detailLoading ? (
                                <div className="flex justify-center py-12">
                                    <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                                </div>
                            ) : selectedReport ? (
                                <div className="space-y-8">
                                    {/* Identity Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { label: 'Full Name', value: selectedReport.name },
                                            { label: 'PAN (Masked)', value: selectedReport.pan, mono: true },
                                            { label: 'Mobile', value: selectedReport.mobile },
                                            { label: 'Fetch Date', value: selectedReport.fetch_date_formatted },
                                            { label: 'Expiry Date', value: selectedReport.expiry_date_formatted },
                                            {
                                                label: 'Status',
                                                value: selectedReport.statusLabel === 'active' ? 'Active' : 'Expired',
                                                badge: selectedReport.statusLabel,
                                            },
                                        ].map((item) => (
                                            <div key={item.label} className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                                                {item.badge ? (
                                                    <span className={`px-2 py-1 text-sm font-semibold rounded-full ${item.badge === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'
                                                        }`}>{item.value}</span>
                                                ) : (
                                                    <p className={`font-semibold text-base ${item.mono ? 'font-mono tracking-widest' : ''}`}>
                                                        {item.value ?? '—'}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Score Overview */}
                                    <div>
                                        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                                            <Shield className="h-5 w-5 text-blue-600" />
                                            Credit Overview
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {[
                                                { label: 'Credit Score', value: selectedReport.creditScore, color: 'text-blue-600 text-2xl font-bold' },
                                                { label: 'Total Accounts', value: selectedReport.totalAccounts },
                                                { label: 'Active Accounts', value: selectedReport.activeAccounts },
                                                { label: 'Total Balance', value: `₹${selectedReport.totalBalance?.toLocaleString()}` },
                                                { label: 'Total Overdue', value: `₹${selectedReport.totalOverdue?.toLocaleString()}`, color: 'text-red-600' },
                                                { label: 'Write-offs', value: selectedReport.noOfWriteOffs },
                                                { label: 'Enquiries (Total)', value: selectedReport.enquiryCount },
                                                { label: 'Enquiries (30d)', value: selectedReport.enquiryPast30Days },
                                            ].map((item) => (
                                                <div key={item.label} className="border p-3 rounded-lg">
                                                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                                                    <p className={item.color || 'text-lg font-semibold text-gray-800'}>{item.value ?? '—'}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Technical Details */}
                                    <div className="border-t pt-4">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Technical Details</h3>
                                        <div className="bg-gray-50 rounded-lg p-3 text-sm font-mono space-y-1">
                                            {[
                                                ['Report ID', selectedReport.id],
                                                ['Transaction ID', selectedReport.transactionId],
                                                ['DO Path', selectedReport.pdfSpacesPath || 'N/A'],
                                            ].map(([k, v]) => (
                                                <div key={k} className="flex justify-between gap-4">
                                                    <span className="text-gray-500 flex-shrink-0">{k}:</span>
                                                    <span className="truncate max-w-xs text-right">{v}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Raw Data */}
                                    <div className="border-t pt-4">
                                        <details className="group">
                                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-500 hover:text-gray-900">
                                                <span>Raw CIBIL JSON</span>
                                                <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
                                            </summary>
                                            <div className="text-xs font-mono bg-gray-50 p-4 rounded-lg mt-2 overflow-auto max-h-80">
                                                <pre>{JSON.stringify(selectedReport.fullReport, null, 2)}</pre>
                                            </div>
                                        </details>
                                    </div>

                                    {/* PDF Download */}
                                    {selectedReport.pdfSpacesPath && (
                                        <div className="flex justify-end pt-4">
                                            <button
                                                onClick={(e) => handleAdminDownloadPdf(selectedReport.id, e)}
                                                disabled={downloadingId === selectedReport.id}
                                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                            >
                                                {downloadingId === selectedReport.id
                                                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Downloading...</>
                                                    : <><Download className="h-4 w-4" /> Download PDF Report</>
                                                }
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">Failed to load details</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreditReports;
