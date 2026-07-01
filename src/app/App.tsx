import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import ArticlePage from "../pages/Article/ArticlePage";
import HomePage from "../pages/Home/HomePage";
import Editor from "../Editor";
import LoginRegisterPage from "../pages/Login/LoginRegisterPage";
import Logout from "../Logout";
import ProfilePage from "../pages/Profile/ProfilePage";
import SettingsPage from "../pages/Settings/SettingsPage";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/editor" exact component={Editor} />
          <Route path="/editor/:slug" exact component={Editor} />
          <Route path="/login" exact component={LoginRegisterPage} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/profile/:username" exact component={ProfilePage} />
          <Route path="/profile/:username/favorites" exact component={ProfilePage} />
          <Route path="/register" exact component={LoginRegisterPage} />
          <Route path="/settings" exact component={SettingsPage} />
          <Route path="/:slug" exact component={ArticlePage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
