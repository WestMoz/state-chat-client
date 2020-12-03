import { navigate } from '@reach/router';
import Axios from 'axios';
import React from 'react';
import '../../styles/post.css';
import Vote from '../Vote';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import DeleteButton from '../DeleteButton';

export default function Post({ user, post, signedIn, refresh, setRefresh }) {
  const [numComments, setNumComments] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(undefined);
  const [imageUrl, setImageUrl] = React.useState(undefined);

  //this will load the number of comments on post load
  //comments button will open post in new page
  //new page will alow user to read comments and post a comment
  React.useEffect(() => {
    (async function () {
      const postId = post.postId;
      const num = await Axios.get('http://localhost:4000/get-num-comments', {
        params: {
          postId,
        },
      });
      setNumComments(num.data.count);

      const liked = await Axios.get('http://localhost:4000/get-is-liked', {
        params: { username: signedIn.username, postId },
      });
      // console.log(liked.data);
      if (liked.data) {
        setIsLiked(liked.data.vote);
      }

      if (post.image) {
        const imageResp = await Axios.get(
          'http://localhost:4000/get-s3-image',
          {
            params: {
              path: post.image,
            },
          },
        );
        setImageUrl(imageResp.data);
      }
    })();
  }, []);

  return (
    <div
      className="post-main-cont"
      onClick={() => navigate(`/post/${post.postId}`)}
    >
      <div className="post-top-cont">
        <div>
          <Vote
            signedIn={signedIn}
            post={post}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            key={post.postId}
          />
        </div>
        <div className="post-titles">
          <div style={{ display: 'flex' }}>
            <div
              className="posted-by"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/user/${post.creator}`);
              }}
            >
              Posted by {post.creator}
            </div>
            <div>
              {new Date(Math.floor(post.timestamp)).toLocaleDateString()}
            </div>
          </div>
          <div>{post.category}</div>
        </div>
      </div>
      <div className="post-mid-cont">
        <p className="text-title">{post.title}</p>
        <p className="text-content">{post.content}</p>

        {post.image && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img className="post-image" src={imageUrl} alt="post image" />
          </div>
        )}
      </div>
      <div className="post-bot-cont">
        <div
          className="comments-button"
          onClick={() => navigate(`/post/${post.postId}`)}
        >
          <ChatBubbleIcon className="comment-icon" />
          <div>{numComments} Comments</div>
        </div>
        {user === signedIn.username ? (
          <DeleteButton
            signedIn={signedIn}
            postId={post.postId}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        ) : (
          <></>
        )}
        {/* onclick will be broken until i pass a real post object */}
      </div>
    </div>
  );
}
