import Axios from 'axios';
import React from 'react';
import Post from '../components/Post';
import StatsBar from '../components/StatsBar';
import TestPost from '../components/test/TestPost';
import '../styles/layout.css';
import LiveChat from '../components/LiveChat';

export default function SearchPage({ search, signedIn }) {
  const [posts, setPosts] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const searchResp = await Axios.post(
          'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/search',
          {
            token,
            search,
          },
        );
        setPosts(searchResp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [search]);

  console.log(posts);
  return (
    <div className="main">
      <div className="left">
        {posts && posts.length > 0 ? (
          posts.map((post) => <TestPost signedIn={signedIn} post={post} />)
        ) : (
          <div> sorry none found</div>
        )}
      </div>
      <div className="right">
        <LiveChat signedIn={signedIn} />
      </div>
    </div>
  );
}
