import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Eye,
    Download,
    Shield,
    Loader2
} from 'lucide-react';
import { toast } from 'sonner';

// Configure Axios
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const CreditReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stats, setStats] = useState({ totalReports: 0, activeReports: 0, expiredReports: 0, averageCreditScore: 0 });

    useEffect(() => {
        fetchReports();
        fetchStats();
    }, [page, searchTerm]);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_URL}/credit-report/admin/stats`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(res.data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const fetchReports = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token'); // Assuming token is stored here
            const res = await axios.get(`${API_URL}/credit-report/admin/all`, {
                params: { page, limit: 10, search: searchTerm },
                withCredentials: true, // Important for cookies if used
                headers: {
                    'Authorization': `Bearer ${token}` // Fallback if using bearer token
                }
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
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_URL}/credit-report/admin/${id}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Credit Reports</h1>
                    <p className="text-gray-500">Manage and view user credit reports</p>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                    />
                </form>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-sm text-gray-500">Total Reports</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalReports}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-sm text-gray-500">Active Reports</p>
                    <p className="text-2xl font-bold text-green-600">{stats.activeReports}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-sm text-gray-500">Expired Reports</p>
                    <p className="text-2xl font-bold text-red-600">{stats.expiredReports}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-sm text-gray-500">Average Score</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.averageCreditScore}</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Score</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Summary</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fetched At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
                                        <p className="mt-2 text-gray-500">Loading reports...</p>
                                    </td>
                                </tr>
                            ) : reports.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No credit reports found.
                                    </td>
                                </tr>
                            ) : (
                                reports.map((report: any) => (
                                    <tr key={report.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {report.user?.firstName?.[0] || 'U'}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {report.user?.firstName ? `${report.user.firstName} ${report.user.lastName || ''}` : 'Unknown User'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{report.user?.phoneNumber || 'No Phone'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                          ${!report.creditScore ? 'bg-gray-100 text-gray-800' :
                                                        report.creditScore >= 750 ? 'bg-green-100 text-green-800' :
                                                            report.creditScore >= 650 ? 'bg-yellow-100 text-yellow-800' :
                                                                report.creditScore >= 550 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                                                    {report.creditScore || 'N/A'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div>Acc: {report.totalAccounts}</div>
                                            <div>Bal: ₹{report.totalBalance?.toLocaleString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(report.fetchedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(report.expiresAt) > new Date() ? (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                    Expired
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => fetchReportDetail(report.id)}
                                                className="text-blue-600 hover:text-blue-900 flex items-center gap-1 ml-auto"
                                            >
                                                <Eye className="h-4 w-4" /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Page {page} of {totalPages}
                    </div>
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
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                Close
                            </button>
                        </div>

                        <div className="p-6">
                            {detailLoading ? (
                                <div className="flex justify-center py-12">
                                    <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                                </div>
                            ) : selectedReport ? (
                                <div className="space-y-8">
                                    {/* Header Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-500">Full Name</p>
                                            <p className="font-semibold text-lg">{selectedReport.name}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-500">PAN</p>
                                            <p className="font-semibold text-lg">{selectedReport.pan}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-500">Mobile</p>
                                            <p className="font-semibold text-lg">{selectedReport.mobile}</p>
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                            <Shield className="h-5 w-5 text-blue-600" />
                                            Overview
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="border p-3 rounded-lg">
                                                <p className="text-xs text-gray-500">Score</p>
                                                <p className="text-2xl font-bold text-blue-600">{selectedReport.creditScore}</p>
                                            </div>
                                            <div className="border p-3 rounded-lg">
                                                <p className="text-xs text-gray-500">Total Accounts</p>
                                                <p className="text-xl font-semibold">{selectedReport.totalAccounts}</p>
                                            </div>
                                            <div className="border p-3 rounded-lg">
                                                <p className="text-xs text-gray-500">Total Balance</p>
                                                <p className="text-xl font-semibold">₹{selectedReport.totalBalance?.toLocaleString()}</p>
                                            </div>
                                            <div className="border p-3 rounded-lg">
                                                <p className="text-xs text-gray-500">Total Overdue</p>
                                                <p className="text-xl font-semibold text-red-600">₹{selectedReport.totalOverdue?.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Transaction Info */}
                                    <div className="border-t pt-4">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Technical Details</h3>
                                        <div className="bg-gray-50 rounded-lg p-3 text-sm font-mono space-y-1">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Transaction ID:</span>
                                                <span>{selectedReport.transactionId}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Report ID:</span>
                                                <span>{selectedReport.id}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Original PDF:</span>
                                                <span className="truncate max-w-xs">{selectedReport.pdfOriginalUrl}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">DigitalOcean URL:</span>
                                                <span className="truncate max-w-xs">{selectedReport.pdfSpacesUrl || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Raw Data Toggle (For Debugging/Full View) */}
                                    <div className="border-t pt-4">
                                        <details className="group">
                                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-500 hover:text-gray-900">
                                                <span>Raw JSON Data</span>
                                                <span className="transition group-open:rotate-180">
                                                    <ChevronRight className="h-4 w-4" />
                                                </span>
                                            </summary>
                                            <div className="text-xs font-mono bg-gray-50 p-4 rounded-lg mt-2 overflow-auto max-h-96">
                                                <pre>{JSON.stringify(selectedReport, null, 2)}</pre>
                                            </div>
                                        </details>
                                    </div>

                                    {/* PDF Action */}
                                    {selectedReport.pdfSpacesUrl && (
                                        <div className="flex justify-end pt-4">
                                            <a
                                                href={selectedReport.pdfSpacesUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                            >
                                                <Download className="h-4 w-4" /> Download PDF Report
                                            </a>
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
