import React from 'react';
import { Router } from '@reach/router';
import HomePage from '../pages/HomePage';
import NotFound from '../pages/NotFound';
import StatePage from '../pages/StatePage';
import PostPage from '../pages/PostPage';
import CreatePostPage from '../pages/CreatePostPage';
import ViewUser from '../pages/ViewUser';

export default function PrivateRoutes({ signedIn, setSignedIn }) {
  return (
    <Router>
      <HomePage path="/home" signedIn={signedIn} />
      <StatePage path="/state/:state" signedIn={signedIn} />
      <PostPage path="/post/:postId" signedIn={signedIn} />
      <CreatePostPage path="/create" signedIn={signedIn} />
      <ViewUser path="/user/:user" signedIn={signedIn} />
      <NotFound default />
    </Router>
  );
}

//state page displays all posts for specific state
//post page displays extra info for specific post ex: comments and ability to comment
