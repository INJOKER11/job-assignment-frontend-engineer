import styles from "./ArticleCard.module.css";
import Avatar from "../Avatar/Avatar";

export default function ArticleCard() {

  return (
    <div className={styles.articlePreview}>
      <div className={styles.articleMeta}>
        <Avatar img={"http://i.imgur.com/Qr71crq.jpg"} />
        <div className={styles.info}>
          <a href="/public#/profile/ericsimmons" className={styles.author}>
            Eric Simons
          </a>
          <span className={styles.date}>January 20th</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" /> 29
        </button>
      </div>
      <a href="/public#/how-to-build-webapps-that-scale" className={styles.previewLink}>
        <h1>How to build webapps that scale</h1>
        <p>This is the description for the post.</p>
        <span>Read more...</span>
      </a>
    </div>
  );

}
