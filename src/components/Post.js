import { navigate } from '@reach/router';
import React from 'react';
import '../styles/post.css';
import Vote from './Vote';

export default function Post({ post }) {
  // const [numComments, setNumComments] = React.useState(0);
  //this will load the number of comments on post load
  //comments button will open post in new page
  //new page will alow user to read comments and post a comment

  return (
    <div className="post-main-cont">
      <div className="post-top-cont">
        <div>{/* <Vote /> */}</div>
        <div className="post-titles">
          <div>Username</div>
          <div>Time Posted</div>
          <div>Category Maybe?</div>
        </div>
      </div>
      <div className="post-mid-cont">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="post-bot-cont">
        <button onClick={() => navigate('/post/1')}>Comments</button>
        {/* onclick will be broken until i pass a real post object */}
      </div>
    </div>
  );
}
