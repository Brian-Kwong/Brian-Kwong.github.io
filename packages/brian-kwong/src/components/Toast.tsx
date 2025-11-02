import React from "react";

import "../components/Components.css";
import styles from "./Toast.module.css";

interface ToastProps {
    icon?: React.ReactNode;
    title: string;
    type?: "success" | "error";
    message: string;
    duration?: number;
    showToast: boolean;
    setShowToast: (show: boolean) => void;
}

const Toast: React.FC<ToastProps> = ({
    icon,
    title,
    type = "success",
    message,
    duration = 3000,
    showToast,
    setShowToast,
}) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowToast(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, showToast, setShowToast]);

    return (
        <div
            className={`${styles.toastContainer} ${type === "success" ? styles.success : styles.error} ${showToast ? styles.showToast : styles.hideToast}`}
        >
            <div className={styles.hstack}>
                {icon && <span className={`${styles.icon}`}>{icon}</span>}
                <div className={styles.vstack}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.message}>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Toast;
