import React from "react";
import styles from '../styles/Button.module.css';

const Button = ({ onClick, children, className }) => {
    return (
        <button 
            onClick={onClick} 
            className={`${styles.btn} ${className}`}
        >
            <span>{children}</span>
        </button>
    );
};

export default Button;