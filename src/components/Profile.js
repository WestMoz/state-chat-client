import Axios from 'axios';
import React from 'react';
import '../styles/profile.css';
import S3AvatarUpload from './S3Components/S3AvatarUpload';

export default function Profile({ signedIn, user }) {
  const [avatarUrl, setAvatarUrl] = React.useState(undefined);
  const [isFollowed, setIsFollowed] = React.useState(false);
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

        if (user !== signedIn.username) {
          const followResp = await Axios.post(
            'http://localhost:4000/get-is-followed',
            {
              token,
              user,
            },
          );

          setIsFollowed(followResp.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function follow() {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      await Axios.post('http://localhost:4000/follow', {
        token,
        user,
      });
      setIsFollowed(true);
      await Axios.post('http://localhost:4000/create-notification', {
        token,
        userFor: user,
        message: `${signedIn.username} has started following you`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function unfollow() {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      await Axios.post('http://localhost:4000/unfollow', {
        token,
        user,
      });
      setIsFollowed(false);
      await Axios.post('http://localhost:4000/create-notification', {
        token,
        userFor: user,
        message: `${signedIn.username} has unfollowed you`,
      });
    } catch (error) {
      console.log(error);
    }
  }

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
          {isFollowed ? (
            <button onClick={() => unfollow()}>Unfollow</button>
          ) : (
            <button onClick={() => follow()}>Follow</button>
          )}
          {/* <button>Follow</button> */}
          <button>Chat</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
