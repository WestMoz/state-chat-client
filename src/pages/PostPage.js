import React from 'react';
import CreateComment from '../components/CreateComment';
import Post from '../components/Post';
import Comment from '../components/Comment';
import StatsBar from '../components/StatsBar';
import '../styles/layout.css';

export default function PostPage({ signedIn, postId }) {
  return (
    <div className="main">
      <div className="left">
        <Post />
        <CreateComment signedIn={signedIn} postId={postId} />
        <Comment />
        <Comment />
        <Comment />
      </div>
      <div className="right">
        <StatsBar />
      </div>
    </div>
  );
}
