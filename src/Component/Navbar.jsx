import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { Menu, X, Scroll, Search, User, Clock, Map, BookOpen, MessageSquare } from 'lucide-react';
import navLogo from "../assets/logo.png";

const navigationLinks = [
  { name: "Home", to: "/", icon: <Clock className="h-4 w-4" /> },
  { name: "All Artifacts", to: "/artifacts", icon: <Scroll className="h-4 w-4" /> },
  // { name: "Collections", to: "/collections", icon: <BookOpen className="h-4 w-4" /> },
  // { name: "Exhibitions", to: "/exhibitions", icon: <Map className="h-4 w-4" /> },
  { name: "Contact", to: "/contact", icon: <MessageSquare className="h-4 w-4" /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 z-40 w-full transition-all duration-500 'bg-black/80 backdrop-blur-xl shadow-2xl border-b border-white/10'
        }`}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        background:  'linear-gradient(135deg, rgba(20,20,20,0.93) 0%, rgba(30,30,30,0.98) 50%, rgba(15,15,15,0.95) 100%)',
        boxShadow:'0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="group flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/90 to-amber-600/90 shadow-lg shadow-amber-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-amber-500/50 backdrop-blur-sm border border-amber-300/20">
                <img src={navLogo || "/placeholder.svg"} alt="HistoriVault Logo" className='h-10 w-10 rounded-full object-cover' />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-wide drop-shadow-lg">HistoriVault</span>
                <span className="text-xs text-amber-400/90 tracking-wider font-medium">HISTORICAL ARTIFACTS</span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1 bg-white/5 rounded-full px-2 py-1 backdrop-blur-sm border border-white/10">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={({ isActive }) =>
                    `group relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${isActive
                      ? 'text-amber-300 bg-amber-500/20 border border-amber-400/30 shadow-lg shadow-amber-500/20'
                      : 'text-gray-200 hover:text-amber-300 hover:bg-white/10'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="flex items-center space-x-2">
                        <span className={`transition-transform duration-300 drop-shadow-sm ${isActive ? 'scale-110' : 'group-hover:scale-110'
                          }`}>
                          {link.icon}
                        </span>
                        <span className="drop-shadow-sm">{link.name}</span>
                      </span>
                      <span className={`absolute inset-x-2 -bottom-px h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-300 to-amber-500/0 rounded-full transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Desktop Search and Login */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Changed to NavLink for regular navigation */}
            <NavLink
              to="/login"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/90 to-amber-600/90 text-black font-medium text-sm hover:from-amber-400/90 hover:to-amber-500/90 transition-all duration-300 shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40 backdrop-blur-sm border border-amber-300/20 hover:scale-105"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2.5 rounded-full bg-white/10 text-gray-200 hover:bg-white/20 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400/50 backdrop-blur-sm border border-white/10"
              style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white/10 relative"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)',
            backdropFilter: 'blur(25px) saturate(200%)',
            WebkitBackdropFilter: 'blur(25px) saturate(200%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
          }}>
          {/* Mobile glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none"></div>

          {/* Mobile Search */}
          <div className="px-3 py-2 relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-300" />
              </div>
              <input
                type="text"
                placeholder="Search artifacts..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-full text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 backdrop-blur-sm"
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              />
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-1 px-3 py-2 relative">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 backdrop-blur-sm border ${isActive
                    ? 'text-amber-300 bg-amber-500/20 border-amber-400/30 shadow-lg shadow-amber-500/20'
                    : 'text-gray-200 hover:bg-white/10 hover:text-amber-300 border-transparent hover:border-white/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`p-2.5 rounded-lg backdrop-blur-sm border ${isActive
                        ? 'bg-amber-500/20 border-amber-400/30'
                        : 'bg-white/10 border-white/10'
                      }`}>
                      {link.icon}
                    </span>
                    <span className="drop-shadow-sm">{link.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Login Button */}
          <div className="px-3 py-3 border-t border-white/10 mt-2 relative">
            {/* Changed to NavLink for regular navigation */}
            <NavLink
              to="/login"
              className="flex items-center justify-center space-x-2 w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-500/90 to-amber-600/90 text-black font-medium hover:from-amber-400/90 hover:to-amber-500/90 transition-all duration-300 shadow-lg shadow-amber-600/30 backdrop-blur-sm border border-amber-300/20"
              onClick={closeMenu}
            >
              <User className="h-5 w-5" />
              <span>Login to Your Account</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;