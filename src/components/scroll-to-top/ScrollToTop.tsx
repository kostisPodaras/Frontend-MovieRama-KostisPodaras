import { useEffect, useState } from 'react';
import styles from './ScrollTopTop.module.css';

export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!showTopBtn) {
    return null;
  }

  return (
    <div className={styles.container} onClick={scrollToTop}>
      <div className={styles.arrow} />
    </div>
  );
};
