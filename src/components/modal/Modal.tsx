// @ts-nocheck
import { useEffect } from 'react';
import ReactDom from 'react-dom';
import styles from './Modal.module.css';

export const Modal = ({ isOpen, children, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDom.createPortal(
    <>
      <div onClick={onClose} className={styles.overlay}>
        <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
          {children}
        </div>
      </div>
    </>,
    document.getElementById('portal'),
  );
};
