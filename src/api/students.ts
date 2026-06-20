import { apiClient } from './client';
import type { PaginatedResponse, Student } from '../types';

export const getStudents = async (page = 1, limit = 10) => {
  const { data } = await apiClient.get<PaginatedResponse<Student>>(`/students?page=${page}&limit=${limit}`);
  return data;
};

export const getStudentById = async (id: string) => {
  const { data } = await apiClient.get<{ status: string; data: Student }>(`/students/${id}`);
  return data.data;
};

export const createStudent = async (student: Omit<Student, 'id' | 'createdAt' | 'updatedAt' | 'marks'>) => {
  const { data } = await apiClient.post<{ status: string; data: Student }>('/students', student);
  return data.data;
};

export const updateStudent = async (id: string, student: Partial<Omit<Student, 'id' | 'createdAt' | 'updatedAt' | 'marks'>>) => {
  const { data } = await apiClient.put<{ status: string; data: Student }>(`/students/${id}`, student);
  return data.data;
};

export const deleteStudent = async (id: string) => {
  const { data } = await apiClient.delete(`/students/${id}`);
  return data;
};

export const addMark = async (studentId: string, mark: { subject: string; score: number }) => {
  const { data } = await apiClient.post(`/students/${studentId}/marks`, mark);
  return data;
};
