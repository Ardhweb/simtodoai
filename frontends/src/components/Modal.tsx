import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // don't render modal if closed

  return (
    <div
      className="fixed inset-0 bg-black  flex justify-center items-center z-50"
      onClick={onClose} // close if click outside modal box
    >
      <div
        className="bg-white text-current rounded-lg p-6 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()} // prevent close if click inside modal box
      >
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;
