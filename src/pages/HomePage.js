import React from 'react';
import MapChart from '../components/MapChart';
import Post from '../components/Post';
import '../styles/home.css';
import StatsBar from '../components/StatsBar';
import TestPost from '../components/test/TestPost';
import Axios from 'axios';

//STATS PAGE TO DISPLAY SPECIFIC STATS
//USER STATS ex: NUMBER OF POSTS/COMMENTS
export default function HomePage({ signedIn }) {
  const [posts, setPosts] = React.useState(undefined);
  React.useEffect(() => {
    (async function () {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const response = await Axios.post('http://localhost:4000/get-all-posts', {
        token,
      });
      setPosts(response.data);
    })();
  }, []);
  console.log(posts);

  return (
    <div className="home-main">
      <div className="home-left">
        <div className="home-map">
          <MapChart />
        </div>
        <p>Trending</p>
        {/* <CreatePost signedIn={signedIn} /> */}
        {posts &&
          posts.map((post) => <TestPost post={post} signedIn={signedIn} />)}
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      <div className="home-right">
        <StatsBar />
      </div>
    </div>
  );
}
