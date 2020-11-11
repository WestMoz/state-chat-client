import React from 'react';
import MapChart from '../components/MapChart';
import Post from '../components/Post';
import '../styles/home.css';
import StatsBar from '../components/StatsBar';
import TestPost from '../components/test/TestPost';
import Axios from 'axios';
import LiveChat from '../components/LiveChat';

//STATS PAGE TO DISPLAY SPECIFIC STATS
//USER STATS ex: NUMBER OF POSTS/COMMENTS
export default function HomePage({ signedIn }) {
  const [posts, setPosts] = React.useState(undefined);
  const [trending, setTrending] = React.useState(undefined);
  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await Axios.post(
          'http://localhost:4000/get-all-posts',
          {
            token,
          },
        );
        setPosts(response.data);
        const trendingResp = await Axios.post(
          'http://localhost:4000/get-trending-posts',
          {
            token,
          },
        );
        setTrending(trendingResp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  // console.log(posts);
  // console.log(trending);

  return (
    <div className="home-main">
      <div className="home-left">
        <div className="home-map">
          <MapChart signedIn={signedIn} />
        </div>
        <p>Trending</p>
        {/* <CreatePost signedIn={signedIn} /> */}
        {trending &&
          trending.map((post) => (
            <TestPost key={post.postId} post={post} signedIn={signedIn} />
          ))}
        {/* {posts &&
          posts.map((post) => <TestPost post={post} signedIn={signedIn} />)} */}
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      <div className="home-right">
        {/* <StatsBar /> */}
        <LiveChat signedIn={signedIn} />
      </div>
    </div>
  );
}
