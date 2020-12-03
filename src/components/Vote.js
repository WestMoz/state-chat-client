import React from 'react';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import '../styles/vote.css';
import Axios from 'axios';

export default function Vote({ signedIn, post, isLiked, setIsLiked }) {
  // const [isLiked, setIsLiked] = React.useState(undefined)
  //load whether post passed is liked by current user
  //could also do this in the post compoent and pass isLiked as a prop to this component
  const [upVotes, setUpVotes] = React.useState(undefined);
  const [downVotes, setDownVotes] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      try {
        const upVotesResp = await Axios.get(
          'http://localhost:4000/get-num-votes',
          {
            params: {
              postId: post.postId,
              vote: 1,
            },
          },
        );
        setUpVotes(upVotesResp.data.votes);

        const downVotesResp = await Axios.get(
          'http://localhost:4000/get-num-votes',
          {
            params: {
              postId: post.postId,
              vote: 0,
            },
          },
        );
        setDownVotes(downVotesResp.data.votes);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // console.log(upVotes);
  // console.log(downVotes);

  async function deleteVote() {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      await Axios.delete('http://localhost:4000/delete-vote', {
        params: { token, postId: post.postId },
      });
      setIsLiked(undefined);
      // window.alert('vote was deleted');
    } catch (error) {
      console.log(error);
    }
  }

  async function upVote() {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      if (isLiked !== 1) {
        await deleteVote();
        await Axios.post('http://localhost:4000/vote', {
          token,
          postId: post.postId,
          vote: 1,
        });
        if (isLiked !== undefined) {
          setDownVotes(downVotes - 1);
        }
        setUpVotes(upVotes + 1);
        setIsLiked(1);
        await Axios.post('http://localhost:4000/create-notification', {
          token,
          userFor: post.creator,
          message: `${signedIn.username} has upvoted your post titled: ${post.title}`,
        });
        // window.alert('post was liked');
      } //if post is not voted on or disliked then upvote
      else {
        deleteVote();
        setUpVotes(upVotes - 1);
      } //if component is liked then delete like
    } catch (error) {
      console.log(error);
    }
  }

  async function downVote() {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      if (isLiked !== 0) {
        await deleteVote();
        await Axios.post('http://localhost:4000/vote', {
          token,
          postId: post.postId,
          vote: 0,
        });
        if (isLiked !== undefined) {
          setUpVotes(upVotes - 1);
        }
        setIsLiked(0);
        setDownVotes(downVotes + 1);
        await Axios.post('http://localhost:4000/create-notification', {
          token,
          userFor: post.creator,
          message: `${signedIn.username} has downvoted your post titled: ${post.title}`,
        });

        // window.alert('post was deleted');
      } //if post is not voted on or disliked then upvote
      else {
        deleteVote();
        setDownVotes(downVotes - 1);
      } //if component is liked then delete like
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="vote-main">
      <div
        style={{ display: 'flex' }}
        className={isLiked === 1 ? 'upvote-liked' : ''}
      >
        <ArrowUpwardRoundedIcon
          className="upvote-icon"
          onClick={(e) => {
            e.stopPropagation();
            upVote();
          }}
        />
        <p>{upVotes}</p>
      </div>
      <div
        style={{ display: 'flex' }}
        className={isLiked === 0 ? 'upvote-disliked' : ''}
      >
        <ArrowDownwardRoundedIcon
          className="downvote-icon"
          onClick={(e) => {
            e.stopPropagation();
            downVote();
          }}
        />
        <p>{downVotes}</p>
      </div>
    </div>
  );
}
