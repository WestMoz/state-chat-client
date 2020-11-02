import { navigate } from '@reach/router';
import React from 'react';
import '../styles/topNav.css';

export default function TopNav() {
  const [search, setSearch] = React.useState('');
  console.log(search);
  return (
    <div className="nav-main">
      <div
        className="nav-home"
        onClick={() => {
          console.log('home clicked');
          navigate('/home');
        }}
      >
        Home
      </div>
      <div>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search posts..."
        />
        <button>Search</button>
      </div>
    </div>
  );
}
