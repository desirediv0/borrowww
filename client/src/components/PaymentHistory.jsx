import React from 'react';

const PaymentHistory = ({ history }) => {
  // history is array of month strings: "000", "STD", "030", etc.
  // We'll show a grid of 48 months (4 years)
  
  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 border-gray-200';
    if (status === '000' || status === 'STD' || status === 'XXX') return 'bg-green-500 border-green-600';
    if (status === 'NEW') return 'bg-blue-400 border-blue-500';
    if (status === 'CLSD') return 'bg-gray-400 border-gray-500';
    
    // DPD (Days Past Due)
    const dpd = parseInt(status);
    if (!isNaN(dpd) && dpd > 0) {
      if (dpd <= 30) return 'bg-yellow-400 border-yellow-500';
      if (dpd <= 60) return 'bg-orange-500 border-orange-600';
      return 'bg-red-500 border-red-600';
    }
    
    if (['SUB', 'DBT', 'LSS'].includes(status)) return 'bg-red-800 border-red-900';
    
    return 'bg-gray-200 border-gray-300'; // Unknown/No Data
  };

  return (
    <div className="flex flex-wrap gap-1">
      {history.slice(0, 48).map((status, index) => (
        <div
          key={index}
          className={`w-6 h-8 rounded-md border text-[10px] flex items-center justify-center text-white font-medium ${getStatusColor(status)}`}
          title={`Month ${index + 1}: ${status}`}
        >
          {status === '000' ? '✔' : status}
        </div>
      ))}
    </div>
  );
};

export default PaymentHistory;
