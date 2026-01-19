import { useEffect, useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import {
    CreditCard,
    Phone,
    Clock,
    Filter,
    RefreshCw,
    CheckCircle,
    Loader,
    Download,
    Search,
    CheckSquare,
    Square,
    Trash2,
    Calendar,
    X,
} from 'lucide-react';
import { inquiryService } from '../services/api';

import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';

interface CreditCheckInquiry {
    id: string;
    firstName: string;
    mobileNumber: string;
    consent: boolean;
    status: string;
    notes: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

const statusOptions = ['PENDING', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED'];

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const CreditCheckInquiries = () => {
    const [inquiries, setInquiries] = useState<CreditCheckInquiry[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [deleting, setDeleting] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    // Debounce search query (300ms)
    const debouncedSearch = useDebounce(searchQuery, 300);

    // Fetch with all filters
    const fetchInquiries = useCallback(async () => {
        try {
            setLoading(true);
            const params: { status?: string; page?: number; limit?: number; search?: string; dateFrom?: string; dateTo?: string } = {
                page: currentPage,
                limit: 20,
            };
            if (statusFilter) {
                params.status = statusFilter;
            }
            if (debouncedSearch) {
                params.search = debouncedSearch;
            }
            if (dateFrom) {
                params.dateFrom = dateFrom;
            }
            if (dateTo) {
                params.dateTo = dateTo;
            }
            const response = await inquiryService.getCreditCheckInquiries(params);
            if (response?.data) {
                setInquiries(response.data.inquiries || []);
                setPagination(response.data.pagination || null);
            }
        } catch (err) {
            console.error('Error fetching inquiries:', err);
            toast.error("Failed to fetch inquiries");
        } finally {
            setLoading(false);
        }
    }, [statusFilter, currentPage, debouncedSearch, dateFrom, dateTo]);

    useEffect(() => {
        fetchInquiries();
    }, [fetchInquiries]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, statusFilter, dateFrom, dateTo]);

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            setUpdatingId(id);
            await inquiryService.updateInquiryStatus('credit-check', id, newStatus);
            setInquiries(prev =>
                prev.map(inquiry =>
                    inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
                )
            );
            toast.success("Status updated successfully");
        } catch (err) {
            console.error('Error updating status:', err);
            toast.error("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    // Bulk delete handler
    const handleBulkDelete = async () => {
        if (selectedIds.size === 0) {
            toast.error("Please select items to delete");
            return;
        }

        if (!confirm(`Are you sure you want to delete ${selectedIds.size} inquiries? This action cannot be undone.`)) {
            return;
        }

        try {
            setDeleting(true);
            await inquiryService.bulkDeleteCreditCheckInquiries(Array.from(selectedIds));
            toast.success(`Successfully deleted ${selectedIds.size} inquiries`);
            setSelectedIds(new Set());
            fetchInquiries();
        } catch (err) {
            console.error('Error deleting inquiries:', err);
            toast.error("Failed to delete inquiries");
        } finally {
            setDeleting(false);
        }
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery('');
        setStatusFilter('');
        setDateFrom('');
        setDateTo('');
        setCurrentPage(1);
    };

    const hasActiveFilters = searchQuery || statusFilter || dateFrom || dateTo;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'CONTACTED':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'IN_PROGRESS':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'COMPLETED':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'REJECTED':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Select all
    const toggleSelectAll = () => {
        if (selectedIds.size === inquiries.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(inquiries.map(i => i.id)));
        }
    };

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    // Export Excel
    const exportToExcel = () => {
        const dataToExport = selectedIds.size > 0
            ? inquiries.filter(i => selectedIds.has(i.id))
            : inquiries;

        const excelData = dataToExport.map(inquiry => ({
            'Name': inquiry.firstName,
            'Mobile': inquiry.mobileNumber,
            'Consent': inquiry.consent ? 'Yes' : 'No',
            'Status': inquiry.status,
            'Date': formatDate(inquiry.createdAt),
        }));

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Credit Check Inquiries');
        XLSX.writeFile(wb, `credit_check_inquiries_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <CreditCard className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600" />
                        Credit Check Inquiries
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">Manage credit check form submissions</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {selectedIds.size > 0 && (
                        <button
                            onClick={handleBulkDelete}
                            disabled={deleting}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                            {deleting ? <Loader className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                            Delete ({selectedIds.size})
                        </button>
                    )}
                    <button
                        onClick={exportToExcel}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Export</span> {selectedIds.size > 0 ? `(${selectedIds.size})` : ''}
                    </button>
                    <button
                        onClick={fetchInquiries}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1a2332] text-white rounded-lg hover:bg-[#0f172a] transition-colors"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex flex-col gap-4">
                    {/* Search Row */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or mobile..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-gray-400" />
                            <Select
                                value={statusFilter === '' ? 'ALL' : statusFilter}
                                onValueChange={(value) => setStatusFilter(value === 'ALL' ? '' : value)}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Status</SelectItem>
                                    {statusOptions.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status.replace('_', ' ')}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Date Filters Row */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">From:</span>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">To:</span>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="h-4 w-4" />
                                Clear Filters
                            </button>
                        )}
                        {pagination && (
                            <span className="text-sm text-gray-500 ml-auto">
                                Showing {inquiries.length} of {pagination.total} inquiries
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : inquiries.length === 0 ? (
                    <div className="text-center py-20">
                        <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No credit check inquiries found</p>
                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="mt-2 text-blue-600 hover:underline">
                                Clear filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 sm:px-6 py-4 text-left">
                                        <button onClick={toggleSelectAll} className="p-1">
                                            {selectedIds.size === inquiries.length && inquiries.length > 0 ? (
                                                <CheckSquare className="h-5 w-5 text-blue-600" />
                                            ) : (
                                                <Square className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </th>
                                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                                        Mobile
                                    </th>
                                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                                        Date
                                    </th>
                                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {inquiries.map((inquiry) => (
                                    <tr key={inquiry.id} className={`hover:bg-gray-50 transition-colors ${selectedIds.has(inquiry.id) ? 'bg-blue-50' : ''}`}>
                                        <td className="px-4 sm:px-6 py-4">
                                            <button onClick={() => toggleSelect(inquiry.id)} className="p-1">
                                                {selectedIds.has(inquiry.id) ? (
                                                    <CheckSquare className="h-5 w-5 text-blue-600" />
                                                ) : (
                                                    <Square className="h-5 w-5 text-gray-400" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="font-medium text-gray-900">{inquiry.firstName}</div>
                                            <div className="sm:hidden text-sm text-gray-500">{inquiry.mobileNumber}</div>
                                            {inquiry.consent && (
                                                <span className="inline-flex items-center gap-1 text-xs text-green-600">
                                                    <CheckCircle className="h-3 w-3" />
                                                    Consent
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                                            <a
                                                href={`tel:${inquiry.mobileNumber}`}
                                                className="flex items-center gap-2 text-gray-900 hover:text-blue-600"
                                            >
                                                <Phone className="h-4 w-4" />
                                                {inquiry.mobileNumber}
                                            </a>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(inquiry.status)}`}>
                                                {inquiry.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <Clock className="h-4 w-4" />
                                                {formatDate(inquiry.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Select
                                                    value={inquiry.status}
                                                    onValueChange={(value) => updateStatus(inquiry.id, value)}
                                                    disabled={updatingId === inquiry.id}
                                                >
                                                    <SelectTrigger className="w-[120px] sm:w-[140px] h-8">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {statusOptions.map((status) => (
                                                            <SelectItem key={status} value={status}>
                                                                {status.replace('_', ' ')}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {updatingId === inquiry.id && (
                                                    <Loader className="h-4 w-4 animate-spin text-gray-500" />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {pagination.totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                            disabled={currentPage === pagination.totalPages}
                            className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreditCheckInquiries;
