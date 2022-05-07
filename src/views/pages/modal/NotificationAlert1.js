import React, { useRef } from 'react';
import NotificationAlert from 'react-notification-alert';
function NotificationAlert1(props) {
  console.log('NotificationAlert1', props);
  const notifAlert = useRef(null);
  const notify = (place, message, type) => {
    console.log('im here');
    let options = {
      place: place,
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            Attention
          </span>
          <span data-notify="message">{message}</span>
        </div>
      ),
      type: type,
      icon: 'ni ni-bell-55',
      autoDismiss: 7,
    };
    notifAlert.current.notificationAlert(options);
  };
  return (
    <div className="rna-wrapper">
      <NotificationAlert ref={notifAlert} />
    </div>
  );
}

export default NotificationAlert1;
