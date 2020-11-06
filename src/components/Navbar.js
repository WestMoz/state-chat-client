import { navigate } from '@reach/router';
import React from 'react';
import '../styles/navbar.css';
import SearchBar from './SearchBar';

export default function Navbar() {
  // console.log(search);

  return (
    <div className="nav-main">
      <div className="nav-left">
        <div
          className="nav-home"
          onClick={() => {
            navigate('/home');
          }}
        >
          Home
        </div>
        <button onClick={() => navigate('/create')}>Create Post</button>
      </div>
      <div className="nav-mid">
        {/* <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search posts..."
        />
        <button>Search</button> */}
        <SearchBar />
      </div>
      <div className="nav-right">
        <button>Notifications</button>
        <button>Messages</button>
        <button>Sign Out</button>
        <img
          src="https://bignokh.files.wordpress.com/2017/02/19c76c9bfacab70a3b9379f3fadc5323.png"
          alt="avatar"
          height="80%"
          style={{
            borderRadius: '10px',
            backgroundColor: 'lightcoral',
            border: '1px solid white',
          }}
        ></img>
      </div>
    </div>
  );
}
