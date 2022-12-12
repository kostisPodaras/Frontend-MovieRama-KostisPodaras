import styles from './Avatar.module.css';

interface AvatarProps {
  name: string;
  image: string;
  content: string;
}

export const Avatar = ({ name, image, content }: AvatarProps) => {
  const hasAvatarImage = !image.includes('gravatar');
  const backgroundImage = hasAvatarImage
    ? `url(https://image.tmdb.org/t/p/w500${image})`
    : 'unset';
  const initials = name.substring(0, 2).toUpperCase();

  return (
    <div>
      <div className={styles.nameWrapper}>
        <div
          style={{
            backgroundImage,
          }}
          className={styles.avatar}>
          {!hasAvatarImage && <p>{initials}</p>}
        </div>

        <p>{name}</p>
      </div>

      <p className={styles.content}>Content: {content}</p>
    </div>
  );
};
