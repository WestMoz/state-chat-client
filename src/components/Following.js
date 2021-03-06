import { navigate } from '@reach/router';
import Axios from 'axios';
import React from 'react';
import '../styles/following.css';

export default function Following({ signedIn, followedBy }) {
  const [following, setFollowing] = React.useState([]);
  React.useEffect(() => {
    (async function () {
      try {
        const followingResp = await Axios.get(
          'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-followed',
          {
            params: {
              followedBy,
            },
          },
        );
        console.log(followingResp.data);
        setFollowing(followingResp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [followedBy]);

  return (
    <div className="following-main">
      <div className="following-title">Following</div>
      <div className="following-cont">
        {following.length > 0 ? (
          following.map((follow) => {
            return (
              <div
                className="followed-user"
                onClick={() => navigate(`/user/${follow.followed}`)}
              >
                {follow.followed}
              </div>
            );
          })
        ) : (
          <div>No followed users</div>
        )}
      </div>
    </div>
  );
}
