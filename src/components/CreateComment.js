import React from 'react';
import Axios from 'axios';
import '../styles/createcomment.css';

export default function CreateComment({
  postId,
  signedIn,
  newComment,
  setNewComment,
  post,
}) {
  async function submitComment(e) {
    e.preventDefault();
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const comment = e.target.elements.comment.value;

      await Axios.post(
        'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/create-comment',
        {
          token,
          postId,
          comment,
        },
      );
      await Axios.post(
        'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/create-notification',
        {
          token,
          userFor: post.creator,
          message: `${signedIn.username} has commented on your post titled: ${post.title}`,
        },
      );
      setNewComment(!newComment);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={(e) => submitComment(e)}>
      <div className="comment-create-main">
        <div className="comment-create-top">
          * Comment as {signedIn.username} *
        </div>
        <div className="comment-create-mid">
          <textarea
            id="comment"
            cols="40"
            rows="5"
            placeholder="What are your thoughts?"
          ></textarea>
        </div>
        <div className="comment-create-bot">
          <button
            class="btn btn-primary"
            type="submit"
            style={{ width: '100px' }}
          >
            Comment
          </button>
        </div>
      </div>
    </form>
  );
}
