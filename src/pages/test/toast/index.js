import React from 'react';
import { useModal } from '@hooks/modal';

const AppExample = () => {

  const {
    hide,
    show,
    showLoading,
    addToast
  } = useModal();

  return (
    <div className="p-5">
      <button 
        className="bg-green-500 p-2 rounded" 
        onClick={() => addToast('New toast added!', 'success')}
      >
        Add Toast Success
      </button>
      <button
        className="bg-red-500 p-2 rounded"
        onClick={() => addToast('New toast added!', 'error')}
      >
        Add Toast Error
      </button>
      <button
        className="bg-yellow-500 p-2 rounded"
        onClick={() => addToast('New toast added!', 'warning')}
      >
        Add Toast Warning
      </button>
      <button
        className="bg-blue-500 p-2 rounded"
        onClick={() => addToast('New toast added!', 'info')}
      >
        Add Toast Info
      </button>
      <button 
        className="bg-blue-500 p-2 rounded" 
        onClick={() => {
          showLoading();
          setTimeout(() => {
            hide();
          }, 2000);
        }}
      >
        Show Loading
      </button>
      <button 
        className="bg-blue-500 p-2 rounded" 
        onClick={() => show({
          name: 'notice',
          title: 'Notice',
          data: {
            message: 'This is a notice modal',
          },
          position: 'center',
          mobilePosition: 'center',
          confirmCallback: function() {
            console.log('confirm');
          }
        })}
      >
        Show Modal Center
      </button>
      <button 
        className="bg-blue-500 p-2 rounded" 
        onClick={() => show({
          name: 'notice',
          title: 'Notice',
          data: {
            message: 'This is a notice modal',
          },
          position: 'top',
          mobilePosition: 'top',
        })}
      >
        Show Modal Top
      </button>
      <button 
        className="bg-blue-500 p-2 rounded" 
        onClick={() => show({
          name: 'notice',
          title: 'Notice',
          data: {
            message: 'This is a notice modal',
          },
          position: 'bottom',
          mobilePosition: 'bottom',
        })}
      >
        Show Modal Bottom
      </button>
      <button 
        className="bg-blue-500 p-2 rounded" 
        onClick={() => show({
          name: 'notice',
          title: 'Notice',
          data: {
            message: 'This is a notice modal',
          },
          position: 'left',
          mobilePosition: 'left',
        })}
      >
        Show Modal Left
      </button>
      <button 
        className="bg-blue-500 p-2 rounded" 
        onClick={() => show({
          name: 'notice',
          title: 'Notice',
          data: {
            message: 'This is a notice modal',
          },
          position: 'right',
          mobilePosition: 'right',
        })}
      >
        Show Modal Right
      </button>

    </div>
  );
};

// test

export default AppExample;