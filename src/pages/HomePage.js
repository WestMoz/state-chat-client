import React from 'react';
import MapChart from '../components/MapChart';
import '../styles/home.css';
import TestPost from '../components/test/TestPost';
import Axios from 'axios';
import LiveChat from '../components/LiveChat';

//STATS PAGE TO DISPLAY SPECIFIC STATS
//USER STATS ex: NUMBER OF POSTS/COMMENTS
export default function HomePage({ signedIn }) {
  const [trending, setTrending] = React.useState(undefined);
  React.useEffect(() => {
    (async function () {
      try {
        const trendingResp = await Axios.get(
          'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-trending-posts',
        );
        setTrending(trendingResp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="home-main">
      <div className="home-left">
        <div className="home-map">
          <MapChart signedIn={signedIn} />
        </div>
        <div className="home-title">Trending Posts</div>
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
