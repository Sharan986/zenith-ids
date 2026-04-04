'use client';

import { ToastProvider } from '@/components/ToastContext';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Providers({ children }) {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <div className="app-container">
          {children}
        </div>
      </ToastProvider>
    </ErrorBoundary>
  );
}
