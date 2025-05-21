import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';
import './index.css';
import Router from './router.tsx';

const queryClient = new QueryClient(); // Se crea una instancia de QueryClient

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>
);
