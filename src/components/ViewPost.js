import React from 'react';
import Comment from './Comment';
import CreateComment from './CreateComment';
import '../styles/viewpost.css';
import Vote from './Vote';
import { navigate } from '@reach/router';
import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function ViewPost({ signedIn, postId }) {
  const [post, setPost] = React.useState(undefined);
  const [isLiked, setIsLiked] = React.useState(undefined);
  const [comments, setComments] = React.useState(undefined);
  const [imageUrl, setImageUrl] = React.useState(undefined);
  const [newComment, setNewComment] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // eslint-disable-next-line
    (async function () {
      try {
        const postById = await Axios.get(
          'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-post-by-id',
          {
            params: {
              postId,
            },
          },
        );
        setPost(postById.data);

        const liked = await Axios.get(
          'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-is-liked',
          {
            params: {
              username: signedIn.username,
              postId,
            },
          },
        );
        console.log(liked.data);
        if (liked.data) {
          setIsLiked(liked.data.vote);
        }

        const commentsResp = await Axios.get(
          'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-comments-by-id',
          {
            params: {
              postId,
            },
          },
        );
        setComments(commentsResp.data);

        await getImage(postById.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [newComment]);

  async function getImage(post) {
    const imageResp = await Axios.get(
      'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-s3-image',
      {
        params: {
          path: post.image,
        },
      },
    );
    setImageUrl(imageResp.data);
  }

  console.log(post);

  console.log(signedIn);
  return (
    <>
      {loading ? (
        <LinearProgress></LinearProgress>
      ) : (
        <React.Fragment>
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
                  <div style={{ display: 'flex' }}>
                    <div
                      className="posted-by"
                      onClick={() => navigate(`/user/${post.creator}`)}
                    >
                      Posted by {post.creator}
                    </div>
                    <div>
                      {new Date(
                        Math.floor(post.timestamp),
                      ).toLocaleDateString()}
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
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        className="post-image"
                        src={imageUrl}
                        alt={post.title}
                      />
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
                    .map((comment, commentIndex) => (
                      <Comment comment={comment} key={commentIndex} />
                    ))}
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </>
  );
}
