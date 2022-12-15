import styles from './Spinner.module.css';

export const Spinner = () => (
  <div data-testid="spinner" className={styles.container}>
    <div className={styles.spinner} />
  </div>
);
