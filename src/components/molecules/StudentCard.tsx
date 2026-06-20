import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Student } from '../../types';

export const StudentCard: React.FC<{ student: Student; index: number }> = ({ student, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative p-5 rounded-2xl bg-[#111827] border border-white/5 hover:border-[#7C3AED]/50 transition-all shadow-lg hover:shadow-[0_8px_30px_rgb(124,58,237,0.15)] overflow-hidden flex flex-col h-full"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex justify-between items-start mb-5 w-full min-w-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 border border-white/10 flex items-center justify-center text-base font-semibold text-white shadow-inner shrink-0">
            {student.firstName[0]}{student.lastName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-white truncate">{student.firstName} {student.lastName}</h3>
            <span className="text-xs text-gray-400 font-normal tracking-wide truncate block mt-0.5">{student.email}</span>
          </div>
        </div>
      </div>

      <Link to={`/students/${student.id}`} className="flex items-center justify-between p-2.5 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors mt-auto">
        <span className="font-semibold text-xs">View Full Profile</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </motion.div>
  );
};
