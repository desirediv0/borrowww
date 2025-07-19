import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import {
  Calendar,
  Check,
  Edit,
  Eye,
  FileText,
  RefreshCw,
  Trash2,
  User,
  X,
  XCircle,
} from 'lucide-react';

import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { loanService } from '../services/api';

interface Loan {
  id: string;
  type: string;
  amount: string;
  interestRate?: string;
  duration?: number;
  status: string;
  purpose: string;
  monthlyIncome?: string;
  employmentType?: string;
  remarks?: string;
  approvedAt?: string;
  rejectedAt?: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

interface LoanDetails {
  loan: Loan;
  user: any;
  cibilData: any[];
  statistics: any;
}

const Loans: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [purposeFilter, setPurposeFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLoan, setSelectedLoan] = useState<LoanDetails | null>(null);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLoan, setEditingLoan] = useState<Loan | null>(null);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      setError(null);

      const params: any = {
        page: currentPage,
        limit: 12,
      };

      if (statusFilter !== 'all') {
        params.status = statusFilter.toUpperCase();
      }

      if (purposeFilter !== 'all') {
        params.purpose = purposeFilter;
      }

      if (typeFilter !== 'all') {
        params.type = typeFilter.toUpperCase();
      }

      const response = await loanService.getAllLoans(params);
      const data = response.data as any;

      setLoans(data.loans || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (err) {
      console.error('Error fetching loans:', err);
      setError('Failed to fetch loans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, [currentPage, statusFilter, purposeFilter, typeFilter]);

  const handleStatusUpdate = async (loanId: string, newStatus: string, remarks?: string) => {
    try {
      await loanService.updateLoanStatus(loanId, newStatus, remarks);
      fetchLoans(); // Refresh the data
    } catch (err) {
      console.error('Error updating loan status:', err);
      setError('Failed to update loan status');
    }
  };

  const handleViewLoan = async (loanId: string) => {
    try {
      const response = await loanService.getLoanById(loanId);
      const loanDetails = response.data as any;
      setSelectedLoan(loanDetails);
      setShowLoanModal(true);
    } catch (err) {
      console.error('Error fetching loan details:', err);
      setError('Failed to fetch loan details');
    }
  };

  const handleEditLoan = (loan: Loan) => {
    setEditingLoan(loan);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingLoan) return;

    try {
      await loanService.updateLoan(editingLoan.id, {
        purpose: editingLoan.purpose,
        remarks: editingLoan.remarks,
      });
      setShowEditModal(false);
      setEditingLoan(null);
      fetchLoans();
    } catch (err) {
      console.error('Error updating loan:', err);
      setError('Failed to update loan');
    }
  };

  const handleDeleteLoan = async (loanId: string) => {
    if (!window.confirm('Are you sure you want to delete this loan?')) return;

    try {
      await loanService.deleteLoan(loanId);
      fetchLoans();
    } catch (err) {
      console.error('Error deleting loan:', err);
      setError('Failed to delete loan');
    }
  };

  const formatCurrency = (amount: string | number) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numAmount);
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      case 'under_review':
        return 'outline';
      case 'disbursed':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'home':
        return 'bg-blue-100 text-blue-800';
      case 'personal':
        return 'bg-green-100 text-green-800';
      case 'car':
        return 'bg-purple-100 text-purple-800';
      case 'business':
        return 'bg-orange-100 text-orange-800';
      case 'education':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Loan Management</h1>
          <p className="text-gray-600">Manage and track loan applications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchLoans}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="disbursed">Disbursed</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="home">Home</option>
              <option value="personal">Personal</option>
              <option value="car">Car</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
            </select>

            {/* Purpose Filter */}
            <select
              value={purposeFilter}
              onChange={(e) => setPurposeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Purposes</option>
              <option value="home renovation">Home Renovation</option>
              <option value="business expansion">Business Expansion</option>
              <option value="education fees">Education Fees</option>
              <option value="vehicle purchase">Vehicle Purchase</option>
              <option value="medical emergency">Medical Emergency</option>
              <option value="wedding expenses">Wedding Expenses</option>
            </select>

            {/* Clear Filters */}
            <Button
              variant="outline"
              onClick={() => {
                setStatusFilter('all');
                setTypeFilter('all');
                setPurposeFilter('all');
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loans.map((loan) => (
          <Card key={loan.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{loan.user?.name || 'Unknown User'}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <Badge variant="outline" className={getTypeColor(loan.type)}>
                        {loan.type}
                      </Badge>
                      <Badge variant={getStatusVariant(loan.status)}>
                        {loan.status.replace('_', ' ')}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewLoan(loan.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditLoan(loan)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteLoan(loan.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Amount</span>
                  <span className="font-semibold text-lg">{formatCurrency(loan.amount)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>{loan.purpose}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Applied {format(new Date(loan.createdAt), 'MMM dd, yyyy')}</span>
                </div>
                {loan.interestRate && (
                  <div className="text-sm text-gray-600">Interest: {loan.interestRate}%</div>
                )}
                {loan.duration && (
                  <div className="text-sm text-gray-600">Duration: {loan.duration} months</div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="text-sm text-gray-600">{loan.user?.email}</div>
                {loan.status.toLowerCase() === 'pending' && (
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(loan.id, 'APPROVED')}
                      className="h-7 text-xs text-green-600 border-green-600 hover:bg-green-50"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(loan.id, 'REJECTED')}
                      className="h-7 text-xs text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Loan Details Modal */}
      {showLoanModal && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Loan Details</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowLoanModal(false)}>
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Loan Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Loan Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Loan Type</label>
                      <p className="text-gray-900">{selectedLoan.loan.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Amount</label>
                      <p className="text-gray-900 font-semibold">
                        {formatCurrency(selectedLoan.loan.amount)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Purpose</label>
                      <p className="text-gray-900">{selectedLoan.loan.purpose}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <Badge variant={getStatusVariant(selectedLoan.loan.status)}>
                        {selectedLoan.loan.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    {selectedLoan.loan.interestRate && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Interest Rate</label>
                        <p className="text-gray-900">{selectedLoan.loan.interestRate}%</p>
                      </div>
                    )}
                    {selectedLoan.loan.duration && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Duration</label>
                        <p className="text-gray-900">{selectedLoan.loan.duration} months</p>
                      </div>
                    )}
                    {selectedLoan.loan.monthlyIncome && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Monthly Income</label>
                        <p className="text-gray-900">
                          {formatCurrency(selectedLoan.loan.monthlyIncome)}
                        </p>
                      </div>
                    )}
                    {selectedLoan.loan.employmentType && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Employment</label>
                        <p className="text-gray-900">{selectedLoan.loan.employmentType}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* User Info */}
                {selectedLoan.user && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Applicant Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Name</label>
                        <p className="text-gray-900">{selectedLoan.user.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <p className="text-gray-900">{selectedLoan.user.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Phone</label>
                        <p className="text-gray-900">{selectedLoan.user.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Applied On</label>
                        <p className="text-gray-900">
                          {format(new Date(selectedLoan.loan.createdAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Remarks */}
                {selectedLoan.loan.remarks && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Remarks</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedLoan.loan.remarks}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                {selectedLoan.loan.status.toLowerCase() === 'pending' && (
                  <div className="flex items-center justify-end space-x-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedLoan.loan.id, 'REJECTED')}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleStatusUpdate(selectedLoan.loan.id, 'APPROVED')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Loan Modal */}
      {showEditModal && editingLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Edit Loan</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                  <input
                    type="text"
                    value={editingLoan.purpose}
                    onChange={(e) => setEditingLoan({ ...editingLoan, purpose: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                  <textarea
                    value={editingLoan.remarks || ''}
                    onChange={(e) => setEditingLoan({ ...editingLoan, remarks: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default Loans;
