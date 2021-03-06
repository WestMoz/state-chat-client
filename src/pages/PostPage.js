import React from 'react';
import '../styles/layout.css';
import ViewPost from '../components/ViewPost';
import LiveChat from '../components/LiveChat';

export default function PostPage({ signedIn, postId }) {
  return (
    <div className="main">
      <div className="left">
        <ViewPost postId={postId} signedIn={signedIn} />
      </div>
      <div className="right">
        <LiveChat signedIn={signedIn} />
      </div>
    </div>
  );
}
