import { navigate } from '@reach/router';
import React from 'react';

export default function NotFound({ signedIn }) {
  return (
    <React.Fragment>
      <div style={styles.main}>
        <div>PAGE NOT FOUND</div>
        {signedIn ? (
          <div onClick={() => navigate('/home')}>Home Page</div>
        ) : (
          <div onClick={() => navigate('/signin')}>Sign In</div>
        )}
      </div>
    </React.Fragment>
  );
}

const styles = {
  main: {
    width: '100vw',
    height: '100vh',
  },
};
