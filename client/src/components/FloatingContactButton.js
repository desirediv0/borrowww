'use client';

import { useState } from 'react';
import { FaPhone, FaTimes, FaWhatsapp } from 'react-icons/fa';

const FloatingContactButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false);

  const phoneNumber = '9560069525';
  const whatsappNumber = '919560069525';

  const handleCall = () => {
    setShowCallDialog(false);
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    setShowWhatsAppDialog(false);
    const message = encodeURIComponent(
      'Hello! I would like to know more about your loan services.'
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Floating Contact Button */}
      <div className="fixed right-6 bottom-10 z-50">
        {/* Expanded Menu */}
        {isExpanded && (
          <div className="mb-4 space-y-3">
            {/* Call Button */}
            <button
              onClick={() => setShowCallDialog(true)}
              className="flex items-center justify-center w-14 h-14 bg-[var(--primary-blue)] hover:bg-[var(--primary-blue-dark)] text-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl"
              title="Call Us"
            >
              <FaPhone size={20} />
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={() => setShowWhatsAppDialog(true)}
              className="flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl"
              title="WhatsApp Us"
            >
              <FaWhatsapp size={20} />
            </button>
          </div>
        )}

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-16 h-16 bg-[#396A9F] hover:bg-[#255282] text-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl"
          title={isExpanded ? 'Close Menu' : 'Contact Us'}
        >
          {isExpanded ? <FaTimes size={24} /> : <FaPhone size={24} />}
        </button>
      </div>

      {/* Call Confirmation Dialog */}
      {showCallDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone size={28} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Make a Call</h3>
              <p className="text-gray-600 mb-6">
                Would you like to call us at{' '}
                <span className="font-semibold text-[#396A9F]">{phoneNumber}</span>?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCallDialog(false)}
                  className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCall}
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Confirmation Dialog */}
      {showWhatsAppDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWhatsapp size={28} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp Us</h3>
              <p className="text-gray-600 mb-6">
                Would you like to chat with us on WhatsApp at{' '}
                <span className="font-semibold text-[#396A9F]">{phoneNumber}</span>?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowWhatsAppDialog(false)}
                  className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Chat Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContactButton;
