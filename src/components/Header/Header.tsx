import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

export default function Header () {
  const {isAuthenticated, user} = useAuth();
  console.log(user);
  return (
    <nav className="navbar navbar-light">
      <div className="container header-inner">
        <a className="navbar-brand" href="/public#">
          Conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* Add "active" class when you're on that page" */}
            <a className="nav-link active" href="/public#">
              Home
            </a>
          </li>
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/public#/editor">
                  <i className="ion-compose" />
                  &nbsp;New Article
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/public#/settings">
                  <i className="ion-gear-a" />
                  &nbsp;Settings
                </a>
              </li>
            </>
          )}
          {isAuthenticated && user && (
              <li className={"nav-item avatar-container"}>
                  <Avatar username={user.username} img={user.image} />
                  <span className={"nav-link"}>{user.username}</span>
              </li>
          )}
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/public#/login">
                  Sign in
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/public#/register">
                  Sign up
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
