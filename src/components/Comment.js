import React from 'react';
import '../styles/comment.css';

export default function Comment({ comment }) {
  function getTime(timestamp) {
    const milliSeconds = Date.now() - Number(timestamp);
    const hours = milliSeconds / 1000 / 60 / 60;
    const minutes = milliSeconds / 1000 / 60;
    if (minutes < 1) {
      return `${Math.floor(minutes * 60)} seconds ago`;
    } else if (minutes < 2) {
      return `${Math.floor(hours * 60)} minute ago`;
    } else if (hours < 1) {
      return `${Math.floor(hours * 60)} minutes ago`;
    } else if (hours > 24) {
      return `${Math.floor(hours / 24)} day(s) ago`;
    } else if (hours < 2) {
      return `${Math.floor(hours)} hour ago`;
    } else {
      return `${Math.floor(hours)} hours ago`;
    }
  }
  return (
    <div className="comment-main">
      <div className="comment-top">
        <div>
          Commented by {comment.creator} - {getTime(comment.timestamp)}
        </div>
      </div>
      <div className="comment-bot">
        <p>{comment.comment}</p>
      </div>
    </div>
  );
}
