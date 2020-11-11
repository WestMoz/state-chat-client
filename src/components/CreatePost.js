import React from 'react';
import '../styles/createpost.css';
import Dropdown from './Dropdown';
import Axios from 'axios';
import { navigate } from '@reach/router';
import S3PostImage from './S3Components/S3PostImage';

export default function CreatePost({ signedIn, category }) {
  const [imagePath, setImagePath] = React.useState(undefined);

  async function submitPost(e) {
    e.preventDefault();
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const title = e.target.elements.title.value;
      const content = e.target.elements.content.value;
      // const state = category;
      //NEED TO ADD DROP DOWN FOR SELECTING CATEGORY TO POST IN
      console.log(category);
      if (!title || !content || !category) {
        window.alert('missing required fields');
        return;
      }

      const response = await Axios.post('http://localhost:4000/create-post', {
        token,
        title,
        content,
        category,
        image: imagePath,
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
        <div>
          <S3PostImage signedIn={signedIn} setImagePath={setImagePath} />
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
