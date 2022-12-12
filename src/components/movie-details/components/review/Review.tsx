import { Avatar } from 'components';
import styles from './Review.module.css';

interface ReviewProps {
  content: string;
  name: string;
  image: string;
}

export const Review = ({ content, name, image }: ReviewProps) => {
  return (
    <div className={styles.container}>
      <Avatar name={name} image={image} />

      <p className={styles.content}>Content: {content}</p>
    </div>
  );
};
