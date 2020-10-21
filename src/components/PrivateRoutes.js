import React from 'react';
import { Router } from '@reach/router';
import HomePage from '../pages/HomePage';
import MapChart from '../components/MapChart';
import NotFound from '../pages/NotFound';

export default function PrivateRoutes({ signedIn, setSignedIn }) {
  return (
    <Router>
      <HomePage path="/home" />
      {/* <MapChart path="/map" /> */}
      <NotFound default />
    </Router>
  );
}
