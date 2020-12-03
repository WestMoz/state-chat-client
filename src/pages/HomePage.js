import React from 'react';
import MapChart from '../components/MapChart';
import Post from '../components/Post';
import '../styles/home.css';
import TestPost from '../components/test/TestPost';
import Axios from 'axios';
import LiveChat from '../components/LiveChat';
import Following from '../components/Following';

//STATS PAGE TO DISPLAY SPECIFIC STATS
//USER STATS ex: NUMBER OF POSTS/COMMENTS
export default function HomePage({ signedIn }) {
  const [trending, setTrending] = React.useState(undefined);
  React.useEffect(() => {
    (async function () {
      try {
        const trendingResp = await Axios.get(
          'http://localhost:4000/get-trending-posts',
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
        <div className="home-title">Trending Posts</div>
        {/* <CreatePost signedIn={signedIn} /> */}
        {trending &&
          trending.map((post) => (
            <TestPost key={post.postId} post={post} signedIn={signedIn} />
          ))}
      </div>
      <div className="home-right">
        <LiveChat signedIn={signedIn} />
      </div>
    </div>
  );
}
