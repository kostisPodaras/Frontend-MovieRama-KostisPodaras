import styles from './Chips.module.css';

interface ChipsProps {
  chips?: string[];
}

export const Chips = ({ chips }: ChipsProps) => {
  if (!chips) {
    return null;
  }

  return (
    <div className={styles.container}>
      {chips.map((element) => (
        <div>
          <p>{element}</p>
        </div>
      ))}
    </div>
  );
};
