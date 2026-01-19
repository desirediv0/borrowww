import { useEffect, useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import {
    MessageSquare,
    Mail,
    Phone,
    Clock,
    Filter,
    RefreshCw,
    Loader,
    FileText,
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

interface ContactInquiry {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    status: string;
    notes: string | null;
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
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

const ContactInquiries = () => {
    const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [deleting, setDeleting] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const debouncedSearch = useDebounce(searchQuery, 300);

    const fetchInquiries = useCallback(async () => {
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

            const response = await inquiryService.getContactInquiries(params);
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

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, statusFilter, dateFrom, dateTo]);

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            setUpdatingId(id);
            await inquiryService.updateInquiryStatus('contact', id, newStatus);
            setInquiries(prev =>
                prev.map(inquiry =>
                    inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
                )
            );
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
        if (!confirm(`Delete ${selectedIds.size} inquiries? This cannot be undone.`)) return;

        try {
            setDeleting(true);
            await inquiryService.bulkDeleteContactInquiries(Array.from(selectedIds));
            toast.success(`Deleted ${selectedIds.size} inquiries`);
            setSelectedIds(new Set());
            fetchInquiries();
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
            case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'CONTACTED': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'IN_PROGRESS': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-200';
            case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
            'Name': inquiry.name,
            'Email': inquiry.email,
            'Phone': inquiry.phone || '',
            'Subject': inquiry.subject || '',
            'Message': inquiry.message,
            'Status': inquiry.status,
            'Date': formatDate(inquiry.createdAt),
        }));

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Contact Inquiries');
        XLSX.writeFile(wb, `contact_inquiries_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <MessageSquare className="h-7 w-7 sm:h-8 sm:w-8 text-green-600" />
                        Contact Inquiries
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">Manage contact form submissions</p>
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
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Export</span>
                    </button>
                    <button
                        onClick={fetchInquiries}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1a2332] text-white rounded-lg hover:bg-[#0f172a]"
                    >
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
                                placeholder="Search by name, email, phone..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">From:</span>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">To:</span>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                            />
                        </div>
                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                                <X className="h-4 w-4" /> Clear
                            </button>
                        )}
                        {pagination && (
                            <span className="text-sm text-gray-500 ml-auto">
                                {inquiries.length} of {pagination.total}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Select All */}
            {inquiries.length > 0 && (
                <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 flex items-center gap-4">
                    <button onClick={toggleSelectAll} className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
                        {selectedIds.size === inquiries.length && inquiries.length > 0 ? (
                            <CheckSquare className="h-5 w-5 text-blue-600" />
                        ) : (
                            <Square className="h-5 w-5 text-gray-400" />
                        )}
                        Select All
                    </button>
                    {selectedIds.size > 0 && (
                        <span className="text-sm text-blue-600 font-medium">{selectedIds.size} selected</span>
                    )}
                </div>
            )}

            {/* Cards */}
            <div className="space-y-4">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : inquiries.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-gray-200">
                        <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No contact inquiries found</p>
                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="mt-2 text-blue-600 hover:underline">Clear filters</button>
                        )}
                    </div>
                ) : (
                    inquiries.map((inquiry) => (
                        <div
                            key={inquiry.id}
                            className={`bg-white rounded-xl shadow-lg border overflow-hidden ${selectedIds.has(inquiry.id) ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200'}`}
                        >
                            <div className="p-4 sm:p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    <div className="flex items-start gap-3 flex-1">
                                        <button onClick={() => toggleSelect(inquiry.id)} className="mt-1">
                                            {selectedIds.has(inquiry.id) ? (
                                                <CheckSquare className="h-5 w-5 text-blue-600" />
                                            ) : (
                                                <Square className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{inquiry.name}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(inquiry.status)}`}>
                                                    {inquiry.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                                <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1 hover:text-blue-600">
                                                    <Mail className="h-4 w-4" /> {inquiry.email}
                                                </a>
                                                {inquiry.phone && (
                                                    <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1 hover:text-blue-600">
                                                        <Phone className="h-4 w-4" /> {inquiry.phone}
                                                    </a>
                                                )}
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" /> {formatDate(inquiry.createdAt)}
                                                </span>
                                            </div>
                                            {inquiry.subject && (
                                                <p className="mt-2 text-sm font-medium text-gray-700">
                                                    <FileText className="h-4 w-4 inline mr-1" />
                                                    {inquiry.subject}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Select
                                            value={inquiry.status}
                                            onValueChange={(value) => updateStatus(inquiry.id, value)}
                                            disabled={updatingId === inquiry.id}
                                        >
                                            <SelectTrigger className="w-[120px] sm:w-[140px] h-9">
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
                                        {updatingId === inquiry.id && <Loader className="h-4 w-4 animate-spin text-gray-500" />}
                                        <button
                                            onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}
                                            className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                        >
                                            {expandedId === inquiry.id ? 'Hide' : 'View'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {expandedId === inquiry.id && (
                                <div className="px-4 sm:px-6 pb-6">
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Message:</h4>
                                        <p className="text-gray-600 whitespace-pre-wrap">{inquiry.message}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {pagination.totalPages}
                    </span>
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
    );
};

export default ContactInquiries;
