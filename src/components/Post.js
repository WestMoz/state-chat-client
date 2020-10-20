import React from 'react';
import '../styles/post.css';

export default function Post({ post }) {
  return (
    <div className="post-main-cont">
      <div className="post-top-cont">
        <div>
          <img src="" alt="avatar" />
        </div>
        <div className="post-titles">
          <div>Username</div>
          <div>Time Posted</div>
          <div>Category Maybe?</div>
        </div>
      </div>
      <div className="post-mid-cont">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
      <div className="post-bot-cont">
        <button>Like</button>
        <button>Comment</button>
      </div>
    </div>
  );
}
