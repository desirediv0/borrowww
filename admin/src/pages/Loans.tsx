import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import {
  CheckCircle,
  Clock,
  DollarSign,
  Edit,
  Eye,
  Filter,
  RefreshCw,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { loanService } from '../services/api';

interface Loan {
  id: string;
  userId: string;
  amount: number;
  status: string;
  purpose: string;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
}

interface LoanStats {
  totalLoans: number;
  pendingLoans: number;
  approvedLoans: number;
  rejectedLoans: number;
  totalAmount: number;
  averageAmount: number;
  applicationsToday: number;
  statusDistribution: Array<{
    status: string;
    count: number;
    color: string;
  }>;
  amountDistribution: Array<{
    range: string;
    count: number;
    color: string;
  }>;
}

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6B7280'];

const Loans: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [stats, setStats] = useState<LoanStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [purposeFilter, setPurposeFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, [statusFilter, purposeFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [loansResponse, statsResponse] = await Promise.all([
        loanService.getAllLoans({
          limit: 50,
          ...(statusFilter && { status: statusFilter }),
          ...(purposeFilter && { purpose: purposeFilter }),
        }),
        loanService.getLoanStats(),
      ]);

      const loansData = loansResponse.data as any;
      const statsData = statsResponse.data as any;

      setLoans(loansData.loans || []);

      // Transform stats data
      const transformedStats: LoanStats = {
        totalLoans: statsData.stats?.totalLoans || 0,
        pendingLoans: statsData.stats?.pendingLoans || 0,
        approvedLoans: statsData.stats?.approvedLoans || 0,
        rejectedLoans: statsData.stats?.rejectedLoans || 0,
        totalAmount: statsData.stats?.totalAmount || 0,
        averageAmount: statsData.stats?.averageAmount || 0,
        applicationsToday: statsData.stats?.applicationsToday || 0,
        statusDistribution: [
          { status: 'Approved', count: statsData.stats?.approvedLoans || 0, color: '#10B981' },
          { status: 'Pending', count: statsData.stats?.pendingLoans || 0, color: '#F59E0B' },
          { status: 'Rejected', count: statsData.stats?.rejectedLoans || 0, color: '#EF4444' },
        ],
        amountDistribution: [
          { range: '0-50K', count: statsData.amountRanges?.small || 0, color: '#10B981' },
          { range: '50K-2L', count: statsData.amountRanges?.medium || 0, color: '#3B82F6' },
          { range: '2L-10L', count: statsData.amountRanges?.large || 0, color: '#F59E0B' },
          { range: '10L+', count: statsData.amountRanges?.xlarge || 0, color: '#EF4444' },
        ],
      };

      setStats(transformedStats);
    } catch (err) {
      console.error('Error fetching loans data:', err);
      setError('Failed to load loans data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (loanId: string, newStatus: string) => {
    try {
      await loanService.updateLoanStatus(loanId, newStatus);
      fetchData(); // Refresh the data
    } catch (err) {
      console.error('Error updating loan status:', err);
      setError('Failed to update loan status');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loans</h1>
          <p className="text-muted-foreground">Manage loan applications and track their status</p>
        </div>
        <Button onClick={fetchData} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 text-red-500">⚠️</div>
              <div>
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLoans}</div>
              <p className="text-xs text-muted-foreground">All applications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingLoans}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalAmount)}</div>
              <p className="text-xs text-muted-foreground">
                Avg: {formatCurrency(stats.averageAmount)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Apps</CardTitle>
              <RefreshCw className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.applicationsToday}</div>
              <p className="text-xs text-muted-foreground">New applications</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts Section */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Loan Status Distribution</CardTitle>
              <CardDescription>Distribution of loan applications by status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ status, percent }) =>
                      `${status} ${((percent || 0) * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {stats.statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amount Distribution</CardTitle>
              <CardDescription>Distribution of loan amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.amountDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={purposeFilter}
              onChange={(e) => setPurposeFilter(e.target.value)}
              className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">All Purposes</option>
              <option value="personal">Personal</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
              <option value="home">Home</option>
              <option value="vehicle">Vehicle</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loans Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loans.map((loan) => (
          <Card key={loan.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">
                      {loan.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{loan.user?.name || 'Unknown User'}</CardTitle>
                    <CardDescription>{loan.user?.email || 'No email'}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(loan.status)}
                  <Badge variant={getStatusVariant(loan.status)}>{loan.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium text-lg">{formatCurrency(loan.amount)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Purpose</p>
                  <p className="font-medium capitalize">{loan.purpose}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Applied</p>
                  <p className="font-medium">{format(new Date(loan.createdAt), 'MMM dd, yyyy')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ID</p>
                  <p className="font-medium text-xs font-mono">{loan.id.slice(-8)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                {loan.status.toLowerCase() === 'pending' && (
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(loan.id, 'approved')}
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(loan.id, 'rejected')}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {loans.length === 0 && !loading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No loans found</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Loans;
