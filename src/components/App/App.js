import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from '../Navbar/navbar';
import { BrowserRouter as Router, Route, } from 'react-router-dom';


import Navigation from '../Navigation/navigation';
import LandingPage from '../Landing/landing';
import SignUpPage from '../SignUp/signUp';
import SignInPage from '../SignIn/signIn';
import PasswordForgetPage from '../PasswordForget/passwordForget';
import HomePage from '../Home/home';
import AccountPage from '../Account/account';
import AdminPage from '../Admin/admin';

import * as ROUTES from '../../constants/routes';

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <Router>
        <div>
        <Navigation />

              <hr />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>

    </div>
  );
}

export default App;
