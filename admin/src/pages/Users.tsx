import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import {
    Users as UsersIcon,
    Mail,
    Phone,
    RefreshCw,
    Loader,
    Download,
    Search,
    CheckSquare,
    Square,
    CheckCircle,
    XCircle,
    Eye,
    X,
    MapPin,
    CreditCard,
    User as UserIcon,
    Trash2,
} from 'lucide-react';
import { userService, userBulkService } from '../services/api';
import { toast } from "sonner";


interface User {
    id: string;
    firstName: string | null;
    middleName: string | null;
    lastName: string | null;
    email: string | null;
    phoneNumber: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    dateOfBirth: string | null;
    gender: string | null;
    address: string | null;
    state: string | null;
    pincode: string | null;
    identityType: string | null;
    identityNumber: string | null;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [deleting, setDeleting] = useState(false);

    // View Modal State
    const [viewingUser, setViewingUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const params: { page?: number; limit?: number } = {
                page: currentPage,
                limit: 20,
            };
            const response = await userService.getAllUsers(params);
            if (response?.data?.users) {
                setUsers(response.data.users || []);
                setPagination({
                    total: response.data.total,
                    page: response.data.page,
                    limit: response.data.limit,
                    totalPages: Math.ceil(response.data.total / response.data.limit)
                });
            } else if (response?.users) {
                setUsers(response.users || []);
                setPagination({
                    total: response.total,
                    page: response.page,
                    limit: response.limit,
                    totalPages: Math.ceil(response.total / response.limit)
                });
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const toggleVerification = async (user: User) => {
        try {
            setUpdatingId(user.id);
            const newStatus = !user.isVerified;
            await userService.updateUser(user.id, { isVerified: newStatus });

            setUsers(prev =>
                prev.map(u =>
                    u.id === user.id ? { ...u, isVerified: newStatus } : u
                )
            );
            toast.success(`User ${newStatus ? 'verified' : 'unverified'} successfully`);
        } catch (err) {
            console.error('Error updating status:', err);
            toast.error("Failed to update user status");
        } finally {
            setUpdatingId(null);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDateOnly = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    // Filter users by search query
    const filteredUsers = users.filter(user => {
        const query = searchQuery.toLowerCase();
        const name = `${user.firstName || ''} ${user.middleName || ''} ${user.lastName || ''}`.toLowerCase();
        const phone = user.phoneNumber || '';
        const email = user.email || '';
        const idNum = user.identityNumber || '';

        return (
            name.includes(query) ||
            email.toLowerCase().includes(query) ||
            phone.includes(query) ||
            idNum.toLowerCase().includes(query)
        );
    });

    const toggleSelectAll = () => {
        if (selectedIds.size === filteredUsers.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredUsers.map(u => u.id)));
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
            ? filteredUsers.filter(u => selectedIds.has(u.id))
            : filteredUsers;

        const excelData = dataToExport.map(user => ({
            'User ID': user.id,
            'Full Name': `${user.firstName || ''} ${user.middleName || ''} ${user.lastName || ''}`.trim() || 'N/A',
            'Phone': user.phoneNumber,
            'Email': user.email || 'N/A',
            'Gender': user.gender || 'N/A',
            'DOB': formatDateOnly(user.dateOfBirth || ''),
            'Address': user.address || 'N/A',
            'State': user.state || 'N/A',
            'Pincode': user.pincode || 'N/A',
            'ID Type': user.identityType || 'N/A',
            'ID Number': user.identityNumber || 'N/A',
            'Verified': user.isVerified ? 'Yes' : 'No',
            'Registered Date': formatDate(user.createdAt),
        }));

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Users');
        XLSX.writeFile(wb, `users_export_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const handleBulkDelete = async () => {
        if (selectedIds.size === 0) {
            toast.error("Please select users to delete");
            return;
        }
        if (!confirm(`Delete ${selectedIds.size} users? This action cannot be undone.`)) return;

        try {
            setDeleting(true);
            await userBulkService.softDeleteUsers(Array.from(selectedIds));
            toast.success(`Deleted ${selectedIds.size} users`);
            setSelectedIds(new Set());
            fetchUsers();
        } catch (err) {
            console.error('Error deleting:', err);
            toast.error("Failed to delete users");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <UsersIcon className="h-8 w-8 text-[#2D3E50]" />
                        User Management
                    </h1>
                    <p className="text-gray-600 mt-1">Manage registered users and verification status</p>
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
                    <button
                        onClick={exportToExcel}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Export</span>
                    </button>
                    <button
                        onClick={fetchUsers}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1a2332] text-white rounded-lg hover:bg-[#0f172a] transition-colors"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, phone, PAN..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2D3E50] focus:border-transparent"
                        />
                    </div>
                    {pagination && (
                        <span className="text-sm text-gray-500 ml-auto">
                            Showing {filteredUsers.length} of {pagination.total} users
                        </span>
                    )}
                </div>
            </div>

            {/* Select All */}
            {filteredUsers.length > 0 && (
                <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-4">
                    <button
                        onClick={toggleSelectAll}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
                    >
                        {selectedIds.size === filteredUsers.length ? (
                            <CheckSquare className="h-5 w-5 text-blue-600" />
                        ) : (
                            <Square className="h-5 w-5 text-gray-400" />
                        )}
                        Select All
                    </button>
                    {selectedIds.size > 0 && (
                        <span className="text-sm text-blue-600 font-medium">
                            {selectedIds.size} selected
                        </span>
                    )}
                </div>
            )}

            {/* User List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D3E50]"></div>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-gray-100">
                        <UsersIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No users found</p>
                    </div>
                ) : (
                    filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className={`bg-white rounded-xl shadow-lg border overflow-hidden ${selectedIds.has(user.id) ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-100'}`}
                        >
                            <div className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    <div className="flex items-start gap-3 flex-1">
                                        <button onClick={() => toggleSelect(user.id)} className="mt-1">
                                            {selectedIds.has(user.id) ? (
                                                <CheckSquare className="h-5 w-5 text-blue-600" />
                                            ) : (
                                                <Square className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {user.firstName || user.lastName
                                                        ? `${user.firstName || ''} ${user.middleName || ''} ${user.lastName || ''}`.trim()
                                                        : 'Unnamed User'}
                                                </h3>
                                                {user.isVerified ? (
                                                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                                        <CheckCircle className="h-3 w-3" /> Verified
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                        <XCircle className="h-3 w-3" /> Unverified
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                                <a href={`tel:${user.phoneNumber}`} className="flex items-center gap-1 hover:text-blue-600">
                                                    <Phone className="h-4 w-4" />
                                                    {user.phoneNumber}
                                                </a>
                                                {user.email && (
                                                    <a href={`mailto:${user.email}`} className="flex items-center gap-1 hover:text-blue-600">
                                                        <Mail className="h-4 w-4" />
                                                        {user.email}
                                                    </a>
                                                )}
                                                {user.identityType && (
                                                    <span className="flex items-center gap-1 font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                                                        <CreditCard className="h-3 w-3" />
                                                        {user.identityType}: {user.identityNumber}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setViewingUser(user)}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200"
                                        >
                                            <Eye className="h-4 w-4" /> View Details
                                        </button>
                                        <button
                                            onClick={() => toggleVerification(user)}
                                            disabled={updatingId === user.id}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${user.isVerified
                                                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                                                : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
                                                }`}
                                        >
                                            {updatingId === user.id ? (
                                                <Loader className="h-4 w-4 animate-spin" />
                                            ) : user.isVerified ? (
                                                <>
                                                    <XCircle className="h-4 w-4" /> Unverify
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="h-4 w-4" /> Verify
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination support... */}
            {pagination && pagination.totalPages > 1 && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {pagination.totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                        disabled={currentPage === pagination.totalPages}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* View User Modal */}
            {viewingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">User Profile</h2>
                                <p className="text-sm text-gray-500">Full details for {viewingUser.phoneNumber}</p>
                            </div>
                            <button
                                onClick={() => setViewingUser(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-8">
                            {/* Personal Info */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-xl">
                                    <UserIcon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Full Name</p>
                                        <p className="text-gray-900 font-medium text-lg">
                                            {`${viewingUser.firstName || ''} ${viewingUser.middleName || ''} ${viewingUser.lastName || ''}`.trim() || 'Not set'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Gender</p>
                                        <p className="text-gray-900 font-medium">{viewingUser.gender || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Date of Birth</p>
                                        <p className="text-gray-900 font-medium">{formatDateOnly(viewingUser.dateOfBirth || '')}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Registered</p>
                                        <p className="text-gray-900 font-medium">{formatDateOnly(viewingUser.createdAt)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
                                <div className="p-3 bg-green-50 rounded-xl">
                                    <MapPin className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Address</p>
                                        <p className="text-gray-900 font-medium">{viewingUser.address || 'Not set'}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">State</p>
                                            <p className="text-gray-900 font-medium">{viewingUser.state || 'Not set'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Pincode</p>
                                            <p className="text-gray-900 font-medium">{viewingUser.pincode || 'Not set'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ID Info */}
                            <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
                                <div className="p-3 bg-purple-50 rounded-xl">
                                    <CreditCard className="h-6 w-6 text-purple-600" />
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Identity Type</p>
                                        <p className="text-gray-900 font-medium">{viewingUser.identityType || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Identity Number</p>
                                        <p className="text-gray-900 font-medium font-mono tracking-wide">{viewingUser.identityNumber || 'Not set'}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <button
                                onClick={() => setViewingUser(null)}
                                className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 shadow-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
