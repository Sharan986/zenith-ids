import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 9999
      }}>
        {toasts.map((toast) => (
          <div key={toast.id} className="animate-slide-up mono-text" style={{
            background: toast.type === 'success' ? '#BEF264' : toast.type === 'error' ? '#FCA5A5' : '#fff',
            color: '#000',
            padding: '12px 20px',
            border: '2px solid #000',
            boxShadow: '4px 4px 0px 0px #000',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '800',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
