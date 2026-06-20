import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, BookOpen, Menu, X } from 'lucide-react';
import { CommandPalette } from '../molecules/CommandPalette';
import { Link, useLocation } from 'react-router-dom';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0B1020] text-gray-100 overflow-hidden font-sans">
      <CommandPalette />
      
      {/* Mobile Top Header */}
      <header className="md:hidden h-16 shrink-0 flex items-center justify-between px-6 bg-[#111827]/50 border-b border-white/5 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileOpen(true)} 
            className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Zeerostock</span>
          </Link>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-inner">
          AD
        </div>
      </header>

      {/* Desktop Left Sidebar: Floating Dock */}
      <nav className="hidden md:flex w-20 lg:w-64 flex-col items-center lg:items-stretch py-6 px-4 bg-[#111827]/50 border-r border-white/5 backdrop-blur-xl z-10 relative">
        <Link to="/" className="flex items-center justify-center lg:justify-start gap-3 mb-10 px-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center shadow-lg shadow-[#7C3AED]/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="hidden lg:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Zeerostock
          </span>
        </Link>

        <div className="flex flex-col gap-2 flex-1 w-full">
          <NavItem to="/" icon={<LayoutDashboard />} label="Dashboard" active={location.pathname === '/'} />
          <NavItem to="/students" icon={<Users />} label="Directory" active={location.pathname.startsWith('/students')} />
        </div>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 overflow-y-auto relative no-scrollbar bg-[#0B1020]">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative p-6 lg:p-10 max-w-6xl mx-auto min-h-full">
          {children}
        </div>
      </main>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-[#111827] border-r border-white/5 z-50 p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <Link to="/" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold text-white">Zeerostock</span>
                </Link>
                <button 
                  onClick={() => setIsMobileOpen(false)} 
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2 flex-1 w-full">
                <NavItem to="/" icon={<LayoutDashboard />} label="Dashboard" active={location.pathname === '/'} onClick={() => setIsMobileOpen(false)} />
                <NavItem to="/students" icon={<Users />} label="Directory" active={location.pathname.startsWith('/students')} onClick={() => setIsMobileOpen(false)} />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavItem: React.FC<{ to: string, icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }> = ({ to, icon, label, active, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group
    ${active ? 'bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
  >
    <div className={`transition-transform duration-300 group-hover:scale-110 ${active ? 'text-[#7C3AED]' : ''}`}>
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-5 h-5' })}
    </div>
    <span className={`font-medium block md:hidden lg:block ${active ? 'text-white' : ''}`}>{label}</span>
    {active && (
      <motion.div layoutId="activeNavIndicator" className="absolute left-0 w-1 h-8 bg-[#7C3AED] rounded-r-full" />
    )}
  </Link>
);
