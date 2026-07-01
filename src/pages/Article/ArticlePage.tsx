import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/Button/Button";
import { Link, useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { articlesApi } from "../../shared/api/articlesApi";
import { useEffect } from "react";
import { Article } from "../../shared/types/articles";
import { useAuth } from "../../hooks/useAuth";
import FollowButton from "../../components/FollowButton/FollowButton";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const history = useHistory();
  const queryClient = useQueryClient();
  const {isAuthenticated} = useAuth();

  const {
    data: articleData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => articlesApi.getRecord(slug),
  });

  // todo: hook
  const favoriteMutation = useMutation({
    mutationFn: (article: Article) =>
      !articleData?.article.favorited
        ? articlesApi.addToFavorite(article.slug)
        : articlesApi.removeFromFavorite(article.slug),
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
      queryClient.invalidateQueries(["article", slug]);
    },
  });

  useEffect(() => {
    if (isError) {
      history.push("/");
    }
  }, [isError, history]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!articleData) {
    return null;
  }

  const handleFavoriteButton = () => {
    if (!isAuthenticated) history.push("/login");
    favoriteMutation.mutate(articleData.article);
  };


  return (
    <>
      <div className="article-page">
        <div className="banner">
          <div className="container article-banner-inner">
            <h1>{articleData.article.title}</h1>

            <div className="article-meta">
              <Avatar username={articleData.article.author.username} img={articleData.article.author.image} />
              <div className="info">
                <a href={`profile/${articleData.article.author.username}`} className="author">
                  {articleData.article.author.username}
                </a>
                <span className="date">January 20th</span>
              </div>
              {/*todo: find where i can get follows count*/}
              <FollowButton profile={articleData.article.author} />
              &nbsp;&nbsp;
              <Button className="btn btn-sm btn-outline-primary" onClick={handleFavoriteButton}>
                <i className="ion-heart" />
                &nbsp; Favorite Post <span className="counter">{articleData.article.favoritesCount}</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>Web development technologies have evolved at an incredible clip over the past few years.</p>
              <h2 id="introducing-ionic">Introducing RealWorld.</h2>
              <p>It&lsquo;s a great solution for learning how other frameworks work.</p>
            </div>
          </div>
          <hr />

          <div className="article-actions">
            <div className="article-meta bottom-article-meta">
              <Avatar username={articleData.article.author.username} img={articleData.article.author.image} />
              <div className="info">
                <Link to={`profile/${articleData.article.author.username}`} className="author">
                  {articleData.article.author.username}
                </Link>
                <span className="date">January 20th</span>
              </div>
              {/*todo: find where i can get follows count*/}
              <FollowButton profile={articleData.article.author} />
              &nbsp;&nbsp;
              <Button className="btn btn-sm btn-outline-primary" onClick={handleFavoriteButton}>
                <i className="ion-heart" />
                &nbsp; Favorite Post <span className="counter">{articleData.article.favoritesCount}</span>
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea className="form-control" placeholder="Write a comment..." rows={3} />
                </div>
                <div className="card-footer">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  <button className="btn btn-sm btn-primary">Post Comment</button>
                </div>
              </form>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <a href="/public#/profile/jacobschmidt" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/public#/profile/jacobschmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                </div>
              </div>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <a href="/public#/profile/jacobschmidt" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/public#/profile/jacobschmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                  <span className="mod-options">
                    <i className="ion-edit" />
                    <i className="ion-trash-a" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
