import styles from './Avatar.module.css';

interface AvatarProps {
  name: string;
  image: string;
}

export const Avatar = ({ name, image }: AvatarProps) => {
  const hasAvatarImage = !image?.includes('gravatar');
  const backgroundImage = hasAvatarImage
    ? `url(https://image.tmdb.org/t/p/w500${image})`
    : 'unset';
  const initials = name.substring(0, 2).toUpperCase();

  return (
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
  );
};
