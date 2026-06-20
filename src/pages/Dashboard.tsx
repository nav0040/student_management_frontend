import React, { useState } from 'react';
import { MainLayout } from '../components/templates/MainLayout';
import { useQuery } from '@tanstack/react-query';
import { getStudents } from '../api/students';
import { Modal } from '../components/organisms/Modal';
import { StudentForm } from '../components/organisms/StudentForm';
import { Users, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch the first page with a limit of 4 to get the total count and the most recent students
  const { data, isLoading } = useQuery({
    queryKey: ['students', 1, 4],
    queryFn: () => getStudents(1, 4),
  });

  const students = data?.data || [];
  const totalStudents = data?.meta?.totalRecords || 0;

  return (
    <MainLayout>
      {/* Dashboard Welcome Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-white mb-2">Good Morning, Admin</h1>
          <p className="text-gray-400">Here's a snapshot of your academy today.</p>
        </motion.div>
      </div>

      {/* Main Core Widgets Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        
        {/* Total Students Metric Card */}
        <div className="md:col-span-1">
          <MetricCard
            title="Total Enrolled Students"
            value={isLoading ? '...' : totalStudents.toString()}
            change="Active student accounts"
            icon={<Users className="w-6 h-6 text-[#7C3AED]" />}
            color="from-[#7C3AED]/15 via-[#7C3AED]/5 to-transparent border-[#7C3AED]/20"
          />
        </div>

        {/* Quick Navigation Panel */}
        <div className="md:col-span-2 flex flex-col justify-between bg-gradient-to-br from-[#111827] to-[#111827]/70 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7C3AED]/10 blur-[80px] rounded-full pointer-events-none" />
          <h3 className="text-lg font-bold text-white mb-4">Quick Navigation</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <QuickActionLink 
              title="Student Directory" 
              desc="View, search and filter all enrollments"
              to="/students" 
              icon={<Users className="w-4 h-4 text-[#06B6D4]" />}
            />
            <QuickActionLink 
              title="Quick Enroll" 
              desc="Register a new student directly"
              to="#"
              onClick={() => setIsModalOpen(true)}
              icon={<Plus className="w-4 h-4 text-[#10B981]" />}
            />
          </div>
        </div>
      </div>

      {/* Recent Enrollments */}
      <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Recent Student Registrations</h3>
            <p className="text-xs text-gray-400">The most recently enrolled students in the database</p>
          </div>
          <Link to="/students" className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1">
            View All Directory <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-white/5 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {students.map((student: any) => (
              <div key={student.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 border border-white/10 flex items-center justify-center font-bold text-white text-xs shrink-0">
                    {student.firstName[0]}{student.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">{student.firstName} {student.lastName}</h4>
                    <p className="text-xs text-gray-400 truncate">{student.email}</p>
                  </div>
                </div>
                <Link to={`/students/${student.id}`} className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 group-hover:text-white group-hover:bg-[#7C3AED]/10 transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400 text-sm">
            No students registered yet. Click Quick Enroll to get started.
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Quick Enroll Student">
        <StudentForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </MainLayout>
  );
};

const MetricCard: React.FC<{ title: string; value: string; change: string; icon: React.ReactNode; color: string }> = ({ title, value, change, icon, color }) => (
  <div className={`p-6 rounded-3xl bg-[#111827] border bg-gradient-to-tr ${color} flex flex-col justify-between h-full min-h-[170px]`}>
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-400">{title}</span>
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
        {icon}
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-4xl font-bold text-white tracking-tight">{value}</h3>
      <span className="text-xs text-gray-500 mt-1 block">{change}</span>
    </div>
  </div>
);

const QuickActionLink: React.FC<{ title: string; desc: string; to: string; icon: React.ReactNode; onClick?: () => void }> = ({ title, desc, to, icon, onClick }) => {
  const content = (
    <>
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0 group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white group-hover:text-[#7C3AED] transition-colors">{title}</h4>
        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="flex items-start text-left gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group w-full">
        {content}
      </button>
    );
  }

  return (
    <Link to={to} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group">
      {content}
    </Link>
  );
};
