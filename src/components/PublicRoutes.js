import React from 'react';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Confirm from '../pages/Confirm';
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
    </Router>
  );
}
