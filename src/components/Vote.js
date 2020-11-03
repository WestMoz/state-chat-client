import React from 'react';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import '../styles/vote.css';

export default function Vote({ post }) {
  // const [isLiked, setIsLiked] = React.useState(undefined)
  //load whether post passed is liked by current user
  //could also do this in the post compoent and pass isLiked as a prop to this component
  return (
    <div className="vote-main">
      <div style={{ display: 'flex' }}>
        <ArrowUpwardRoundedIcon className="upvote-icon" />
        <p>12</p>
      </div>
      <div style={{ display: 'flex' }}>
        <ArrowDownwardRoundedIcon className="downvote-icon" />
        <p>4</p>
      </div>
    </div>
  );
}
