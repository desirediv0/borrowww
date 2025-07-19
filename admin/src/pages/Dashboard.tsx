import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { Activity, Clock, CreditCard, FileText, TrendingUp, Users } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
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
import { adminAuthService } from '../services/api';

interface DashboardStats {
  totalUsers: number;
  totalCibilReports: number;
  totalLoans: number;
  pendingLoans: number;
  activeUsers: number;
  newUsersToday: number;
  cibilSubmissionsToday: number;
  loanApplicationsToday: number;
}

interface UserActivity {
  id: string;
  name: string;
  email: string;
  lastLogin: string;
  cibilCheckCount: number;
  isVerified: boolean;
  createdAt: string;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return '#10B981';
    case 'PENDING':
      return '#F59E0B';
    case 'REJECTED':
      return '#EF4444';
    case 'UNDER_REVIEW':
      return '#3B82F6';
    case 'DISBURSED':
      return '#8B5CF6';
    case 'CLOSED':
      return '#6B7280';
    default:
      return '#6B7280';
  }
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCibilReports: 0,
    totalLoans: 0,
    pendingLoans: 0,
    activeUsers: 0,
    newUsersToday: 0,
    cibilSubmissionsToday: 0,
    loanApplicationsToday: 0,
  });
  const [recentUsers, setRecentUsers] = useState<UserActivity[]>([]);
  const [loanChartData, setLoanChartData] = useState<ChartData[]>([]);
  const [cibilChartData, setCibilChartData] = useState<ChartData[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch comprehensive dashboard data
      const dashboardResponse = await adminAuthService.getComprehensiveDashboard();
      const dashboardData = dashboardResponse.data as any;

      // Set stats
      setStats({
        totalUsers: dashboardData.stats?.totalUsers || 0,
        totalCibilReports: dashboardData.stats?.totalCibilReports || 0,
        totalLoans: dashboardData.stats?.totalLoans || 0,
        pendingLoans: dashboardData.stats?.pendingLoans || 0,
        activeUsers: dashboardData.stats?.activeUsers || 0,
        newUsersToday: dashboardData.stats?.newUsersToday || 0,
        cibilSubmissionsToday: dashboardData.stats?.cibilSubmissionsToday || 0,
        loanApplicationsToday: dashboardData.stats?.loanApplicationsToday || 0,
      });

      // Set recent users
      if (dashboardData.recentUsers) {
        setRecentUsers(
          dashboardData.recentUsers.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            lastLogin: user.lastLogin,
            cibilCheckCount: user.cibilCheckCount,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
          }))
        );
      }

      // Prepare loan chart data
      if (dashboardData.loanDistribution) {
        const loanData = dashboardData.loanDistribution.map((item: any) => ({
          name: item.status,
          value: item._count.status,
          color: getStatusColor(item.status),
        }));
        setLoanChartData(loanData);
      }

      // Prepare CIBIL chart data
      if (dashboardData.cibilDistribution) {
        setCibilChartData([
          { name: 'Submitted', value: dashboardData.cibilDistribution.submitted, color: '#10B981' },
          {
            name: 'Unsubmitted',
            value: dashboardData.cibilDistribution.unsubmitted,
            color: '#6B7280',
          },
        ]);
      }

      // Set activity data
      if (dashboardData.activityData) {
        const formattedActivityData = dashboardData.activityData.map((item: any) => ({
          date: format(new Date(item.date), 'MMM dd'),
          users: item.users,
          cibilChecks: item.cibilChecks,
          loanApplications: item.loanApplications,
        }));
        setActivityData(formattedActivityData);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({
    title,
    value,
    description,
    icon: Icon,
    trend,
    trendValue,
  }: {
    title: string;
    value: number;
    description: string;
    icon: React.ComponentType<any>;
    trend?: 'up' | 'down';
    trendValue?: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && trendValue && (
          <div
            className={`flex items-center text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
          >
            <TrendingUp className={`h-3 w-3 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
            {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 text-red-500">⚠️</div>
            <div>
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
          <Button onClick={fetchDashboardData} variant="outline" size="sm" className="mt-4">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the Borrowww admin dashboard. Here's what's happening today.
          </p>
        </div>
        <Button onClick={fetchDashboardData} variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          description="Registered users"
          icon={Users}
          trend="up"
          trendValue={`+${stats.newUsersToday} today`}
        />
        <StatCard
          title="CIBIL Reports"
          value={stats.totalCibilReports}
          description="Total CIBIL checks"
          icon={CreditCard}
          trend="up"
          trendValue={`+${stats.cibilSubmissionsToday} today`}
        />
        <StatCard
          title="Total Loans"
          value={stats.totalLoans}
          description="Loan applications"
          icon={FileText}
          trend="up"
          trendValue={`+${stats.loanApplicationsToday} today`}
        />
        <StatCard
          title="Pending Loans"
          value={stats.pendingLoans}
          description="Awaiting approval"
          icon={Clock}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Activity Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>User activity over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="New Users"
                />
                <Line
                  type="monotone"
                  dataKey="cibilChecks"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="CIBIL Checks"
                />
                <Line
                  type="monotone"
                  dataKey="loanApplications"
                  stroke="#ffc658"
                  strokeWidth={2}
                  name="Loan Applications"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Loan Status Chart */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Loan Status</CardTitle>
            <CardDescription>Distribution of loan applications</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={loanChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {loanChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* CIBIL Reports Chart */}
      <Card>
        <CardHeader>
          <CardTitle>CIBIL Reports Status</CardTitle>
          <CardDescription>Submitted vs Unsubmitted CIBIL reports</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cibilChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Users */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
          <CardDescription>Latest registered users and their activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{user.cibilCheckCount} CIBIL checks</p>
                    <p className="text-xs text-muted-foreground">
                      Joined {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge variant={user.isVerified ? 'success' : 'secondary'}>
                      {user.isVerified ? 'Verified' : 'Unverified'}
                    </Badge>
                    {user.lastLogin && (
                      <p className="text-xs text-muted-foreground">
                        Last login: {format(new Date(user.lastLogin), 'MMM dd')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
