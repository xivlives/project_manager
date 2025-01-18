'use client';
import React from 'react';
import '../styles/LoadSpinner.css';


const LoadSpinner = () => {
    return (
        <div className="loader-container">
            <div className="pulse-loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default LoadSpinner;