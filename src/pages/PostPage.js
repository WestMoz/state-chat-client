import React from 'react';
import StatsBar from '../components/StatsBar';
import '../styles/layout.css';
import ViewPost from '../components/ViewPost';
import LiveChat from '../components/LiveChat';

export default function PostPage({ signedIn, postId }) {
  return (
    <div className="main">
      <div className="left">
        <ViewPost postId={postId} signedIn={signedIn} />
        {/* <Post />
        <CreateComment signedIn={signedIn} postId={postId} />
        <Comment />
        <Comment />
        <Comment /> */}
      </div>
      <div className="right">
        <LiveChat signedIn={signedIn} />
      </div>
    </div>
  );
}
