import Axios from 'axios';
import React from 'react';

export default function DeleteButton({
  signedIn,
  postId,
  refresh,
  setRefresh,
}) {
  async function deletePost() {
    try {
      if (window.confirm('Are you sure you want to delete this post?')) {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        await Axios.post('http://localhost:4000/delete-post', {
          token,
          postId,
        });
        window.alert('Post was deleted');
        setRefresh(!refresh);
      }
      //calls route to delete all likes and comments for postId
      //after that the route deletes the post itself
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          deletePost();
        }}
        class="btn btn-danger"
      >
        Delete
      </button>
    </div>
  );
}
