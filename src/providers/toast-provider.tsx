"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import ToastContainer from "@/components/ui/toast-container"
import { Toast, ToastType } from "@/components/ui/toast"

interface ToastContextType {
    addToast: (type: ToastType, message: string, description?: string, duration?: number) => void
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }

    return {
        success: (message: string, description?: string, duration?: number) =>
            context.addToast("success", message, description, duration),
        error: (message: string, description?: string, duration?: number) =>
            context.addToast("error", message, description, duration),
        warning: (message: string, description?: string, duration?: number) =>
            context.addToast("warning", message, description, duration),
        info: (message: string, description?: string, duration?: number) =>
            context.addToast("info", message, description, duration),
        loading: (message: string, description?: string, duration?: number) =>
            context.addToast("loading", message, description, duration),
    }
}

interface ToastProviderProps {
    children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (type: ToastType, message: string, description?: string, duration?: number) => {

        const id = Math.random().toString(36).substring(2, 10);
        const newToast: Toast = {
            id,
            type,
            message,
            description,
            duration,
        }

        setToasts((prev) => [...prev, newToast])
    }

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    )
}