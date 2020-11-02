import React from 'react';
import StatsBar from '../components/StatsBar';
import Post from '../components/Post';
import '../styles/layout.css';

export default function StatePage({ state }) {
  return (
    <div className="main">
      <div className="left">
        {state}
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
