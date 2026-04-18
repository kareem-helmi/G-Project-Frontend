// ==================================================================
// 📁 FILE: components/ui/Toast.tsx
// 📍 PATH: /components/ui/Toast.tsx
// 🎯 PURPOSE: Reusable toast notification utility
// ==================================================================

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastConfig {
    message: string;
    type?: ToastType;
    duration?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const TOAST_STYLES: Record<ToastType, string> = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white'
};

const POSITION_STYLES: Record<string, string> = {
    'top-right': 'top-20 right-4',
    'top-left': 'top-20 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
};

export const showToast = ({
    message,
    type = 'success',
    duration = 3000,
    position = 'top-right'
}: ToastConfig): void => {
    // Remove any existing toasts
    const existingToast = document.querySelector('[data-toast]');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.setAttribute('data-toast', 'true');
    toast.className = `fixed ${POSITION_STYLES[position]} ${TOAST_STYLES[type]} px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`;
    toast.textContent = message;

    // Add to DOM
    document.body.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
        toast.classList.add('animate-fade-out');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
};

// Convenience functions
export const showSuccess = (message: string) => showToast({ message, type: 'success' });
export const showError = (message: string) => showToast({ message, type: 'error' });
export const showInfo = (message: string) => showToast({ message, type: 'info' });
export const showWarning = (message: string) => showToast({ message, type: 'warning' });