import { Cpu, Bell, User, Search, Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Insights', path: '/insights' },
    { name: 'Devices', path: '/devices' },
    { name: 'Live Data', path: '/live-data' },
    { name: 'Plans', path: '/plans' },
    { name: 'Setup', path: '/setup' },
    { name: 'Processing', path: '/processing' }
  ];

  // Don't show navigation links on the login page
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      {/* Top Bar */}
      <div className="container mx-auto px-4 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-gray-500 hover:text-red-600 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <Link to={isLoginPage ? '/' : '/dashboard'} className="flex items-center gap-2">
            <div className="bg-red-600 p-1.5 rounded-md">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900 hidden sm:block">
              SmartSense<span className="text-red-600">Enterprise</span>
            </span>
          </Link>
        </div>

        {!isLoginPage && (
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search devices, plans, or invoices..." 
                className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-5 text-gray-600">
          {!isLoginPage && (
            <button className="relative hover:text-red-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </button>
          )}
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors border border-transparent hover:border-gray-200">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            <div className="hidden md:block text-sm">
              <p className="font-semibold text-gray-800 leading-none mb-1">
                {isLoginPage ? 'Guest' : 'Admin User'}
              </p>
              <p className="text-xs text-gray-500 leading-none">
                {isLoginPage ? 'Sign in to continue' : 'Enterprise Account'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Bar */}
      {!isLoginPage && (
        <div className="border-t border-gray-100 bg-gray-50/50 hidden lg:block">
          <div className="container mx-auto px-4 lg:px-8">
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 ${
                      isActive 
                        ? 'border-red-600 text-red-600' 
                        : 'border-transparent text-gray-600 hover:text-red-600 hover:bg-gray-100/50'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
