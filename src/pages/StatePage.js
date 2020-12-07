import React from 'react';
import '../styles/layout.css';
import Axios from 'axios';
import TestPost from '../components/test/TestPost';
import LiveChat from '../components/LiveChat';

export default function StatePage({ state, signedIn }) {
  const [posts, setPosts] = React.useState(undefined);
  React.useEffect(() => {
    (async function () {
      try {
        const stateResp = await Axios.get(
          'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-state-posts-ranked',
          {
            params: {
              state,
            },
          },
        );
        setPosts(stateResp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  function sortNew() {
    setPosts([...posts].sort((a, b) => b.timestamp - a.timestamp));
  }

  function sortOld() {
    setPosts([...posts].sort((a, b) => a.timestamp - b.timestamp));
  }

  function sortTop() {
    setPosts([...posts].sort((a, b) => b.totalCount - a.totalCount));
  }

  return (
    <div className="main">
      <div className="left">
        <div>
          <div className="state-title">{state} Posts</div>
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
        </div>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <TestPost post={post} signedIn={signedIn} key={post.postId} />
          ))
        ) : (
          <div style={{ fontSize: '16px', textAlign: 'center' }}>
            No posts for this state...
          </div>
        )}
      </div>
      <div className="right">
        <LiveChat signedIn={signedIn} />
      </div>
    </div>
  );
}
