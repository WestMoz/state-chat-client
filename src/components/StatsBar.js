import React from 'react';
import '../styles/statsbar.css';

export default function StatsBar() {
  return (
    <div className="stats-main">
      {/* <div className="stats-title">Stats</div> */}
      <div className="stats-cont">
        <p>Top 5 States</p>
        <div className="state">
          <p>California</p>
          <p>Posts: 144</p>
          <p>Comments: 234</p>
          <p>Likes: 672</p>
        </div>
        <div className="state">
          <p>California</p>
          <p>Posts: 144</p>
          <p>Comments: 234</p>
          <p>Likes: 672</p>
        </div>
        <div className="state">
          <p>California</p>
          <p>Posts: 144</p>
          <p>Comments: 234</p>
          <p>Likes: 672</p>
        </div>
        <div className="state">
          <p>California</p>
          <p>Posts: 144</p>
          <p>Comments: 234</p>
          <p>Likes: 672</p>
        </div>
        <p>New Posts</p>
        <div>Post Preview</div>
        <div>Post Preview</div>
        <div>Post Preview</div>
      </div>
    </div>
  );
}
