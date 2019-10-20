import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from '../Navbar/navbar.js';
import Navigation from '../Navigation/navigation';
import LandingPage from '../Landing/landing';
import SignUpPage from '../SignUp/signUp';
import SignInPage from '../SignIn/signIn';
import PasswordForgetPage from '../PasswordForget/passwordForget';
import HomePage from '../Home/home';
import AccountPage from '../Account/account';
import AdminPage from '../Admin/admin';
import MessagesPage from '../Messages/messagesBoard'
import CalendarPage from '../Calendar/calendar'
import GroceriesPage from '../Groceries/groceries';
import PaymentsPage from '../Payments/payments';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navbar/>

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.MESSAGES} component={MessagesPage} />
      <Route path={ROUTES.CALENDAR} component={CalendarPage} />
      <Route path={ROUTES.GROCERIES} component={GroceriesPage} />
      <Route path={ROUTES.PAYMENTS} component={PaymentsPage} />
    </div>
  </Router>
);

export default withAuthentication(App);
