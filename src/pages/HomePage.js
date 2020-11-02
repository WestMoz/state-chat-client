import React from 'react';
import MapChart from '../components/MapChart';
import Post from '../components/Post';
import Profile from '../components/Profile';
import '../styles/home.css';
import TopNav from '../components/TopNav';
import StatsBar from '../components/StatsBar';
import CreatePost from '../components/CreatePost';

//STATS PAGE TO DISPLAY SPECIFIC STATS
//USER STATS ex: NUMBER OF POSTS/COMMENTS
export default function HomePage({ signedIn }) {
  return (
    <div className="home-main">
      <div className="home-left">
        <div className="home-map">
          <MapChart />
        </div>
        <p>Trending</p>
        <CreatePost signedIn={signedIn} />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />

        {/* <Profile /> */}
      </div>
      {/* This is the home page */}
      <div className="home-right">
        {/* <div className="top-nav">
          <TopNav />
        </div> */}
        <StatsBar />
      </div>

      {/* <div style={styles.post}>
        <Post />
      </div> */}
    </div>
  );
}
