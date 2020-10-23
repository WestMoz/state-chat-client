import React from 'react';
import '../styles/comment.css';

export default function Comment() {
  return (
    <div className="comment-main">
      <div className="comment-top">
        <div>
          <img src="" alt="avatar" />
        </div>
        <div className="comment-titles">
          <div>Username</div>
          <div>Time Commented</div>
        </div>
      </div>
      <div className="comment-bot">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
}
