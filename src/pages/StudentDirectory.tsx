import React, { useState } from 'react';
import { MainLayout } from '../components/templates/MainLayout';
import { StudentList } from '../components/organisms/StudentList';
import { StudentForm } from '../components/organisms/StudentForm';
import { Button } from '../components/atoms/Button';
import { Modal } from '../components/organisms/Modal';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const StudentDirectory: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MainLayout>
      {/* Directory Hero */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-white mb-2">Student Directory</h1>
          <p className="text-gray-400">Manage and view all enrolled student records.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2 shadow-lg shadow-[#7C3AED]/20">
            <Plus className="h-4 w-4" />
            Enroll Student
          </Button>
        </motion.div>
      </div>
      
      <StudentList />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Student"
      >
        <StudentForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </MainLayout>
  );
};
