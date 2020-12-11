import React from 'react';
import SignIn from '../pages/Login/SignIn';
import SignUp from '../pages/Login/SignUp';
import Confirm from '../pages/Login/Confirm';
import NotFound from '../pages/NotFound';
import { Router } from '@reach/router';

export default function PublicRoutes({ setSignedIn }) {
  const [username, setUsername] = React.useState(undefined);
  const [password, setPassword] = React.useState(undefined);
  return (
    <Router>
      <SignIn setSignedIn={setSignedIn} path="/signin" />
      <SignUp
        setUsername={setUsername}
        setPassword={setPassword}
        path="/signup"
      />
      <Confirm
        username={username}
        password={password}
        setSignedIn={setSignedIn}
        path="/confirm"
      />
      <NotFound default />
    </Router>
  );
}
