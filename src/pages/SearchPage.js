import Axios from 'axios';
import React from 'react';
import Post from '../components/Post';
import StatsBar from '../components/StatsBar';
import TestPost from '../components/test/TestPost';
import '../styles/layout.css';

export default function SearchPage({ search, signedIn }) {
  const [posts, setPosts] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const searchResp = await Axios.post('http://localhost:4000/search', {
          token,
          search,
        });
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
        <Post />
        <Post />
        <Post />
        <Post />
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
