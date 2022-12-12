import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  id?: string;
}

export const VideoPlayer = ({ id }: VideoPlayerProps) => {
  if (!id) {
    return null;
  }

  return (
    <iframe
      className={styles.iframe}
      src={`https://www.youtube.com/embed/${id}`}
    />
  );
};
