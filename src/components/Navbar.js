import { navigate } from '@reach/router';
import Axios from 'axios';
import React from 'react';
import '../styles/navbar.css';
import SearchBar from './SearchBar';
import { Auth } from 'aws-amplify';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tooltip from '@material-ui/core/Tooltip';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Navbar({ signedIn, setSignedIn }) {
  const [avatarUrl, setAvatarUrl] = React.useState(undefined);
  const [newNotifs, setNewNotifs] = React.useState(0);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;

        const avatarResponse = await Axios.post(
          'http://localhost:4000/get-avatar-url',
          {
            token,
            user: signedIn.username,
          },
        );
        setAvatarUrl(avatarResponse.data);

        const notifsResp = await Axios.post(
          'http://localhost:4000/get-num-notifications',
          {
            token,
          },
        );
        setNewNotifs(notifsResp.data.count);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log('NEW NOTIFICATIONS:', newNotifs);
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
        <div className="create-icon">
          <Tooltip title="Create Post">
            <BorderColorIcon onClick={() => navigate('/create')}>
              Create Post
            </BorderColorIcon>
          </Tooltip>
        </div>
      </div>
      <div className="nav-mid">
        <SearchBar />
      </div>
      <div className="nav-right">
        <div className="notif-icon">
          <Tooltip title="Notifications">
            <Badge badgeContent={newNotifs} color="primary">
              <NotificationsIcon onClick={() => navigate('/notifications')}>
                Notifications
              </NotificationsIcon>
            </Badge>
          </Tooltip>
        </div>
        <div className="prof-icon">
          <Tooltip title="Profile">
            <PersonIcon onClick={() => navigate(`/user/${signedIn.username}`)}>
              Profile
            </PersonIcon>
          </Tooltip>
        </div>
        <div className="exit-icon">
          <Tooltip title="Sign Out">
            <ExitToAppIcon
              onClick={() => {
                (async function () {
                  try {
                    await Auth.signOut({ global: true });
                    setSignedIn(undefined);
                    navigate('/signin');
                  } catch (error) {
                    console.log(error);
                  }
                })();
              }}
            >
              Sign Out
            </ExitToAppIcon>
          </Tooltip>
        </div>

        <img
          // src="https://bignokh.files.wordpress.com/2017/02/19c76c9bfacab70a3b9379f3fadc5323.png"
          src={avatarUrl}
          alt="avatar"
          height="80%"
          style={{
            borderRadius: '10px',
            backgroundColor: 'lightcoral',
            border: '1px solid white',
            // padding: '4px',
          }}
        ></img>
      </div>
    </div>
  );
}
