import styles from "./Avatar.module.css";
import defaultAvatar from "../../assets/images/default-avatar.jpeg";

type AvatarProps = {
  img?: string;
}

export default function Avatar(props: AvatarProps) {
  const {img } = props;
  return (
    <a href="/public#/profile/ericsimmons" className={styles.avatarLink}>
      <img src={img ?? defaultAvatar} alt={"avatar"} className={styles.avatar} />
    </a>
  );

}
