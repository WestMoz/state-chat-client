import { Create } from '@material-ui/icons';
import React from 'react';
import Comment from './Comment';
import CreateComment from './CreateComment';
import Post from './Post';
import '../styles/viewpost.css';
import Vote from './Vote';
import { navigate } from '@reach/router';
import Axios from 'axios';

export default function ViewPost({ signedIn, postId }) {
  const [post, setPost] = React.useState(undefined);
  const [isLiked, setIsLiked] = React.useState(undefined);
  const [comments, setComments] = React.useState(undefined);
  const [imageUrl, setImageUrl] = React.useState(undefined);
  const [newComment, setNewComment] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const postById = await Axios.post(
          'http://localhost:4000/get-post-by-id',
          {
            token,
            postId,
          },
        );
        setPost(postById.data);

        const liked = await Axios.post('http://localhost:4000/get-is-liked', {
          token,
          postId,
        });
        console.log(liked.data);
        if (liked.data) {
          setIsLiked(liked.data.vote);
        }

        const commentsResp = await Axios.post(
          'http://localhost:4000/get-comments-by-id',
          {
            token,
            postId,
          },
        );
        setComments(commentsResp.data);

        await getImage(postById.data, token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [newComment]);

  async function getImage(post, token) {
    const imageResp = await Axios.post('http://localhost:4000/get-s3-image', {
      token,
      path: post.image,
    });
    console.log(imageResp);
    setImageUrl(imageResp.data);
  }

  console.log(post);

  console.log(signedIn);
  return (
    <>
      {post && (
        <div className="view-main">
          <div className="view-top">
            <div>
              <Vote
                post={post}
                signedIn={signedIn}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
              />
            </div>
            <div className="view-titles">
              {/* <div>Username</div>
          <div>Time Posted</div>
          <div>Category Maybe?</div> */}
              <div style={{ display: 'flex' }}>
                <div
                  className="posted-by"
                  onClick={() => navigate(`/user/${post.creator}`)}
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
          <div className="view-mid">
            <div className="view-post">
              <p className="text-title">{post.title}</p>
              <p className="text-content">{post.content}</p>
              {post.image && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img className="post-image" src={imageUrl} alt="post image" />
                </div>
              )}
            </div>
            <div>
              <CreateComment
                newComment={newComment}
                setNewComment={setNewComment}
                postId={post.postId}
                signedIn={signedIn}
                post={post}
              />
            </div>
          </div>
          <div className="view-bottom">
            {comments &&
              [...comments]
                .reverse()
                .map((comment) => <Comment comment={comment} />)}
            {/* <Comment comment={comment}/>
            <Comment />
            <Comment />
            <Comment /> */}
          </div>
        </div>
      )}
    </>
  );
}
