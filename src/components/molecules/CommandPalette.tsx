import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Book, CreditCard, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getStudents } from '../../api/students';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  
  const { data } = useQuery({
    queryKey: ['students', 1, 100],
    queryFn: () => getStudents(1, 100),
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredStudents = data?.data?.filter(s => 
    s.firstName.toLowerCase().includes(query.toLowerCase()) || 
    s.lastName.toLowerCase().includes(query.toLowerCase())
  ) || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-2xl bg-[#111827] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-4 py-4 border-b border-white/5">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                autoFocus
                type="text"
                placeholder="Search students, courses, attendance..."
                className="w-full bg-transparent text-white focus:outline-none placeholder:text-gray-500 text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
              <div className="px-2 py-1 text-xs text-gray-500 bg-white/5 rounded-md ml-2 border border-white/10">ESC</div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 no-scrollbar">
              {query && filteredStudents.length > 0 && (
                <div className="mb-4">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Students</div>
                   {filteredStudents.map(student => (
                    <Link
                      key={student.id}
                      to={`/students/${student.id}`}
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="flex items-center px-3 py-3 mx-1 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#7C3AED]/20 text-[#7C3AED] flex items-center justify-center mr-3 font-semibold group-hover:scale-110 transition-transform">
                        {student.firstName[0]}{student.lastName[0]}
                      </div>
                      <div>
                        <div className="text-white font-medium">{student.firstName} {student.lastName}</div>
                        <div className="text-sm text-gray-400">{student.email}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {query && filteredStudents.length === 0 && (
                <div className="py-12 text-center text-gray-500">
                  No results found for "{query}"
                </div>
              )}
              {!query && (
                <div className="grid grid-cols-2 gap-2 p-2">
                  <QuickAction icon={<User />} label="Add Student" color="text-[#7C3AED]" />
                  <QuickAction icon={<Book />} label="Assignments" color="text-[#06B6D4]" />
                  <QuickAction icon={<CreditCard />} label="Pending Fees" color="text-[#F59E0B]" />
                  <QuickAction icon={<Calendar />} label="Attendance" color="text-[#10B981]" />
                </div>
              )}
            </div>
            <div className="px-4 py-3 border-t border-white/5 bg-[#0B1020] text-xs text-gray-500 flex items-center justify-between">
              <span>Use arrows to navigate</span>
              <span><kbd className="font-sans px-1 py-0.5 bg-white/10 rounded">↵</kbd> to select</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const QuickAction: React.FC<{ icon: React.ReactNode, label: string, color: string }> = ({ icon, label, color }) => (
  <button className="flex items-center p-4 rounded-xl bg-white/5 border border-transparent hover:border-white/10 hover:bg-white/10 transition-all text-left group">
    <div className={`p-2 rounded-lg bg-white/5 ${color} mr-3 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{label}</span>
  </button>
);
