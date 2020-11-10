import Axios from 'axios';
import React from 'react';
import TestPost from '../components/test/TestPost';
import Profile from '../components/Profile';
import '../styles/viewuser.css';

export default function ViewUser({ user, signedIn }) {
  const [userPosts, setUserPosts] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      console.log('in use effect');
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const posts = await Axios.post(
          'http://localhost:4000/get-posts-by-user',
          {
            token,
            creator: user,
          },
        );

        setUserPosts(posts.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(userPosts);
  return (
    <div className="user-main">
      <div className="user-left">
        <button>New</button>
        <button>Top</button>
        {userPosts &&
          userPosts.map((post) => (
            <TestPost user={user} post={post} signedIn={signedIn} />
          ))}
      </div>
      <div className="user-right">
        <Profile signedIn={signedIn} user={user} />
      </div>
    </div>
  );
}
