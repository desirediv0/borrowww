import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  CreditCard,
  Home,
  LayoutDashboard,
  MessageSquare,
  Activity,
  LogOut,
  Menu,
  X,
  Users,
  UserPlus,
  ChevronDown,
  ChevronRight,
  Shield,
} from 'lucide-react';

import { useAuth } from '../contexts/useAuth';


interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { admin, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inquiriesOpen, setInquiriesOpen] = useState(true);

  const mainNavigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: location.pathname === '/dashboard',
    },
    {
      name: 'Users',
      href: '/users',
      icon: Users,
      current: location.pathname === '/users',
    },
    {
      name: 'Tracking',
      href: '/tracking',
      icon: Activity,
      current: location.pathname === '/tracking',
    },
    {
      name: 'Credit Reports',
      href: '/credit-reports',
      icon: Shield,
      current: location.pathname === '/credit-reports',
    },
  ];

  const inquiriesNavigation = [
    {
      name: 'Credit Check',
      href: '/credit-check-inquiries',
      icon: CreditCard,
      current: location.pathname === '/credit-check-inquiries',
    },
    {
      name: 'Home Loan',
      href: '/home-loan-inquiries',
      icon: Home,
      current: location.pathname === '/home-loan-inquiries',
    },
    {
      name: 'Contact',
      href: '/contact-inquiries',
      icon: MessageSquare,
      current: location.pathname === '/contact-inquiries',
    },
    {
      name: 'Referrals',
      href: '/referrals',
      icon: UserPlus,
      current: location.pathname === '/referrals',
    },
  ];

  const isAnyInquiryActive = inquiriesNavigation.some(item => item.current);

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="px-3 mb-8">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg tracking-tight">Borrowww</span>
            <span className="text-gray-400 text-xs">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {/* Primary Links */}
        <div className="space-y-1">
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                ${item.current
                  ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-white border border-blue-500/30'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon className={`h-5 w-5 ${item.current ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'}`} />
              <span className="font-medium">{item.name}</span>
              {item.current && (
                <div className="ml-auto w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
              )}
            </Link>
          ))}
        </div>

        {/* Inquiries Section */}
        <div className="pt-4">
          <button
            onClick={() => setInquiriesOpen(!inquiriesOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 
              ${isAnyInquiryActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5" />
              <span className="font-medium text-sm uppercase tracking-wider">Inquiries</span>
            </div>
            {inquiriesOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {inquiriesOpen && (
            <div className="mt-1 ml-4 pl-4 border-l border-gray-700 space-y-1">
              {inquiriesNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group
                    ${item.current
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <item.icon className={`h-4 w-4 ${item.current ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* User Section */}
      <div className="mt-auto px-3 py-4 border-t border-gray-700/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{admin?.name || 'Admin'}</p>
            <p className="text-xs text-gray-400 truncate">{admin?.email || 'admin@borrowww.com'}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 border border-red-500/20"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1a2332] px-4 py-3 flex items-center justify-between shadow-lg">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-white font-bold">Borrowww</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-[#1a2332] to-[#0f172a] flex flex-col py-6 shadow-2xl transform transition-transform duration-300 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <NavContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-gradient-to-b from-[#1a2332] to-[#0f172a] flex-col h-screen py-6 shadow-2xl sticky top-0">
        <NavContent />
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 min-h-screen overflow-y-auto lg:pt-0 pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
