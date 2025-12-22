import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { validateEnv } from '@/config/env';
import App from './App';
import './index.css';
import 'leaflet/dist/leaflet.css';

// Validate environment variables before app starts
try {
  validateEnv();
} catch (error) {
  console.error('Environment validation failed:', error);
  // Show error to user
  document.body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; text-align: center; font-family: system-ui;">
      <div>
        <h1 style="color: #ef4444; margin-bottom: 16px;">Configuration Error</h1>
        <p style="color: #6b7280; margin-bottom: 8px;">${error instanceof Error ? error.message : 'Missing required environment variables'}</p>
        <p style="color: #9ca3af; font-size: 14px;">Please check your .env.local file and ensure all required variables are set.</p>
      </div>
    </div>
  `;
  throw error;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster 
          position="top-center" 
          richColors 
          closeButton
          toastOptions={{
            duration: 4000,
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
