import Axios from 'axios';
import React from 'react';
import LiveChat from '../components/LiveChat';
import '../styles/notification.css';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DraftsIcon from '@material-ui/icons/Drafts';
import MarkunreadIcon from '@material-ui/icons/Markunread';
import Tooltip from '@material-ui/core/Tooltip';

export default function NotificationPage({ signedIn }) {
  const [notifications, setNotifications] = React.useState(undefined);
  const [refresh, setRefresh] = React.useState(false);
  //need to update number of unseen notifcations to display on navbar
  //prolly a piece of state that will be sent from navbar and updated here
  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const notificationsResp = await Axios.post(
          'http://localhost:4000/get-notifications',
          {
            token,
          },
        );
        setNotifications(notificationsResp.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [refresh]);

  function getTime(timestamp) {
    const milliSeconds = Date.now() - Number(timestamp);
    const hours = milliSeconds / 1000 / 60 / 60;
    if (hours < 1) {
      return `${Math.floor(hours * 60)} minutes ago`;
    } else if (hours > 24) {
      return `${Math.floor(hours / 24)} days ago`;
    } else if (hours < 2) {
      return `${Math.floor(hours)} hour ago`;
    } else {
      return `${Math.floor(hours)} hours ago`;
    }
  }

  async function markSeen(notification) {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      await Axios.post('http://localhost:4000/mark-seen', {
        token,
        notificationId: notification.notificationId,
      });
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main">
      <div className="left">
        <div className="notif-cont">
          {notifications &&
            [...notifications].reverse().map((notification) => {
              return (
                <div className="notif">
                  <div className="notif-left">
                    {notification.seen === 0 ? (
                      <div className="notif-icon-cont">
                        <Tooltip title="Mark as Read">
                          <MarkunreadIcon
                            color="secondary"
                            onClick={() => markSeen(notification)}
                            fontSize="large"
                          />
                        </Tooltip>
                      </div>
                    ) : (
                      <div className="notif-icon-cont2">
                        <DraftsIcon fontSize="large" />
                      </div>
                    )}
                    <div className="notif-message">{notification.message}</div>
                  </div>
                  <div>{getTime(notification.timestamp)}</div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="right">
        <LiveChat signedIn={signedIn} />
      </div>
    </div>
  );
}
