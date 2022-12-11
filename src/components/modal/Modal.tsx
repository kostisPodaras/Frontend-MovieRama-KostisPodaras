// @ts-nocheck
import ReactDom from 'react-dom';
import styles from './Modal.module.css';

export const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <>
      <div className={styles.overlay} />
      <div className={styles.modal}>
        <button onClick={onClose}>Close Modal</button>
        {children}
      </div>
    </>,
    document.getElementById('portal'),
  );
};
