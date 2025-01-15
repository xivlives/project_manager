import React, { useState, useEffect } from 'react';
import '../styles/toast.css';
import { CheckIcon } from '@heroicons/react/24/solid';

const Toast = ({ message, show, duration = 3000 }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  return (
    <div className={`toast ${visible ? 'show' : ''}`}>
      <div className="toast-icon">
        <div className="checkmark"><CheckIcon/></div>
      </div>
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;