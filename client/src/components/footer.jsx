import React from 'react';
import logo from '../assets/logo.svg'; 
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {/* Account Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Account</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Saving
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Join Accounts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Crypto
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Freelance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Commodities
                </a>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Help</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Customer Help
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Finance Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Finance</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Cards
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Linked Accounts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Payment
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Freelance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Commodities
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Career
                </a>
              </li>
            </ul>
          </div>

          {/* Logo and Address Column */}
          <div className="space-y-6 md:col-span-4 lg:col-span-1">
            {/* Logo */}
            <div className="flex justify-start lg:justify-end">
              <Image
                src="logo svg.svg"
                alt="BorrowWWW Logo"
                width={120}
                height={40}
                className="h-24 w-auto"
              />
            </div>

            {/* Address */}
            <div className="text-gray-600 text-sm leading-relaxed lg:text-right">
              <p>181 Bay Street Bay Wellington</p>
              <p>Tower, Suite 292 Toronto,</p>
              <p>Ontario M5J 2T3</p>
            </div>

            {/* Language Selector */}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-600 text-sm">
            © BorrowWWW Finance Ltd 2024.
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
            >
              Terms of Use
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
            >
              Disclosure
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
