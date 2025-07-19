import { useState, useEffect } from 'react';
import { CreditCard, Phone, User, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const CibilChecker = ({ user }) => {
  const [activeTab, setActiveTab] = useState('pan'); // 'pan' or 'phone'
  const [panNumber, setPanNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [cachedData, setCachedData] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [tracked, setTracked] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

  // Check for cached CIBIL data on component mount
  useEffect(() => {
    if (user?.id) {
      checkCachedData();
    }
  }, [user]);

  const checkCachedData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/api/cibil/cached/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setCachedData(data.data);
      }
    } catch (error) {
      console.error('Error checking cached data:', error);
    }
  };

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleInputChange = (value, type) => {
    setError('');
    setResult(null);
    setTracked(false);

    if (type === 'pan') {
      setPanNumber(value.toUpperCase());
    } else {
      setPhoneNumber(value);
    }
  };

  const trackInput = async () => {
    const inputValue = activeTab === 'pan' ? panNumber : phoneNumber;
    
    if (!inputValue) {
      setError(`Please enter a ${activeTab === 'pan' ? 'PAN number' : 'phone number'}`);
      return;
    }

    if (activeTab === 'pan' && !validatePAN(inputValue)) {
      setError('Please enter a valid PAN number (e.g., ABCDE1234F)');
      return;
    }

    if (activeTab === 'phone' && !validatePhone(inputValue)) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/api/cibil/check`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          [activeTab === 'pan' ? 'panNumber' : 'phoneNumber']: inputValue,
          submitToApi: false, // Just tracking, not submitting
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.data.cached) {
          // User has valid cached data
          setResult(data.data);
        } else if (data.data.tracked) {
          // Input tracked successfully
          setTracked(true);
        }
      } else {
        setError(data.message || 'Failed to process request');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('CIBIL track error:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitForCibil = async () => {
    const inputValue = activeTab === 'pan' ? panNumber : phoneNumber;
    
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/api/cibil/check`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          [activeTab === 'pan' ? 'panNumber' : 'phoneNumber']: inputValue,
          submitToApi: true, // Actually submit to get CIBIL score
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.data);
        setTracked(false);
      } else {
        setError(data.message || 'Failed to fetch CIBIL score');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('CIBIL submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-blue-600';
    if (score >= 550) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    return 'Poor';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Show cached data if available
  if (cachedData && cachedData.cibilData) {
    const { cibilData, daysRemaining } = cachedData;
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Your CIBIL Score</h2>
          <p className="text-gray-600 mt-2">Retrieved from cache (valid for {daysRemaining} more days)</p>
        </div>

        <div className="text-center bg-gray-50 rounded-lg p-6 mb-6">
          <div className={`text-4xl font-bold ${getScoreColor(cibilData.score)} mb-2`}>
            {cibilData.score}
          </div>
          <div className={`text-lg ${getScoreColor(cibilData.score)}`}>
            {getScoreLabel(cibilData.score)}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Fetched on {formatDate(cibilData.fetchedAt)}
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={() => setCachedData(null)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Check with different details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Check Your CIBIL Score</h2>
        <p className="text-gray-600 mt-2">Enter your PAN or phone number to get your credit score</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('pan')}
          className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'pan'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <User className="h-4 w-4 inline mr-2" />
          PAN Number
        </button>
        <button
          onClick={() => setActiveTab('phone')}
          className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'phone'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Phone className="h-4 w-4 inline mr-2" />
          Phone Number
        </button>
      </div>

      {/* Input Form */}
      <div className="space-y-4 mb-6">
        {activeTab === 'pan' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PAN Number
            </label>
            <input
              type="text"
              value={panNumber}
              onChange={(e) => handleInputChange(e.target.value, 'pan')}
              placeholder="Enter PAN (e.g., ABCDE1234F)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
              maxLength={10}
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => handleInputChange(e.target.value, 'phone')}
              placeholder="Enter phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {error && (
          <div className="flex items-center text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}

        {tracked && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex items-center text-yellow-800">
              <Clock className="h-5 w-5 mr-2" />
              <div>
                <p className="font-medium">Input Tracked Successfully</p>
                <p className="text-sm">Click submit below to get your CIBIL score.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {!tracked ? (
          <button
            onClick={trackInput}
            disabled={loading}
            className="w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            {loading ? 'Processing...' : 'Track Input'}
          </button>
        ) : (
          <button
            onClick={submitForCibil}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <CreditCard className="h-4 w-4 mr-2" />
            )}
            {loading ? 'Fetching Score...' : 'Get CIBIL Score'}
          </button>
        )}
      </div>

      {/* Result Display */}
      {result && result.cibilData && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-6">
          <div className="flex items-center text-green-800 mb-4">
            <CheckCircle className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-medium">CIBIL Score Retrieved</h3>
          </div>
          
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(result.cibilData.score)} mb-2`}>
              {result.cibilData.score}
            </div>
            <div className={`text-lg ${getScoreColor(result.cibilData.score)} mb-4`}>
              {getScoreLabel(result.cibilData.score)}
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <p>Valid until: {formatDate(result.expiresAt)}</p>
              <p className="font-medium">Next check available after 28 days</p>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-6 text-xs text-gray-500 space-y-2">
        <p>🔒 Your data is secure and encrypted</p>
        <p>📊 CIBIL scores are cached for 28 days</p>
        <p>⚡ Instant results for subsequent checks within 28 days</p>
      </div>
    </div>
  );
};

export default CibilChecker; 