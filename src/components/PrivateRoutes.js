import React from 'react';
import { Router } from '@reach/router';
import HomePage from '../pages/HomePage';
import NotFound from '../pages/NotFound';
import StatePage from '../pages/StatePage';
import PostPage from '../pages/PostPage';
import CreatePostPage from '../pages/CreatePostPage';
import ViewUser from '../pages/ViewUser';
import SearchPage from '../pages/SearchPage';
import NotificationPage from '../pages/NotificationPage';

export default function PrivateRoutes({ signedIn, setSignedIn }) {
  return (
    <Router>
      <HomePage path="/" signedIn={signedIn} />
      <StatePage path="/state/:state" signedIn={signedIn} />
      <PostPage path="/post/:postId" signedIn={signedIn} />
      <CreatePostPage path="/create" signedIn={signedIn} />
      <ViewUser path="/user/:user" signedIn={signedIn} />
      <SearchPage path="/search/:search" signedIn={signedIn} />
      <NotificationPage path="/notifications" signedIn={signedIn} />
      <NotFound default signedIn={signedIn} />
    </Router>
  );
}

//state page displays all posts for specific state
//post page displays extra info for specific post ex: comments and ability to comment
