import styles from './RatingStar.module.css';

interface RatingStar {
  rating: number;
}

export const RatingStar = ({ rating }: RatingStar) => (
  <div
    className={`${rating > 6 ? styles.aboveAverage : styles.belowAverage} ${
      styles.rating
    }`}
  />
);
