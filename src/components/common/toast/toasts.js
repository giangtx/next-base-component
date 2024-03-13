import React, { useEffect } from 'react';
import { useModal } from '@hooks/modal';
import Toast from './toast';

const Toasts = () => {
  const { toasts, removeToast } = useModal();

  return (
    <div className='toasts bottom-1 right-1'>
      {toasts.map((toast, index) => (
        <Toast 
          key={toast.id} 
          id={toast.id} 
          index={index}
          message={toast.message}
          type={toast.type}
          removeToast={removeToast} 
        />
      ))}
    </div>
  );
};

export default Toasts;