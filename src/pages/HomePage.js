import React from 'react';
import MapChart from '../components/MapChart';
import '../styles/home.css';
import TestPost from '../components/test/TestPost';
import Axios from 'axios';
import LiveChat from '../components/LiveChat';
import LinearProgress from '@material-ui/core/LinearProgress';

//STATS PAGE TO DISPLAY SPECIFIC STATS
//USER STATS ex: NUMBER OF POSTS/COMMENTS
export default function HomePage({ signedIn }) {
  const [trending, setTrending] = React.useState(undefined);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    (async function () {
      try {
        const trendingResp = await Axios.get(
          'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-trending-posts',
        );
        setTrending(trendingResp.data);
        setLoading(false);
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
        {loading ? (
          <LinearProgress></LinearProgress>
        ) : (
          <React.Fragment>
            {trending &&
              trending.map((post) => (
                <TestPost key={post.postId} post={post} signedIn={signedIn} />
              ))}
          </React.Fragment>
        )}
      </div>
      <div className="home-right">
        <LiveChat signedIn={signedIn} />
      </div>
    </div>
  );
}
