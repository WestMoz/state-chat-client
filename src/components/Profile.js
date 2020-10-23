import React from 'react';
import '../styles/profile.css';

export default function Profile() {
  return (
    <div className="profile-main">
      <img
        src="https://bignokh.files.wordpress.com/2017/02/19c76c9bfacab70a3b9379f3fadc5323.png"
        alt="avatar"
        width="80%"
        style={{ borderRadius: '500px', backgroundColor: 'lightcoral' }}
      ></img>
      <div>Username</div>
      <div>State</div>
      {/* <div>About Me</div> */}
      <button>Notifications</button>
      <button>Messages</button>
      <button>Sign Out</button>
    </div>
  );
}
