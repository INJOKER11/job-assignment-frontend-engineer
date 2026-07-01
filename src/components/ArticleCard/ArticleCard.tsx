import styles from "./ArticleCard.module.css";
import Avatar from "../Avatar/Avatar";
import { Article } from "../../shared/types/articles";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/date";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

type ArticleCardProps = {
  article: Article
}


export default function ArticleCard(props: ArticleCardProps) {
  const {article} = props;

  return (
    <div className={styles.articlePreview}>
      <div className={styles.articleMeta}>
        <Avatar username={article.author.username} img={article.author.image} />
        <div className={styles.info}>
          <Link to={`/profile/${article.author.username}`} className={styles.author}>
            {article.author.username}
          </Link>
          <span className={styles.date}>{formatDate(article.createdAt)}</span>
        </div>
        <FavoriteButton slug={article.slug} favorited={article.favorited} favoritesCount={article.favoritesCount}/>
      </div>
      <Link to={article.slug} className={styles.previewLink}>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );

}
