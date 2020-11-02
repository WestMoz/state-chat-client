import React from 'react';
import MapChart from '../components/MapChart';
import Post from '../components/Post';
import '../styles/home.css';
import StatsBar from '../components/StatsBar';

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
        {/* <CreatePost signedIn={signedIn} /> */}
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
