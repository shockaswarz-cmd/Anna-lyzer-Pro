import React from 'react';
import './ui.css';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => (
    <button className={`btn btn-${variant} ${className}`} {...props}>
        {children}
    </button>
);

export const Input = ({ className = '', ...props }) => (
    <input className={`input ${className}`} {...props} />
);

export const Label = ({ children, className = '', ...props }) => (
    <label className={`label ${className}`} {...props}>
        {children}
    </label>
);

export const Card = ({ children, className = '', ...props }) => (
    <div className={`card ${className}`} {...props}>
        {children}
    </div>
);

export const Select = ({ children, className = '', ...props }) => (
    <select className={`select ${className}`} {...props}>
        {children}
    </select>
);
