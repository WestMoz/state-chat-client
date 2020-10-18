import React from 'react';
import MapChart from './MapChart';
import { Router } from '@reach/router';

export default function PrivateRoutes({ signedIn, setSignedIn }) {
  return (
    <Router>
      <MapChart path="/home" />
    </Router>
  );
}
