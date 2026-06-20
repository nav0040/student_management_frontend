import React from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getStudents } from '../../api/students';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StudentCard } from '../molecules/StudentCard';
import type { Student } from '../../types';

export const StudentList: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const limit = 8; // Change to 8 for nice grid (4x2)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['students', page, limit],
    queryFn: () => getStudents(page, limit),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-64 rounded-2xl bg-[#111827] border border-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20">
        Failed to load student directory.
      </div>
    );
  }

  const students = data?.data || [];
  const meta = data?.meta;

  if (students.length === 0) {
    return (
      <div className="p-16 text-center bg-[#111827] border border-white/5 rounded-2xl">
        <div className="mx-auto w-48 h-48 mb-6 opacity-50 bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] rounded-full blur-[80px]" />
        <h3 className="text-xl font-bold text-white mb-2">No students enrolled yet</h3>
        <p className="text-gray-400 max-w-sm mx-auto">Get started by enrolling your first student to see them appear in the directory.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {students.map((student: Student, index: number) => (
          <StudentCard key={student.id} student={student} index={index} />
        ))}
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-[#111827] border border-white/5 rounded-2xl">
          <p className="text-sm text-gray-400">
            Showing <span className="font-medium text-white">{(page - 1) * limit + 1}</span> to <span className="font-medium text-white">{Math.min(page * limit, meta.totalRecords)}</span> of <span className="font-medium text-white">{meta.totalRecords}</span> results
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={page === meta.totalPages}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
