import React from 'react';
import CreatePost from '../components/CreatePost';
import Dropdown from '../components/Dropdown';
import StatsBar from '../components/StatsBar';
import '../styles/layout.css';

export default function CreatePostPage({ signedIn }) {
  return (
    <div className="main">
      <div className="left">
        <Dropdown />
        <CreatePost signedIn={signedIn} />
      </div>
      <div className="right">
        <StatsBar />
      </div>
    </div>
  );
}
