import React from "react";
import LogInPage from '../pages/LogInPage';
import SignUpPage from '../pages/SignUpPage';
import LanguageSelector from "../components/LanguageSelector";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import {HashRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import TopBar from "../components/TopBar";
import { t } from "i18next";

class App extends React.Component {

  state = {
    isLoggedIn: false,
    userName: undefined
  };

  onLoginSuccess =(userName) => {
    this.setState({
      userName : userName,
      isLoggedIn: true
    });
  };

  onLogoutSuccess =() => {
    this.setState({
      isLoggedIn: false,
      userName: undefined
    });
  }

  render(){

    const{isLoggedIn,userName} = this.state;

    return (
      <div>
        <Router>
          <TopBar userName = {userName} isLoggedIn = {isLoggedIn} onLogoutSuccess = {this.onLogoutSuccess}/>
          <Switch>
          <Route exact path="/">
          <HomePage isLoggedIn={isLoggedIn} userName={userName} t={t}/>
          </Route>
            {!isLoggedIn && <Route path ="/login" component = {(props) => {
              return <LogInPage {...props} onLoginSuccess = {this.onLoginSuccess} onLogoutSuccess = {this.onLogoutSuccess}/>
            }}/>}
            <Route path ="/signup" component = {SignUpPage}/>
            <Route path ="/user/:username" component = {UserPage}/>
            <Redirect to="/"/>
          </Switch>
        </Router>
        <LanguageSelector/>
      </div>
    );
  }
}

export default App;
