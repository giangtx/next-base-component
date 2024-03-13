import React, { useEffect, useRef } from 'react';

const Toast = ({ id, index, message, type, removeToast }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (toastRef.current) {
      let toastTranslate = -(index - 1) * 60;
      if (index == 0) {
        toastTranslate = 20;
      }
      const toastTranslateActive = -index * 60;
      toastRef.current.style.setProperty('--toast-translate', `${toastTranslate}px`); // Set toast translate y start
      toastRef.current.style.setProperty('--toast-translate-active', `${toastTranslateActive}px`);
      setTimeout(() => {
        toastRef.current.classList.add('toast-show');
      })
    }
   
    const interval = setInterval(() => {
      toastRef.current.classList.remove('toast-show');
      setTimeout(() => {
        removeToast(id);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, [id, removeToast]);

  const handleRemoveToast = () => {
    toastRef.current.classList.remove('toast-show');
    setTimeout(() => {
      removeToast(id);
    }, 300);
  }
  
  return (
    <div
      ref={toastRef}
      className={
        `toast ${type ? 'toast-' + type : 'toast-info'} p-2 mb-3 rounded cursor-pointer`
      }
      onClick={() => handleRemoveToast(id)}
    >
      {message}
    </div>
  )
};

export default Toast;