import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  ChevronRight,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: location.pathname === '/dashboard',
      description: 'Overview & Analytics',
    },
    {
      name: 'Users',
      href: '/users',
      icon: Users,
      current: location.pathname === '/users',
      description: 'User Management',
    },
    {
      name: 'CIBIL Data',
      href: '/cibil-data',
      icon: FileText,
      current: location.pathname === '/cibil-data',
      description: 'Credit Reports',
    },
    {
      name: 'Loans',
      href: '/loans',
      icon: CreditCard,
      current: location.pathname === '/loans',
      description: 'Loan Applications',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Mobile sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex h-16 items-center justify-between px-6 border-b">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">B</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900">Borrowww</h1>
                    <Badge variant="secondary" className="text-xs">
                      Admin
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-4">
                <nav className="px-4 space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        item.current
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      } group flex items-center px-3 py-3 text-sm font-medium rounded-lg border transition-all duration-200`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon
                        className={`${
                          item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                        } mr-3 flex-shrink-0 h-5 w-5`}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div
                          className={`text-xs ${item.current ? 'text-blue-600' : 'text-gray-500'}`}
                        >
                          {item.description}
                        </div>
                      </div>
                      {item.current && <ChevronRight className="h-4 w-4 text-blue-600" />}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* User info and logout */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {admin?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{admin?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{admin?.email}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="h-8 w-8 p-0">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          {/* Header */}
          <div className="flex h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Borrowww</h1>
                <Badge variant="secondary" className="text-xs">
                  Admin
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`${
                          item.current
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        } group flex items-center px-3 py-3 text-sm font-medium rounded-lg border transition-all duration-200`}
                      >
                        <item.icon
                          className={`${
                            item.current
                              ? 'text-blue-600'
                              : 'text-gray-400 group-hover:text-gray-600'
                          } mr-3 flex-shrink-0 h-5 w-5`}
                        />
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div
                            className={`text-xs ${item.current ? 'text-blue-600' : 'text-gray-500'}`}
                          >
                            {item.description}
                          </div>
                        </div>
                        {item.current && <ChevronRight className="h-4 w-4 text-blue-600" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>

          {/* User info and logout */}
          <div className="border-t pt-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {admin?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{admin?.name}</p>
                <p className="text-xs text-gray-500 truncate">{admin?.email}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="h-8 w-8 p-0"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </Button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-gray-900">Borrowww Admin</h1>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
