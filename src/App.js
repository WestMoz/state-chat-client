import React from 'react';
import './App.css';
import PublicRoutes from './components/PublicRoutes';
import PrivateRoutes from './components/PrivateRoutes';
import { Auth } from 'aws-amplify';
import Navbar from './components/Navbar';

function App() {
  const [signedIn, setSignedIn] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setSignedIn(user);
      } catch (error) {
        setSignedIn(undefined);
        console.log('use effect log', error);
      }
    })();
  }, []);

  return (
    <div className="App">
      {signedIn ? (
        <>
          <Navbar signedIn={signedIn} setSignedIn={setSignedIn} />
          <PrivateRoutes setSignedIn={setSignedIn} signedIn={signedIn} />
        </>
      ) : (
        <PublicRoutes setSignedIn={setSignedIn} />
      )}
    </div>
  );
}

export default App;
