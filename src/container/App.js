import React from "react";
import LogInPage from '../pages/LogInPage';
import SignUpPage from '../pages/SignUpPage';
import LanguageSelector from "../components/LanguageSelector";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import {HashRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import TopBar from "../components/TopBar";
import { t } from "i18next";
import ChatPage from "../pages/ChatPage";
import {useSelector} from 'react-redux'


const App = () => {

const {isLoggedIn} = useSelector((store) => ({
  isLoggedIn: store.isLoggedIn
}));

return (
  <div>
    <Router>
      <TopBar/>
      <LanguageSelector/>
      <Switch>
      <Route exact path="/">
      <HomePage/>
      </Route>
        {!isLoggedIn && <Route path ="/login" component = {LogInPage}/>}
        <Route path ="/signup" component = {SignUpPage}/>
        <Route path ="/user/:username" component = {UserPage}/>
        <Route path ="/chat/:username" component={ChatPage} t = {t}/>
        <Redirect to="/"/>
      </Switch>
    </Router>
  </div>
);
}

export default App;
