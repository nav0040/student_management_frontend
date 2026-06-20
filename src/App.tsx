
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard } from './pages/Dashboard';
import { StudentDirectory } from './pages/StudentDirectory';
import { StudentProfile } from './pages/StudentProfile';
import { AcademicLoader } from './components/atoms/AcademicLoader';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AcademicLoader>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentDirectory />} />
            <Route path="/students/:id" element={<StudentProfile />} />
          </Routes>
        </BrowserRouter>
      </AcademicLoader>
    </QueryClientProvider>
  );
}

export default App;
