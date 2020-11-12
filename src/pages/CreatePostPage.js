import React from 'react';
import CreatePost from '../components/CreatePost';
import LiveChat from '../components/LiveChat';
import '../styles/layout.css';

export default function CreatePostPage({ signedIn }) {
  const [category, setCategory] = React.useState(undefined);
  return (
    <div className="main">
      <div className="left">
        {/* <Dropdown /> */}
        {/* <TestDropdown
          style={{ backgroundColor: 'black', color: 'white' }}
          setCategory={setCategory}
        /> */}
        <CreatePost
          category={category}
          setCategory={setCategory}
          signedIn={signedIn}
        />
      </div>
      <div className="right">
        <LiveChat signedIn={signedIn} />
      </div>
    </div>
  );
}
