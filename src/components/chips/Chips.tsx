import styles from './Chips.module.css';

interface ChipsProps {
  handleClick?: any;
  stylesOverride?: string;
  active?: string;
  chips?: {
    name: string;
    id: number | string;
  }[];
}

export const Chips = ({
  chips,
  handleClick,
  active,
  stylesOverride,
}: ChipsProps) => {
  if (!chips) {
    return null;
  }

  return (
    <div className={`${styles.container} ${stylesOverride}`}>
      {chips.map(({ name, id }) => (
        <div
          className={`${styles.chip} ${active === name ? styles.active : ''}`}
          onClick={() => {
            handleClick && handleClick(name);
          }}
          key={id}>
          <p className={styles.chipText}>{name}</p>
        </div>
      ))}
    </div>
  );
};
