import { useEffect, useState } from 'react';
import {
  CreditCard,
  Home,
  MessageSquare,
  Phone,
  TrendingUp,
  Activity,
  ArrowUpRight,
  RefreshCw,
} from 'lucide-react';
import { inquiryService } from '../services/api';
import { Link } from 'react-router-dom';

interface DashboardStats {
  counts: {
    creditCheck: number;
    contact: number;
    homeLoan: number;
    total: number;
  };
  recentInquiries: {
    creditCheck: Array<{
      id: string;
      firstName: string;
      mobileNumber: string;
      status: string;
      createdAt: string;
    }>;
    contact: Array<{
      id: string;
      name: string;
      email: string;
      subject: string;
      status: string;
      createdAt: string;
    }>;
    homeLoan: Array<{
      id: string;
      name: string;
      phone: string;
      loanAmount: string;
      status: string;
      createdAt: string;
    }>;
  };
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await inquiryService.getDashboardStats();
      if (response?.data) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Failed to load dashboard data. Please check if the server is running.');
    } finally {
      setLoading(false);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-700';
      case 'CONTACTED':
        return 'bg-blue-100 text-blue-700';
      case 'IN_PROGRESS':
        return 'bg-purple-100 text-purple-700';
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-700';
      case 'REJECTED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2D3E50] border-t-transparent"></div>
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardStats}
            className="px-6 py-3 bg-[#2D3E50] text-white rounded-xl font-medium hover:bg-[#223042] transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Credit Check',
      value: stats?.counts.creditCheck || 0,
      icon: CreditCard,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      href: '/credit-check-inquiries',
    },
    {
      title: 'Contact',
      value: stats?.counts.contact || 0,
      icon: MessageSquare,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      href: '/contact-inquiries',
    },
    {
      title: 'Home Loan',
      value: stats?.counts.homeLoan || 0,
      icon: Home,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      href: '/home-loan-inquiries',
    },
    {
      title: 'Total Inquiries',
      value: stats?.counts.total || 0,
      icon: TrendingUp,
      gradient: 'from-[#2D3E50] to-[#3A6EA5]',
      bgGradient: 'from-slate-50 to-slate-100',
      href: '#',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's your overview</p>
        </div>
        <button
          onClick={fetchDashboardStats}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            to={stat.href}
            className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-4 sm:p-6 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 group`}
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                  {stat.href !== '#' && (
                    <ArrowUpRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Inquiries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Credit Check */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Credit Checks</h3>
                <p className="text-xs text-gray-500">Recent submissions</p>
              </div>
            </div>
          </div>
          <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 max-h-[280px] overflow-y-auto">
            {stats?.recentInquiries.creditCheck.slice(0, 4).map((inquiry) => (
              <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{inquiry.firstName}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {inquiry.mobileNumber}
                  </p>
                </div>
                <div className="text-right ml-2 flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1">{formatDate(inquiry.createdAt)}</p>
                </div>
              </div>
            ))}
            {(!stats?.recentInquiries.creditCheck || stats.recentInquiries.creditCheck.length === 0) && (
              <div className="text-center py-6">
                <CreditCard className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No inquiries yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Contact */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Contact Messages</h3>
                <p className="text-xs text-gray-500">Recent messages</p>
              </div>
            </div>
          </div>
          <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 max-h-[280px] overflow-y-auto">
            {stats?.recentInquiries.contact.slice(0, 4).map((inquiry) => (
              <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{inquiry.name}</p>
                  <p className="text-xs text-gray-500 truncate">{inquiry.subject || 'General Inquiry'}</p>
                </div>
                <div className="text-right ml-2 flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1">{formatDate(inquiry.createdAt)}</p>
                </div>
              </div>
            ))}
            {(!stats?.recentInquiries.contact || stats.recentInquiries.contact.length === 0) && (
              <div className="text-center py-6">
                <MessageSquare className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No messages yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Home Loan */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Home Loans</h3>
                <p className="text-xs text-gray-500">Recent applications</p>
              </div>
            </div>
          </div>
          <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 max-h-[280px] overflow-y-auto">
            {stats?.recentInquiries.homeLoan.slice(0, 4).map((inquiry) => (
              <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{inquiry.name}</p>
                  <p className="text-xs text-gray-500">
                    {inquiry.loanAmount ? `₹${parseInt(inquiry.loanAmount).toLocaleString('en-IN')}` : 'Amount TBD'}
                  </p>
                </div>
                <div className="text-right ml-2 flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1">{formatDate(inquiry.createdAt)}</p>
                </div>
              </div>
            ))}
            {(!stats?.recentInquiries.homeLoan || stats.recentInquiries.homeLoan.length === 0) && (
              <div className="text-center py-6">
                <Home className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No applications yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions Banner */}
      <div className="bg-gradient-to-r from-[#2D3E50] via-[#3A6EA5] to-[#2D3E50] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)' }}></div>
        </div>
        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">Quick Actions</h3>
              <p className="text-white/70 text-sm">Manage your inquiries efficiently</p>
            </div>
            <a
              href="/tracking"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#2D3E50] rounded-xl font-semibold hover:bg-gray-100 transition-colors self-start sm:self-auto"
            >
              <Activity className="h-5 w-5" />
              View Tracking
            </a>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="/credit-check-inquiries"
              className="px-4 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center gap-2 border border-white/20"
            >
              <CreditCard className="h-4 w-4" />
              Credit Checks
            </a>
            <a
              href="/contact-inquiries"
              className="px-4 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center gap-2 border border-white/20"
            >
              <MessageSquare className="h-4 w-4" />
              Contact Messages
            </a>
            <a
              href="/home-loan-inquiries"
              className="px-4 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center gap-2 border border-white/20"
            >
              <Home className="h-4 w-4" />
              Home Loans
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
