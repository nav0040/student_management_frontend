export interface Mark {
  id: string;
  studentId: string;
  subject: string;
  score: number;
  createdAt: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  marks?: Mark[];
}

export interface PaginatedResponse<T> {
  status: 'success' | 'error';
  data: T[];
  meta: {
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}
