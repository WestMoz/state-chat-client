import Axios from 'axios';
import React from 'react';
import LiveChat from '../components/LiveChat';
import '../styles/notification.css';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export default function NotificationPage({ signedIn }) {
  const [notifications, setNotifications] = React.useState(undefined);
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
  }, []);

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

  return (
    <div className="main">
      <div className="left">
        <div className="notif-cont">
          {notifications &&
            [...notifications].reverse().map((notification) => {
              return (
                <div className="notif">
                  <div style={{ display: 'flex' }}>
                    <MailOutlineIcon />
                    <div>{notification.message}</div>
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
