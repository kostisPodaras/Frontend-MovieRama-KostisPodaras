import styles from './Chips.module.css';

interface ChipsProps {
  chips?: {
    value: string;
    id: number;
  }[];
}

export const Chips = ({ chips }: ChipsProps) => {
  if (!chips) {
    return null;
  }

  console.log('chips', chips);

  return (
    <div className={styles.container}>
      {chips.map(({ value, id }) => (
        <div key={id}>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
};
