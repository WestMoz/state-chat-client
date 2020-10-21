import React from 'react';
import MapChart from '../components/MapChart';
import Post from '../components/Post';
import Profile from '../components/Profile';
import '../styles/home.css';
import TopNav from '../components/TopNav';

export default function HomePage() {
  return (
    <div className="home-main">
      <div className="home-left">
        <Profile />
      </div>
      {/* This is the home page */}
      <div className="home-right">
        <div className="top-nav">
          <TopNav />
        </div>
        <div className="home-map">
          <MapChart />
        </div>
        <div>Trending</div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>

      {/* <div style={styles.post}>
        <Post />
      </div> */}
    </div>
  );
}
