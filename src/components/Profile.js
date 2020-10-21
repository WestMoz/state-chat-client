import React from 'react';
import '../styles/profile.css';

export default function Profile() {
  return (
    <div className="profile-main">
      <img src="" alt="avatar"></img>
      <div>Username</div>
      <div>State</div>
      <div>About Me</div>
      <button>Notifications</button>
      <button>Messages</button>
      <button>Sign Out</button>
    </div>
  );
}
