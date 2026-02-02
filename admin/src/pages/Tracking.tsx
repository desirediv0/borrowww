import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Activity,
    User,
    Users,
    Globe,
    Clock,
    Monitor,
    Smartphone,
    Eye,
    RefreshCw,
    MapPin,
    Trash2,
    CheckSquare,
    Square,
    Loader,
    Search,
} from "lucide-react";
import { fetchAllSessions } from "../services/session";
import { sessionService } from "../services/api";
import { toast } from "sonner";

interface PageVisit {
    page: string;
    url?: string;
    enteredAt?: string;
    leftAt?: string;
    timestamp?: string;
}

interface DeviceInfo {
    device?: string;
    browser?: string;
    os?: string;
    userAgent?: string;
}

interface UserData {
    id?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    phone?: string;
    phoneNumber?: string;
}

interface UserSession {
    id: string;
    sessionId: string;
    userId?: string;
    user?: UserData;
    userType: 'user' | 'non-user' | 'user-deleted';
    currentPage?: string;
    pagesVisited: PageVisit[];
    totalPageViews: number;
    ipAddress?: string;
    userAgent?: string;
    deviceInfo?: DeviceInfo | string;
    isActive: boolean;
    startTime: string;
    lastActivity: string;
    endTime?: string;
}

const Tracking = () => {
    const [userSessions, setUserSessions] = useState<UserSession[]>([]);
    const [nonUserSessions, setNonUserSessions] = useState<UserSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<'all' | 'users' | 'guests'>('all');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [deleting, setDeleting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const processSession = (session: UserSession) => {
        let parsedDeviceInfo: DeviceInfo = {};
        if (typeof session.deviceInfo === 'string') {
            try {
                parsedDeviceInfo = JSON.parse(session.deviceInfo);
            } catch (e) {
                console.error('Error parsing device info', e);
            }
        } else if (typeof session.deviceInfo === 'object') {
            parsedDeviceInfo = session.deviceInfo || {};
        }

        return {
            ...session,
            deviceInfo: parsedDeviceInfo,
            ipAddress: (session.ipAddress === '::1' || session.ipAddress === '127.0.0.1') ? 'Localhost' : session.ipAddress
        };
    };

    const fetchSessions = async () => {
        setLoading(true);
        setError("");
        try {
            // SECURITY: Session cookie is sent automatically via credentials: 'include'
            const data = await fetchAllSessions();
            const processedUser = (data.userSessions || []).map(processSession);
            const processedNonUser = (data.nonUserSessions || []).map(processSession);

            setUserSessions(processedUser);
            setNonUserSessions(processedNonUser);
        } catch (err) {
            // If 401, redirect to login
            if (err instanceof Error && err.message.includes('401')) {
                navigate("/login");
                return;
            }
            setError("Failed to fetch sessions. Please check if the server is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, [navigate]);

    const handleBulkDelete = async () => {
        if (selectedIds.size === 0) {
            toast.error("Please select sessions to delete");
            return;
        }
        if (!confirm(`Delete ${selectedIds.size} sessions? This cannot be undone.`)) return;

        try {
            setDeleting(true);
            await sessionService.softDeleteSessions(Array.from(selectedIds));
            toast.success(`Deleted ${selectedIds.size} sessions`);
            setSelectedIds(new Set());
            fetchSessions();
        } catch (err) {
            console.error('Error deleting:', err);
            toast.error("Failed to delete sessions");
        } finally {
            setDeleting(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getDeviceIcon = (deviceInfo?: DeviceInfo) => {
        if (!deviceInfo) return <Monitor className="h-4 w-4" />;
        const deviceType = (deviceInfo as any).device || 'desktop';
        return deviceType === 'mobile' ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />;
    };

    const allSessions = [...userSessions, ...nonUserSessions].sort(
        (a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
    );

    // Filter by tab and search
    const getFilteredSessions = () => {
        let sessions = activeTab === 'all' ? allSessions : activeTab === 'users' ? userSessions : nonUserSessions;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            sessions = sessions.filter(s =>
                s.user?.firstName?.toLowerCase().includes(q) ||
                s.user?.phoneNumber?.includes(q) ||
                s.ipAddress?.includes(q) ||
                s.currentPage?.toLowerCase().includes(q)
            );
        }
        return sessions;
    };

    const filteredSessions = getFilteredSessions();

    const toggleSelectAll = () => {
        if (selectedIds.size === filteredSessions.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredSessions.map(s => s.id)));
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

    const SessionCard = ({ session, isUser }: { session: UserSession; isUser: boolean }) => (
        <div className={`bg-white rounded-xl border ${selectedIds.has(session.id) ? 'border-blue-400 ring-2 ring-blue-100' : isUser ? 'border-blue-200' : 'border-emerald-200'} shadow-sm overflow-hidden hover:shadow-md transition-shadow`}>
            <div className={`p-4 ${isUser ? 'bg-gradient-to-r from-blue-50 to-white' : 'bg-gradient-to-r from-emerald-50 to-white'} border-b ${isUser ? 'border-blue-100' : 'border-emerald-100'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => toggleSelect(session.id)} className="p-1">
                            {selectedIds.has(session.id) ? (
                                <CheckSquare className="h-5 w-5 text-blue-600" />
                            ) : (
                                <Square className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-100' : 'bg-emerald-100'}`}>
                            {isUser ? <User className={`h-5 w-5 text-blue-600`} /> : <Globe className={`h-5 w-5 text-emerald-600`} />}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">
                                {isUser ? (session.user?.firstName || session.user?.name || 'Logged In User') : 'Guest Visitor'}
                            </p>
                            <p className="text-xs text-gray-500">
                                {isUser ? (session.user?.phoneNumber || session.user?.email || session.userId) : 'Anonymous'}
                            </p>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${session.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {session.isActive ? '● Active' : 'Ended'}
                    </span>
                </div>
            </div>

            <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Current:</span>
                    <span className="font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded truncate max-w-[150px]">
                        {session.currentPage || 'N/A'}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Views:</span>
                        <span className="font-semibold text-gray-900">{session.totalPageViews}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {getDeviceIcon(typeof session.deviceInfo === 'object' ? session.deviceInfo : undefined)}
                        <span className="text-gray-600 truncate text-xs">
                            {typeof session.deviceInfo === 'object' && session.deviceInfo ? `${session.deviceInfo.browser || ''} / ${session.deviceInfo.os || ''}` : 'Unknown'}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{session.ipAddress || 'Unknown IP'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(session.lastActivity)}</span>
                    </div>
                </div>

                {session.pagesVisited && session.pagesVisited.length > 0 && (
                    <div className="pt-3 border-t border-gray-100">
                        <p className="text-xs font-medium text-gray-600 mb-2">Recent Pages:</p>
                        <div className="flex flex-wrap gap-1">
                            {session.pagesVisited.slice(-4).map((page, idx) => (
                                <span
                                    key={idx}
                                    className={`px-2 py-1 rounded text-xs ${isUser ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}`}
                                >
                                    {page.page || page.url || 'Unknown'}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Activity className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600" />
                        User Tracking
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">Monitor active sessions and page visits</p>
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
                        onClick={fetchSessions}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1a2332] text-white rounded-lg hover:bg-[#0f172a]"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
                            <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{allSessions.length}</p>
                            <p className="text-xs text-gray-500">Total</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{userSessions.length}</p>
                            <p className="text-xs text-gray-500">Users</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                            <Globe className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{nonUserSessions.length}</p>
                            <p className="text-xs text-gray-500">Guests</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, phone, IP, page..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                        {[
                            { key: 'all', label: 'All', count: allSessions.length },
                            { key: 'users', label: 'Users', count: userSessions.length },
                            { key: 'guests', label: 'Guests', count: nonUserSessions.length },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                {tab.label} ({tab.count})
                            </button>
                        ))}
                    </div>
                    {filteredSessions.length > 0 && (
                        <button onClick={toggleSelectAll} className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
                            {selectedIds.size === filteredSessions.length && filteredSessions.length > 0 ? (
                                <CheckSquare className="h-5 w-5 text-blue-600" />
                            ) : (
                                <Square className="h-5 w-5 text-gray-400" />
                            )}
                            Select All
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600">Loading sessions...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <Activity className="h-8 w-8 text-red-600" />
                    </div>
                    <p className="text-red-600 text-center max-w-md">{error}</p>
                    <button onClick={fetchSessions} className="px-4 py-2 bg-[#1a2332] text-white rounded-lg font-medium hover:bg-[#0f172a]">Retry</button>
                </div>
            ) : filteredSessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white rounded-xl border border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No sessions found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredSessions.map((session) => (
                        <SessionCard key={session.id} session={session} isUser={session.userType === 'user'} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tracking;
