import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../../shared/api/profileApi";
import Avatar from "../../components/Avatar/Avatar";
import { useEffect, useState } from "react";
import { articlesApi } from "../../shared/api/articlesApi";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import FollowButton from "../../components/FollowButton/FollowButton";

export default function ProfilePage() {
  const [showFavorite, setShowFavorite] = useState(false);
  const { username } = useParams<{username: string}>();
  const history = useHistory();

  const {data: profileData, isLoading, isError} = useQuery({
    queryKey: ["profile", username],
    queryFn: () => profileApi.getRecord(username),
  });

  const { data: articlesData } = useQuery({
    queryKey: ["articles", showFavorite ? "favorite" : "byUser", username],
    queryFn: () => articlesApi.getList(showFavorite ? { favorited: username } : { author: username }),
    enabled: !!profileData,
  });
  useEffect(() => {
    if (isError) {
      history.push("/");
    }
  }, [isError, history]);

  if(isLoading) {
    return <div>Loading...</div>
  }


  if (!profileData) {
    return null;
  }


  return (
    <>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1 ">
                <Avatar username={profileData.profile.username} size={"lg"} img={profileData.profile.image} />
                <h4>{profileData.profile.username}</h4>
                <p>{profileData.profile.bio}</p>
                <FollowButton profile={profileData.profile} />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className={`nav-link ${!showFavorite && "active"}`} onClick={() => setShowFavorite(false)}>
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={`nav-link ${showFavorite && "active"}`} onClick={() => setShowFavorite(true)}>
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>

              {!articlesData?.articlesCount ? (
                <div>No articles are here... yet.</div>
              ) : (
                articlesData.articles.map(a => <ArticleCard article={a} key={a.slug} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
