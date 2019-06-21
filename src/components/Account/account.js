import React from 'react';

import { PasswordForgetForm } from '../PasswordForget/passwordForget';
import PasswordChangeForm from '../PasswordChange/passwordChange';

const AccountPage = () => (
  <div>
    <h1>Account Page</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);

export default AccountPage;