import Axios from 'axios';
import React from 'react';
import TestPost from '../components/test/TestPost';
import Profile from '../components/Profile';
import '../styles/viewuser.css';

export default function ViewUser({ user, signedIn }) {
  const [userPosts, setUserPosts] = React.useState(undefined);
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      console.log('in use effect');
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        // const posts = await Axios.post(
        //   'http://localhost:4000/get-posts-by-user',
        //   {
        //     token,
        //     creator: user,
        //   },
        // );
        const posts = await Axios.post(
          'http://localhost:4000/get-user-posts-ranked',
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
  }, [refresh]);

  function sortNew() {
    setUserPosts([...userPosts].sort((a, b) => b.timestamp - a.timestamp));
    // setRefresh(!refresh);
  }

  function sortOld() {
    setUserPosts([...userPosts].sort((a, b) => a.timestamp - b.timestamp));
    // setRefresh(!refresh);
  }

  function sortTop() {
    setUserPosts([...userPosts].sort((a, b) => b.totalCount - a.totalCount));
    // setRefresh(!refresh);
  }

  return (
    <div className="user-main">
      <div className="user-left">
        <button onClick={() => sortTop()}>Top</button>
        <button onClick={() => sortNew()}>Newest</button>
        <button onClick={() => sortOld()}>Oldest</button>
        {userPosts &&
          userPosts.map((post) => (
            <TestPost
              user={user}
              post={post}
              signedIn={signedIn}
              refresh={refresh}
              setRefresh={setRefresh}
              key={post.postId}
            />
          ))}
      </div>
      <div className="user-right">
        <Profile signedIn={signedIn} user={user} />
      </div>
    </div>
  );
}
