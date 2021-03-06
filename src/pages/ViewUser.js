import Axios from 'axios';
import React from 'react';
import TestPost from '../components/test/TestPost';
import Profile from '../components/Profile';
import '../styles/viewuser.css';
import Following from '../components/Following';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function ViewUser({ user, signedIn }) {
  const [userPosts, setUserPosts] = React.useState(undefined);
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async function () {
      console.log('in use effect');
      try {
        const posts = await Axios.get(
          'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-user-posts-ranked',
          {
            params: {
              creator: user,
            },
          },
        );
        if (posts.data.length > 0) setUserPosts(posts.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [refresh, user]);

  function sortNew() {
    setUserPosts([...userPosts].sort((a, b) => b.timestamp - a.timestamp));
  }

  function sortOld() {
    setUserPosts([...userPosts].sort((a, b) => a.timestamp - b.timestamp));
  }

  function sortTop() {
    setUserPosts([...userPosts].sort((a, b) => b.totalCount - a.totalCount));
  }

  return (
    <div className="user-main">
      <div className="user-left">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => sortTop()}
          >
            Top
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => sortNew()}
          >
            Newest
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => sortOld()}
          >
            Oldest
          </button>
        </div>
        {loading ? (
          <LinearProgress></LinearProgress>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        {userPosts ? (
          userPosts.map((post) => (
            <TestPost
              user={user}
              post={post}
              signedIn={signedIn}
              refresh={refresh}
              setRefresh={setRefresh}
              key={post.postId}
            />
          ))
        ) : (
          <div>This user has not created any posts...</div>
        )}
      </div>
      <div className="user-right">
        <Profile signedIn={signedIn} user={user} />
        <Following signedIn={signedIn} followedBy={user} />
      </div>
    </div>
  );
}
