import React from 'react';
import Axios from 'axios';
import '../styles/createcomment.css';

export default function CreateComment({ postId, signedIn }) {
  async function submitComment(e) {
    e.preventDefault();
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const comment = e.target.elements.comment.value;

      const response = await Axios.post(
        'http://localhost:4000/create-comment',
        {
          token,
          postId,
          comment,
        },
      );
      console.log(response);
      window.alert('comment succesfully created');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={(e) => submitComment(e)}>
      <div className="comment-create-main">
        <div className="comment-create-top">Comment as *insert username*</div>
        <div className="comment-create-mid">
          <textarea
            id="comment"
            cols="40"
            rows="5"
            placeholder="What are your thoughts?"
          ></textarea>
        </div>
        <div className="comment-create-bot">
          <button type="submit">Comment</button>
        </div>
      </div>
    </form>
  );
}
