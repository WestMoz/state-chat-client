import React from 'react';
import CreatePost from '../components/CreatePost';
import Dropdown from '../components/Dropdown';
import StatsBar from '../components/StatsBar';
import TestDropdown from '../components/test/TestDropdown';
import '../styles/layout.css';

export default function CreatePostPage({ signedIn }) {
  const [category, setCategory] = React.useState(undefined);
  return (
    <div className="main">
      <div className="left">
        {/* <Dropdown /> */}
        <TestDropdown
          style={{ backgroundColor: 'black', color: 'white' }}
          setCategory={setCategory}
        />
        <CreatePost signedIn={signedIn} />
      </div>
      <div className="right">
        <StatsBar />
      </div>
    </div>
  );
}
