import { navigate } from '@reach/router';
import Axios from 'axios';
import React from 'react';
import '../styles/navbar.css';
import SearchBar from './SearchBar';
import { Auth } from 'aws-amplify';

export default function Navbar({ signedIn, setSignedIn }) {
  const [avatarUrl, setAvatarUrl] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;

        const avatarResponse = await Axios.post(
          'http://localhost:4000/get-avatar-url',
          {
            token,
            user: signedIn.username,
          },
        );
        setAvatarUrl(avatarResponse.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="nav-main">
      <div className="nav-left">
        <div
          className="nav-home"
          onClick={() => {
            navigate('/home');
          }}
        >
          Home
        </div>
        <button onClick={() => navigate('/create')}>Create Post</button>
      </div>
      <div className="nav-mid">
        <SearchBar />
      </div>
      <div className="nav-right">
        <button onClick={() => navigate(`/user/${signedIn.username}`)}>
          Profile
        </button>
        <button>Notifications</button>
        <button>Messages</button>
        <button
          onClick={() => {
            (async function () {
              try {
                await Auth.signOut({ global: true });
                setSignedIn(undefined);
                navigate('/signin');
              } catch (error) {
                console.log(error);
              }
            })();
          }}
        >
          Sign Out
        </button>
        <img
          // src="https://bignokh.files.wordpress.com/2017/02/19c76c9bfacab70a3b9379f3fadc5323.png"
          src={avatarUrl}
          alt="avatar"
          height="80%"
          style={{
            borderRadius: '10px',
            backgroundColor: 'lightcoral',
            border: '1px solid white',
            padding: '4px',
          }}
        ></img>
      </div>
    </div>
  );
}
