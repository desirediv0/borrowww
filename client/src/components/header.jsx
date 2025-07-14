import { X, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

export default function Header() {
  return (
    <div className="w-full">
      {/* Top Notification Banner */}
      <div className="bg-green-800 text-white py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-2 text-sm">
            <Rocket className="h-4 w-4 text-green-300" />
            <span>
              <strong>Session 2024</strong> • Early-bird registration now open
            </span>
          </div>
          {/* <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-green-700 p-1 h-auto"
          >
            <X className="h-4 w-4" />
          </Button> */}
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-16">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="logo svg.svg"
              alt="BorrowWWW"
              className="h-16 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#values"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Values
            </a>
            <a
              href="#numbers"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Numbers
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              FAQ
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </header>
    </div>
  );
}
