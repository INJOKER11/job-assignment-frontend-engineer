import styles from "./Avatar.module.css";
import defaultAvatar from "../../assets/images/default-avatar.jpeg";
import clsx from "clsx";
import { Link } from "react-router-dom";

type AvatarProps = {
  img?: string;
  size?: "sm" | "lg",
  username: string;
}


export default function Avatar({ img, size = "sm", username }: AvatarProps) {
  return (
    <Link to={`profile/${username}`} className={styles.avatarLink}>
      <img
        src={img || defaultAvatar}
        alt="avatar"
        className={clsx(styles.avatar, size === "lg" ? styles.avatarLg : styles.avatarSm)}
      />
    </Link>
  );
}
