import React from 'react';
import '../styles/createpost.css';
import Dropdown from './Dropdown';
import Axios from 'axios';
import { navigate } from '@reach/router';

export default function CreatePost({ signedIn }) {
  async function submitPost(e) {
    e.preventDefault();
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const title = e.target.elements.title.value;
      const content = e.target.elements.content.value;
      const category = 'South Carolina';
      //NEED TO ADD DROP DOWN FOR SELECTING CATEGORY TO POST IN

      if (!title || !content || !category) {
        window.alert('missing required fields');
        return;
      }

      const response = await Axios.post('http://localhost:4000/create-post', {
        token,
        title,
        content,
        category,
      });
      console.log(response);
      window.alert('post succesfully created');
      navigate(`/user/${signedIn.username}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={(e) => submitPost(e)}>
      <div className="create-main">
        <div className="create-top">
          <input id="title" type="text" placeholder="Title"></input>
          {/* <Dropdown /> */}
        </div>
        <div className="create-mid">
          <textarea
            id="content"
            cols="40"
            rows="5"
            placeholder="Content"
          ></textarea>
        </div>
        <div className="create-bot">
          <button type="reset">Cancel</button>
          {/* not sure what type cancel needs to be to not submit form */}
          <button type="submit">Post</button>
        </div>
      </div>
    </form>
  );
}
