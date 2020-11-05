import React from 'react';
import StatsBar from '../components/StatsBar';
import Post from '../components/Post';
import '../styles/layout.css';
import Axios from 'axios';
import TestPost from '../components/test/TestPost';

export default function StatePage({ state, signedIn }) {
  const [posts, setPosts] = React.useState(undefined);
  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const stateResp = await Axios.post(
          'http://localhost:4000/get-posts-by-state',
          {
            token,
            state,
          },
        );
        setPosts(stateResp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(posts);
  return (
    <div className="main">
      <div className="left">
        <div>
          <p>{state}</p>
          <button>Trending</button>
          <button>New</button>
        </div>
        {posts &&
          posts.map((post) => <TestPost post={post} signedIn={signedIn} />)}
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      <div className="right">
        <StatsBar />
      </div>
    </div>
  );
}
