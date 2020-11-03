import { navigate } from '@reach/router';
import Axios from 'axios';
import React from 'react';
import '../../styles/post.css';
import Vote from '../Vote';

export default function Post({ post, signedIn }) {
  const [numComments, setNumComments] = React.useState(0);
  //this will load the number of comments on post load
  //comments button will open post in new page
  //new page will alow user to read comments and post a comment
  React.useEffect(() => {
    (async function () {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const postId = post.postId;
      const response = await Axios.post(
        'http://localhost:4000/get-num-comments',
        { token, postId },
      );
      console.log(response.data.count);
      setNumComments(response.data.count);
    })();
  }, []);
  console.log(numComments);
  return (
    <div className="post-main-cont">
      <div className="post-top-cont">
        <div>
          <Vote post={post} />
        </div>
        <div className="post-titles">
          <div>
            Posted by {post.creator} -{' '}
            {new Date(Math.floor(post.timestamp)).toLocaleDateString()}
          </div>
          <div>{post.category}</div>
        </div>
      </div>
      <div className="post-mid-cont">
        <p>{post.title}</p>
        <p>{post.content}</p>
      </div>
      <div className="post-bot-cont">
        <button onClick={() => navigate('/post/1')}>
          {numComments} Comments
        </button>
        {/* onclick will be broken until i pass a real post object */}
      </div>
    </div>
  );
}
