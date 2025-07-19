import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Eye,
  Filter,
  Phone,
  Search,
  TrendingUp,
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
import { cibilService } from '../services/api';

interface CibilEntry {
  id: string;
  score?: number;
  panNumber?: string;
  phoneNumber?: string;
  status: 'SUBMITTED' | 'UNSUBMITTED' | 'PROCESSING' | 'FAILED';
  isSubmitted: boolean;
  createdAt: string;
  expiresAt?: string;
  user: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    cibilCheckCount: number;
    lastCibilCheck?: string;
  };
}

interface CibilStats {
  totalReports: number;
  submittedReports: number;
  unsubmittedReports: number;
  failedReports: number;
  averageScore?: number;
  submissionsToday: number;
  scoreDistribution: Array<{
    range: string;
    count: number;
    color: string;
  }>;
}

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

const CibilData: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'submitted' | 'unsubmitted'>('submitted');
  const [submittedData, setSubmittedData] = useState<CibilEntry[]>([]);
  const [unsubmittedData, setUnsubmittedData] = useState<CibilEntry[]>([]);
  const [stats, setStats] = useState<CibilStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minScore: '',
    maxScore: '',
    status: '',
  });

  // Fetch CIBIL statistics
  const fetchStats = async () => {
    try {
      const response = await cibilService.getCibilStats();
      if (response.success) {
        const responseData = response.data as any;
        const statsData: CibilStats = {
          totalReports: responseData.totalReports || 0,
          submittedReports: responseData.submittedReports || 0,
          unsubmittedReports: responseData.unsubmittedReports || 0,
          failedReports: responseData.failedReports || 0,
          averageScore: responseData.averageScore,
          submissionsToday: responseData.submissionsToday || 0,
          scoreDistribution: [
            {
              range: 'Excellent (750+)',
              count: responseData.excellentCount || 0,
              color: '#10B981',
            },
            { range: 'Good (650-749)', count: responseData.goodCount || 0, color: '#3B82F6' },
            { range: 'Fair (550-649)', count: responseData.fairCount || 0, color: '#F59E0B' },
            { range: 'Poor (<550)', count: responseData.poorCount || 0, color: '#EF4444' },
          ],
        };
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to load CIBIL statistics');
    }
  };

  // Fetch submitted CIBIL data
  const fetchSubmittedData = async () => {
    try {
      const params = {
        page: 1,
        limit: 50,
        ...(searchTerm && { search: searchTerm }),
        ...(filters.minScore && { minScore: parseInt(filters.minScore) }),
        ...(filters.maxScore && { maxScore: parseInt(filters.maxScore) }),
      };

      const response = await cibilService.getSubmittedCibilData(params);
      if (response.success) {
        const responseData = response.data as any;
        setSubmittedData(responseData.data || []);
      }
    } catch (error) {
      console.error('Error fetching submitted data:', error);
      setError('Failed to load submitted CIBIL data');
    }
  };

  // Fetch unsubmitted CIBIL data
  const fetchUnsubmittedData = async () => {
    try {
      const params = {
        page: 1,
        limit: 50,
        ...(searchTerm && { search: searchTerm }),
      };

      const response = await cibilService.getUnsubmittedCibilData(params);
      if (response.success) {
        const responseData = response.data as any;
        setUnsubmittedData(responseData.data || []);
      }
    } catch (error) {
      console.error('Error fetching unsubmitted data:', error);
      setError('Failed to load unsubmitted CIBIL data');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([fetchStats(), fetchSubmittedData(), fetchUnsubmittedData()]);
      setLoading(false);
    };

    loadData();
  }, [searchTerm, filters]);

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-blue-600';
    if (score >= 550) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score?: number) => {
    if (!score) return 'N/A';
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    return 'Poor';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'PROCESSING':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'FAILED':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Eye className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return 'success';
      case 'PROCESSING':
        return 'warning';
      case 'FAILED':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const currentData = activeTab === 'submitted' ? submittedData : unsubmittedData;

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
          <h1 className="text-3xl font-bold tracking-tight">CIBIL Records</h1>
          <p className="text-muted-foreground">
            View and manage user CIBIL reports and tracking data
          </p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline">
          <TrendingUp className="h-4 w-4 mr-2" />
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
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReports}</div>
              <p className="text-xs text-muted-foreground">All CIBIL entries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submitted</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.submittedReports}</div>
              <p className="text-xs text-muted-foreground">+{stats.submissionsToday} today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unsubmitted</CardTitle>
              <Eye className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.unsubmittedReports}</div>
              <p className="text-xs text-muted-foreground">Pending submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.averageScore ? Math.round(stats.averageScore) : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">Across all reports</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts Section */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Score Distribution</CardTitle>
              <CardDescription>Distribution of CIBIL scores across users</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.scoreDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ range, percent }) => `${range} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {stats.scoreDistribution.map((entry, index) => (
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
              <CardTitle>Report Status</CardTitle>
              <CardDescription>Submitted vs Unsubmitted reports</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: 'Submitted', value: stats.submittedReports, color: '#10B981' },
                    { name: 'Unsubmitted', value: stats.unsubmittedReports, color: '#F59E0B' },
                    { name: 'Failed', value: stats.failedReports, color: '#EF4444' },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min Score"
                value={filters.minScore}
                onChange={(e) => setFilters((prev) => ({ ...prev, minScore: e.target.value }))}
                className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring w-24"
              />
              <input
                type="number"
                placeholder="Max Score"
                value={filters.maxScore}
                onChange={(e) => setFilters((prev) => ({ ...prev, maxScore: e.target.value }))}
                className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring w-24"
              />
              <select
                value={filters.status}
                onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All Status</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="PROCESSING">Processing</option>
                <option value="FAILED">Failed</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <Button
          variant={activeTab === 'submitted' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('submitted')}
          className="flex-1"
        >
          Submitted ({submittedData.length})
        </Button>
        <Button
          variant={activeTab === 'unsubmitted' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('unsubmitted')}
          className="flex-1"
        >
          Unsubmitted ({unsubmittedData.length})
        </Button>
      </div>

      {/* Data Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentData.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {entry.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{entry.user.name}</CardTitle>
                    <CardDescription>{entry.user.email}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(entry.status)}
                  <Badge variant={getStatusVariant(entry.status)}>{entry.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">CIBIL Score</p>
                  <p className={`font-medium ${getScoreColor(entry.score)}`}>
                    {entry.score ? `${entry.score} (${getScoreLabel(entry.score)})` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{entry.phoneNumber || entry.user.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">PAN</p>
                  <p className="font-medium">{entry.panNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="font-medium">{format(new Date(entry.createdAt), 'MMM dd, yyyy')}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="text-sm text-muted-foreground">
                  {entry.user.cibilCheckCount} total checks
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {currentData.length === 0 && !loading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No {activeTab} CIBIL records found</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CibilData;
