'use client'

import { createPortal } from "react-dom"
import { useState, useEffect } from "react";
import ToastComponent, { Toast } from "./toast";

interface ToastContainerProps {
    toasts: Toast[];
    onRemove: (id: string) => void;
}

const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div className="fixed top-15 right-4 z-50 space-y-2 max-w-sm w-full">
            {toasts.map((toast) => (
                <ToastComponent
                    key={toast.id}
                    toast={toast}
                    onRemove={onRemove}
                />
            ))}
        </div>,
        document.body
    );
};

export default ToastContainer;
