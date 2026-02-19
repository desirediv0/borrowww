import React from 'react';
import { CreditCard, Home, Car, Briefcase, GraduationCap } from 'lucide-react'; // Assuming lucide-react is installed

const AccountCard = ({ account }) => {
  const {
    Institution,
    AccountType,
    AccountNumber,
    CurrentBalance,
    PastDueAmount,
    AccountStatus,
    DateOpened,
    DateClosed
  } = account;

  const getIcon = (type) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('home') || t.includes('housing')) return <Home className="w-5 h-5" />;
    if (t.includes('auto') || t.includes('car')) return <Car className="w-5 h-5" />;
    if (t.includes('education')) return <GraduationCap className="w-5 h-5" />;
    if (t.includes('business')) return <Briefcase className="w-5 h-5" />;
    return <CreditCard className="w-5 h-5" />;
  };

  const isActive = !DateClosed && AccountStatus !== 'Closed';
  const isOverdue = parseInt(PastDueAmount) > 0;

  return (
    <div className={`p-4 rounded-xl border ${isOverdue ? 'border-red-200 bg-red-50' : isActive ? 'border-green-200 bg-white' : 'border-gray-200 bg-gray-50'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>
            {getIcon(AccountType)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 line-clamp-1">{Institution}</h4>
            <p className="text-xs text-gray-500">{AccountType} • {AccountNumber?.slice(-4).padStart(AccountNumber?.length, '*')}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
          {isActive ? 'Active' : 'Closed'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <p className="text-xs text-gray-500">Balance</p>
          <p className="font-semibold text-gray-900">₹{parseInt(CurrentBalance).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Overdue</p>
          <p className={`font-semibold ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>₹{parseInt(PastDueAmount).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Opened</p>
          <p className="text-sm text-gray-700">{DateOpened}</p>
        </div>
         {DateClosed && (
            <div>
              <p className="text-xs text-gray-500">Closed</p>
              <p className="text-sm text-gray-700">{DateClosed}</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default AccountCard;
