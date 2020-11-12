import Axios from 'axios';
import React from 'react';
import '../styles/profile.css';
import S3AvatarUpload from './S3Components/S3AvatarUpload';

export default function Profile({ signedIn, user }) {
  const [avatarUrl, setAvatarUrl] = React.useState(undefined);
  // console.log(search);
  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const avatarResponse = await Axios.post(
          'http://localhost:4000/get-avatar-url',
          {
            token,
            user,
          },
        );
        setAvatarUrl(avatarResponse.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="profile-main">
      <div className="avatar-cont">
        <img
          // src="https://bignokh.files.wordpress.com/2017/02/19c76c9bfacab70a3b9379f3fadc5323.png"
          // src="https://cdn.onlinewebfonts.com/svg/img_568656.png"
          src={avatarUrl}
          alt="avatar"
        ></img>
      </div>
      {user === signedIn.username ? (
        <S3AvatarUpload signedIn={signedIn} />
      ) : (
        <></>
      )}

      <div>{user}</div>
      <div>State</div>
      <div>Number of posts</div>
      {user !== signedIn.username ? (
        <>
          <button>Follow</button>
          <button>Chat</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
