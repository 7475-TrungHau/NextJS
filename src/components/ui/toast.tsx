'use client';

import { useState, useEffect } from "react";
import { toast } from "sonner";

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface Toast {
    type: ToastType;
    message: string;
    description?: string;
    duration?: number;
    id: string;
}

interface ToastProps {
    toast: Toast;
    onRemove: (id: string) => void;
}

const ToastComponent = ({ toast, onRemove }: ToastProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            requestAnimationFrame(() => {
                handleRemove();
            });
        }, toast.duration || 3000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleRemove = () => {
        setIsRemoving(true);
        requestAnimationFrame(() => {
            setTimeout(() => {
                onRemove(toast.id);
            }, 300);
        });
    }

    const getToastStyles = () => {
        const baseStyles = "flex items-start p-4 rounded-lg shadow-lg border transition-all duration-300 transform"

        switch (toast.type) {
            case "success":
                return `${baseStyles} bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300`
            case "error":
                return `${baseStyles} bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300`
            case "warning":
                return `${baseStyles} bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300`
            case "info":
                return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300`
            case "loading":
                return `${baseStyles} bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-300 animate-pulse`
            default:
                return `${baseStyles} bg-white border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200`
        }
    };

    const getIcon = () => {
        switch (toast.type) {
            case "success":
                return (
                    <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                )
            case "error":
                return (
                    <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                )
            case "warning":
                return (
                    <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                )
            case "info":
                return (
                    <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                )
            case "loading":
                return (
                    <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )
            default:
                return (
                    <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                )
        }
    }

    return (
        <div className={`${getToastStyles()} ${isVisible && !isRemoving ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
            {getIcon()}
            <div className="flex-1">
                <div className="font-bold text-lg">
                    {toast.message}
                </div>
                {toast.description && (
                    <div className=" text-muted-foreground mt-1 dark:text-white">
                        {toast.description}
                    </div>
                )}
            </div>
            <button
                onClick={handleRemove}
                className="ml-3 text-current opacity-60 hover:opacity-100 transition-opacity"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}

export default ToastComponent;