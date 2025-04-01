import React, { useEffect } from 'react';
import styles from "./Toaster.module.css"; // Ensure this CSS file contains your medieval-themed styles

export default function Toast({ message, show }) {

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                // Logic to hide the toast after the specified duration
            }, 5000); // Toast visible for 5 seconds
            return () => clearTimeout(timer);
        }
    }, [show]);

    return (

        <div className="toast">
            <img src="/path/to/beer-icon.png" alt="Beer Icon" className={styles["toast-icon"]} />
            <span className="toast-message">{message}</span>
        </div>

    );
}

