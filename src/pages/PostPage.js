import React from 'react';
import StatsBar from '../components/StatsBar';
import '../styles/layout.css';
import ViewPost from '../components/ViewPost';

export default function PostPage({ signedIn, postId }) {
  return (
    <div className="main">
      <div className="left">
        <ViewPost />
        {/* <Post />
        <CreateComment signedIn={signedIn} postId={postId} />
        <Comment />
        <Comment />
        <Comment /> */}
      </div>
      <div className="right">
        <StatsBar />
      </div>
    </div>
  );
}