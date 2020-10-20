import React from 'react';
import MapChart from '../components/MapChart';
import Post from '../components/Post';

export default function HomePage() {
  return (
    <div style={styles.main}>
      {/* This is the home page */}
      <MapChart />
      <div style={styles.post}>
        <Post />
      </div>
    </div>
  );
}

const styles = {
  main: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  post: {
    width: '40%',
  },
};
