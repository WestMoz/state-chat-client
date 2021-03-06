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

export default function Navbar({ signedIn, setSignedIn, navRefresh }) {
  const [avatarUrl, setAvatarUrl] = React.useState(undefined);
  const [newNotifs, setNewNotifs] = React.useState(0);

  React.useEffect(() => {
    (async function () {
      try {
        const avatarResponse = await Axios.get(
          'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-avatar-url',
          {
            params: {
              username: signedIn.username,
            },
          },
        );
        setAvatarUrl(avatarResponse.data);

        const notifsResp = await Axios.get(
          'https://dkum2vv7yc.execute-api.us-east-1.amazonaws.com/dev/get-num-notifications',
          {
            params: {
              username: signedIn.username,
            },
          },
        );
        setNewNotifs(notifsResp.data.count);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [navRefresh]);
  console.log('NEW NOTIFICATIONS:', newNotifs);
  return (
    <div className="nav-main">
      <div className="nav-left">
        <div
          className="nav-home"
          onClick={() => {
            navigate('/');
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
            <PersonIcon
              fontSize="large"
              onClick={() => navigate(`/user/${signedIn.username}`)}
            >
              Profile
            </PersonIcon>
          </Tooltip>
        </div>
        <div className="exit-icon">
          <Tooltip title="Sign Out">
            <ExitToAppIcon
              fontSize="large"
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
          src={avatarUrl}
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
