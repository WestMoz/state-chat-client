import React from 'react';
import '../styles/profile.css';

export default function Profile() {
  return (
    <div className="profile-main">
      <img
        src="https://bignokh.files.wordpress.com/2017/02/19c76c9bfacab70a3b9379f3fadc5323.png"
        alt="avatar"
        width="60%"
        style={{
          borderRadius: '20px',
          backgroundColor: 'lightcoral',
          border: '1px solid white',
        }}
      ></img>
      <div>Username</div>
      <div>State</div>
      <div>Number of posts</div>
      <button>Follow</button>
      <button>Chat</button>
    </div>
  );
}
