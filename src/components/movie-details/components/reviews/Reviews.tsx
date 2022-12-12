import { Review } from 'types';

import styles from './Reviews.module.css';

interface ReviewsProps {
  reviews: Review[];
  maxReviewsShown: number;
}

export const Reviews = ({ reviews, maxReviewsShown = 2 }: ReviewsProps) => {
  if (reviews.length === 0) {
    return <p>No reviews found</p>;
  }

  const reviewsToShow = reviews.slice(0, maxReviewsShown);

  return (
    <div>
      {reviewsToShow.map((review) => (
        <div key={review.id}>
          <p>{review.author_details.username}</p>
        </div>
      ))}
    </div>
  );
};
