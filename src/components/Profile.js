import Axios from 'axios';
import React from 'react';
import '../styles/profile.css';
import S3AvatarUpload from './S3Components/S3AvatarUpload';

export default function Profile({ signedIn, user }) {
  const [avatarUrl, setAvatarUrl] = React.useState(undefined);
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const avatarResponse = await Axios.get(
          'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-avatar-url',
          {
            params: {
              username: user,
            },
          },
        );
        setAvatarUrl(avatarResponse.data);

        if (user !== signedIn.username) {
          const followResp = await Axios.get(
            'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-is-followed',
            {
              params: {
                followedBy: signedIn.username,
                followed: user,
              },
            },
          );

          setIsFollowed(followResp.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user, refresh]);

  async function follow() {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      await Axios.post(
        'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/follow',
        {
          token,
          user,
        },
      );
      setIsFollowed(true);
      await Axios.post(
        'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/create-notification',
        {
          token,
          userFor: user,
          message: `${signedIn.username} has started following you`,
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function unfollow() {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      await Axios.put(
        'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/unfollow',
        {
          token,
          user,
        },
      );
      setIsFollowed(false);
      await Axios.post(
        'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/create-notification',
        {
          token,
          userFor: user,
          message: `${signedIn.username} has unfollowed you`,
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="profile-main">
      <div className="avatar-cont">
        <img src={avatarUrl} alt="avatar"></img>
        {user === signedIn.username ? (
          <div className="upload-cont">
            <S3AvatarUpload
              signedIn={signedIn}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="prof-username">{user}</div>
      <div>
        {user !== signedIn.username ? (
          <>
            {isFollowed ? (
              <button class="btn btn-info" onClick={() => unfollow()}>
                Unfollow
              </button>
            ) : (
              <button class="btn btn-info" onClick={() => follow()}>
                Follow
              </button>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
