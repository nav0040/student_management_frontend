import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudentById, deleteStudent, addMark } from '../api/students';
import { MainLayout } from '../components/templates/MainLayout';
import { Button } from '../components/atoms/Button';
import { Modal } from '../components/organisms/Modal';
import { Input } from '../components/atoms/Input';
import { ArrowLeft, Trash2, Plus, User, Activity, AlertTriangle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StudentForm } from '../components/organisms/StudentForm';

const markSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  score: z.coerce.number().min(0).max(100, 'Score cannot exceed 100'),
});

type MarkFormValues = z.infer<typeof markSchema>;

export const StudentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: student, isLoading, isError } = useQuery({
    queryKey: ['student', id],
    queryFn: () => getStudentById(id!),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteStudent(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      navigate('/students');
    },
  });

  const addMarkMutation = useMutation({
    mutationFn: (data: MarkFormValues) => addMark(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student', id] });
      setIsMarkModalOpen(false);
      reset();
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<MarkFormValues>({
    resolver: zodResolver(markSchema) as any,
  });

  if (isLoading) return <MainLayout><div className="animate-pulse h-96 bg-[#111827] border border-white/5 rounded-3xl" /></MainLayout>;
  if (isError || !student) return <MainLayout><div className="text-red-500">Error loading profile.</div></MainLayout>;

  const chartData = student.marks?.map((m: any) => ({
    name: m.subject,
    score: m.score,
  })) || [];

  return (
    <MainLayout>
      <div className="mb-6">
        <Link to="/students" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Link>
      </div>

      {/* Profile Header (Social Style) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="bg-[#111827] rounded-3xl border border-white/5 overflow-hidden mb-8 shadow-2xl relative"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="h-48 bg-gradient-to-r from-[#0B1020] via-[#111827] to-[#0B1020] border-b border-white/5 relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="px-8 pb-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-20 gap-6">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:text-left gap-6 w-full sm:w-auto">
              <div className="h-40 w-40 rounded-3xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] p-1 shadow-2xl shrink-0">
                <div className="w-full h-full bg-[#111827] rounded-[22px] flex items-center justify-center text-5xl font-bold text-white shadow-inner">
                  {student.firstName[0]}{student.lastName[0]}
                </div>
              </div>
              <div className="pb-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">{student.firstName} {student.lastName}</h1>
                <p className="text-gray-400 mt-1 flex items-center justify-center sm:justify-start gap-2 text-sm">
                  <User className="h-4 w-4 shrink-0" /> {student.email}
                </p>
              </div>
            </div>
            <div className="flex gap-3 pb-2 w-full sm:w-auto justify-center sm:justify-end">
              <Button variant="secondary" className="flex-1 sm:flex-initial border-white/10 hover:border-white/20" onClick={() => setIsEditModalOpen(true)}>Edit Profile</Button>
              <Button 
                variant="danger" 
                className="flex-1 sm:flex-initial"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-2 inline" /> Delete
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mb-10">
        
        {/* Performance & Marks */}
        <div className="space-y-8">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-[#111827] rounded-3xl border border-white/5 p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#06B6D4]" /> Performance Overview
              </h3>
              <Button size="sm" onClick={() => setIsMarkModalOpen(true)} className="bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20">
                <Plus className="h-4 w-4 mr-1" /> Add Mark
              </Button>
            </div>
            
            {chartData.length > 0 ? (
              <div className="h-64 w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="#9CA3AF" axisLine={false} tickLine={false} />
                    <YAxis stroke="#9CA3AF" axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#06B6D4' }} />
                    <Line type="monotone" dataKey="score" stroke="#06B6D4" strokeWidth={4} dot={{ r: 6, fill: '#111827', strokeWidth: 2 }} activeDot={{ r: 8, fill: '#06B6D4' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 w-full mb-8 flex flex-col items-center justify-center bg-white/5 rounded-2xl border border-white/5">
                <Activity className="w-10 h-10 text-gray-600 mb-3" />
                <p className="text-gray-400">No performance data available yet</p>
              </div>
            )}

            <div className="space-y-3 mt-auto">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Grade History</h4>
              {student.marks?.map((mark: any, i: number) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (i * 0.1) }}
                  key={mark.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center font-bold shrink-0">
                      {mark.subject[0]}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{mark.subject}</h4>
                      <p className="text-xs text-gray-500">{new Date(mark.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <div className="flex-1 sm:w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${mark.score}%` }} transition={{ duration: 1, delay: 0.8 }}
                        className={`h-full rounded-full ${mark.score >= 80 ? 'bg-[#10B981]' : mark.score >= 60 ? 'bg-[#F59E0B]' : 'bg-red-500'}`} 
                      />
                    </div>
                    <span className="font-bold text-white w-10 text-right">{mark.score}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      <Modal isOpen={isMarkModalOpen} onClose={() => setIsMarkModalOpen(false)} title="Record New Mark">
        <form onSubmit={handleSubmit((d) => addMarkMutation.mutate(d as any))} className="space-y-5">
          <Input label="Subject Name" placeholder="e.g. Advanced Mathematics" {...register('subject')} error={errors.subject?.message} />
          <Input label="Score (0-100)" type="number" {...register('score')} error={errors.score?.message} />
          <div className="pt-2 flex justify-end">
            <Button type="submit" isLoading={addMarkMutation.isPending} className="w-full">
              Save Record
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Student Profile">
        <StudentForm student={student} onSuccess={() => setIsEditModalOpen(false)} />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Student">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-red-400">
            <AlertTriangle className="h-6 w-6 shrink-0" />
            <span className="font-semibold text-white">This action cannot be undone</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Are you sure you want to permanently delete the profile for <strong className="text-white">{student.firstName} {student.lastName}</strong>? This will permanently delete all student data, including academic records.
          </p>
          <div className="flex gap-3 justify-end pt-2">
            <Button
              variant="secondary"
              className="border-white/10 hover:border-white/20"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteMutation.mutate()}
              isLoading={deleteMutation.isPending}
            >
              Delete Student
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};
