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
      {chips.map((element, index) => (
        <div key={`genre-${index}`}>
          <p>{element}</p>
        </div>
      ))}
    </div>
  );
};
