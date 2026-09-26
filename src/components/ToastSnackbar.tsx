import React, { useEffect } from 'react';
import { Info, X } from 'lucide-react';

interface ToastSnackbarProps {
  message: string | null;
  onDismiss: () => void;
  duration?: number;
}

export const ToastSnackbar: React.FC<ToastSnackbarProps> = ({
  message,
  onDismiss,
  duration = 3200,
}) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onDismiss]);

  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 flex justify-center pointer-events-none animate-slide-up">
      <div className="pointer-events-auto max-w-md w-full bg-[#1C2430] border border-[#283243] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between space-x-3">
        <div className="flex items-center space-x-2.5 min-w-0">
          <Info className="w-4 h-4 text-[#00E676] shrink-0" />
          <span className="text-xs font-medium text-white/95 leading-snug break-words">
            {message}
          </span>
        </div>
        <button
          onClick={onDismiss}
          className="text-[#959DAD] hover:text-white transition-colors cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
