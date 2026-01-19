import { useEffect, useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import {
    Users,
    Phone,
    Mail,
    RefreshCw,
    Loader,
    Download,
    Search,
    CheckSquare,
    Square,
    Trash2,
    Calendar,
    X,
    Filter,
} from 'lucide-react';

import { toast } from "sonner";
import { referralService } from '../services/api';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';

interface ReferralInquiry {
    id: string;
    referrerName: string;
    referrerPhone: string;
    referrerEmail: string | null;
    refereeName: string;
    refereePhone: string;
    refereeEmail: string | null;
    relationship: string | null;
    loanType: string | null;
    remarks: string | null;
    status: string;
    notes: string | null;
    createdAt: string;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

const statuses = ['PENDING', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED'];

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

const Referrals = () => {
    const [inquiries, setInquiries] = useState<ReferralInquiry[]>([]);
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

    const debouncedSearch = useDebounce(searchQuery, 300);

    const fetchReferrals = useCallback(async () => {
        try {
            setLoading(true);
            const params: { status?: string; page?: number; limit?: number; search?: string; dateFrom?: string; dateTo?: string } = {
                page: currentPage,
                limit: 20,
            };
            if (statusFilter) params.status = statusFilter;
            if (debouncedSearch) params.search = debouncedSearch;
            if (dateFrom) params.dateFrom = dateFrom;
            if (dateTo) params.dateTo = dateTo;

            const response = await referralService.getReferrals(params);
            if (response?.data) {
                setInquiries(response.data.inquiries || []);
                setPagination(response.data.pagination || null);
            }
        } catch (err) {
            console.error('Error fetching referrals:', err);
            toast.error("Failed to load referrals");
        } finally {
            setLoading(false);
        }
    }, [statusFilter, currentPage, debouncedSearch, dateFrom, dateTo]);

    useEffect(() => {
        fetchReferrals();
    }, [fetchReferrals]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, statusFilter, dateFrom, dateTo]);

    const updateStatus = async (id: string, status: string) => {
        try {
            setUpdatingId(id);
            await referralService.updateReferralStatus(id, status);
            setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
            toast.success("Status updated");
        } catch (err) {
            console.error('Error updating status:', err);
            toast.error("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.size === 0) {
            toast.error("Please select items to delete");
            return;
        }
        if (!confirm(`Delete ${selectedIds.size} referrals? This cannot be undone.`)) return;

        try {
            setDeleting(true);
            await referralService.bulkDeleteReferrals(Array.from(selectedIds));
            toast.success(`Deleted ${selectedIds.size} referrals`);
            setSelectedIds(new Set());
            fetchReferrals();
        } catch (err) {
            console.error('Error deleting:', err);
            toast.error("Failed to delete");
        } finally {
            setDeleting(false);
        }
    };

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
            case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'CONTACTED': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'IN_PROGRESS': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'COMPLETED': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

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

    const exportToExcel = () => {
        const dataToExport = selectedIds.size > 0
            ? inquiries.filter(i => selectedIds.has(i.id))
            : inquiries;

        const excelData = dataToExport.map(inquiry => ({
            'Referrer Name': inquiry.referrerName,
            'Referrer Phone': inquiry.referrerPhone,
            'Referrer Email': inquiry.referrerEmail || '',
            'Referee Name': inquiry.refereeName,
            'Referee Phone': inquiry.refereePhone,
            'Relationship': inquiry.relationship || '',
            'Loan Type': inquiry.loanType || '',
            'Status': inquiry.status,
            'Date': formatDate(inquiry.createdAt),
        }));

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Referrals');
        XLSX.writeFile(wb, `referrals_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Users className="h-7 w-7 sm:h-8 sm:w-8 text-indigo-600" />
                        Referral Inquiries
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">Manage referral submissions</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {selectedIds.size > 0 && (
                        <button
                            onClick={handleBulkDelete}
                            disabled={deleting}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                            {deleting ? <Loader className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                            Delete ({selectedIds.size})
                        </button>
                    )}
                    <button onClick={exportToExcel} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Export</span>
                    </button>
                    <button onClick={fetchReferrals} disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-[#1a2332] text-white rounded-lg hover:bg-[#0f172a]">
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or phone..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-gray-400" />
                            <Select value={statusFilter === '' ? 'ALL' : statusFilter} onValueChange={(value) => setStatusFilter(value === 'ALL' ? '' : value)}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Status</SelectItem>
                                    {statuses.map((status) => (
                                        <SelectItem key={status} value={status}>{status.replace('_', ' ')}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">From:</span>
                            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">To:</span>
                            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                        </div>
                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                                <X className="h-4 w-4" /> Clear
                            </button>
                        )}
                        {pagination && <span className="text-sm text-gray-500 ml-auto">{inquiries.length} of {pagination.total}</span>}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : inquiries.length === 0 ? (
                    <div className="text-center py-20">
                        <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No referrals found</p>
                        {hasActiveFilters && <button onClick={clearFilters} className="mt-2 text-blue-600 hover:underline">Clear filters</button>}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left">
                                        <button onClick={toggleSelectAll} className="p-1">
                                            {selectedIds.size === inquiries.length && inquiries.length > 0 ? (
                                                <CheckSquare className="h-5 w-5 text-blue-600" />
                                            ) : (
                                                <Square className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Referrer</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase hidden md:table-cell">Referee</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase hidden lg:table-cell">Loan Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase hidden sm:table-cell">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {inquiries.map((inquiry) => (
                                    <tr key={inquiry.id} className={`hover:bg-gray-50 transition-colors ${selectedIds.has(inquiry.id) ? 'bg-blue-50' : ''}`}>
                                        <td className="px-4 py-4">
                                            <button onClick={() => toggleSelect(inquiry.id)} className="p-1">
                                                {selectedIds.has(inquiry.id) ? <CheckSquare className="h-5 w-5 text-blue-600" /> : <Square className="h-5 w-5 text-gray-400" />}
                                            </button>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{inquiry.referrerName}</p>
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <Phone className="h-3 w-3" /> {inquiry.referrerPhone}
                                                </div>
                                                {inquiry.referrerEmail && (
                                                    <div className="flex items-center gap-1 text-sm text-gray-500 hidden sm:flex">
                                                        <Mail className="h-3 w-3" /> {inquiry.referrerEmail}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 hidden md:table-cell">
                                            <div>
                                                <p className="font-medium text-gray-900">{inquiry.refereeName}</p>
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <Phone className="h-3 w-3" /> {inquiry.refereePhone}
                                                </div>
                                                {inquiry.relationship && <p className="text-xs text-purple-600 mt-1">{inquiry.relationship}</p>}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 hidden lg:table-cell">
                                            <span className="text-sm text-gray-700">{inquiry.loanType || '-'}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(inquiry.status)}`}>
                                                {inquiry.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 hidden sm:table-cell">
                                            <span className="text-sm text-gray-500">{formatDate(inquiry.createdAt)}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <Select value={inquiry.status} onValueChange={(value) => updateStatus(inquiry.id, value)} disabled={updatingId === inquiry.id}>
                                                    <SelectTrigger className="w-[100px] sm:w-[120px] h-8">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {statuses.map((status) => (
                                                            <SelectItem key={status} value={status}>{status.replace('_', ' ')}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {updatingId === inquiry.id && <Loader className="h-4 w-4 animate-spin text-gray-500" />}
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
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">Page {currentPage} of {pagination.totalPages}</span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                            disabled={currentPage === pagination.totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Referrals;
