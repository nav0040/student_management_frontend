import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStudent, updateStudent } from '../../api/students';
import type { Student } from '../../types';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

const studentSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
});

type StudentFormValues = z.infer<typeof studentSchema>;

interface StudentFormProps {
  onSuccess: () => void;
  student?: Student;
}

export const StudentForm: React.FC<StudentFormProps> = ({ onSuccess, student }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: student ? {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
    } : { firstName: '', lastName: '', email: '' },
  });

  useEffect(() => {
    if (student) {
      reset({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
      });
    } else {
      reset({ firstName: '', lastName: '', email: '' });
    }
  }, [student, reset]);

  const mutation = useMutation({
    mutationFn: (data: StudentFormValues) => student ? updateStudent(student.id, data) : createStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      if (student) {
        queryClient.invalidateQueries({ queryKey: ['student', student.id] });
      }
      onSuccess();
    },
  });

  const onSubmit = (data: StudentFormValues) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {mutation.isError && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200 animate-in fade-in">
          Failed to {student ? 'update' : 'create'} student. The email might already be in use.
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <Input 
          label="First Name" 
          placeholder="Jane"
          {...register('firstName')} 
          error={errors.firstName?.message} 
        />
        <Input 
          label="Last Name" 
          placeholder="Doe"
          {...register('lastName')} 
          error={errors.lastName?.message} 
        />
      </div>
      <Input 
        label="Email Address" 
        type="email"
        placeholder="jane.doe@example.com"
        {...register('email')} 
        error={errors.email?.message} 
      />
      <div className="pt-2 flex justify-end">
        <Button type="submit" isLoading={mutation.isPending} className="w-full sm:w-auto">
          {student ? 'Update Student' : 'Save Student'}
        </Button>
      </div>
    </form>
  );
};
