import { Review } from 'types';

import styles from './Reviews.module.css';

interface ReviewsProps {
  reviews: Review[];
}

export const Reviews = ({ reviews }: ReviewsProps) => {
  return <p>Reviews</p>;
};
