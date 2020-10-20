import React from 'react';
import { Router } from '@reach/router';
import HomePage from '../pages/HomePage';
import MapChart from '../components/MapChart';

export default function PrivateRoutes({ signedIn, setSignedIn }) {
  return (
    <Router>
      <HomePage path="/home" />
      {/* <MapChart path="/map" /> */}
    </Router>
  );
}
