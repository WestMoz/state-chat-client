import React from 'react';

export default function ViewUser({ user, signedIn }) {
  const [userPosts, setUserPosts] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      try {
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="user-main">
      <div className="user-left"></div>
      <div className="user-right"></div>
    </div>
  );
}
