import { Review as ReviewType } from 'types';
import { Review } from '..';

import styles from './Reviews.module.css';

interface ReviewsProps {
  reviews: ReviewType[];
  maxReviewsShown: number;
}

export const Reviews = ({ reviews, maxReviewsShown = 2 }: ReviewsProps) => {
  if (reviews.length === 0) {
    return <p>No reviews found</p>;
  }

  const reviewsToShow = reviews.slice(0, maxReviewsShown);

  return (
    <div>
      <h4 className={styles.reviewsTitle}>Reviews</h4>
      {reviewsToShow.map(({ content, author_details, id }) => (
        <Review
          key={id}
          name={author_details.username}
          image={author_details.avatar_path}
          content={content}
        />
      ))}
    </div>
  );
};
