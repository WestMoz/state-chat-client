import { Create } from '@material-ui/icons';
import React from 'react';
import Comment from './Comment';
import CreateComment from './CreateComment';
import Post from './Post';
import '../styles/viewpost.css';
import Vote from './Vote';

export default function ViewPost() {
  return (
    <div className="view-main">
      <div className="view-top">
        <div>
          <Vote />
        </div>
        <div className="view-titles">
          <div>Username</div>
          <div>Time Posted</div>
          <div>Category Maybe?</div>
        </div>
      </div>
      <div className="view-mid">
        <div>
          <p>Title Here</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div>
          <CreateComment />
        </div>
      </div>
      <div className="view-bottom">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
}
