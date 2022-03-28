import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { LOGOUT } from 'actions/types';
// import { logout } from 'actions/auth';
import { Button, Modal } from 'reactstrap';
import NotificationAlert from 'react-notification-alert';
function Logout() {
  let history = useHistory();
  const [openModal, setopenModal] = useState(false);
  //   const dispatch = useDispatch();
  useEffect(() => {
    setopenModal(true);
    console.log('useEffect');
  }, []);

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
    notifAlert.current.NotificationAlert(options);
  };

  const LogoutHandler = (event) => {
    event.preventDefault();
    console.log('LogoutHandler');

    let token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var formdata = new FormData();

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://menuof.test/api/resturant-owner/auth/logout', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);

        localStorage.removeItem('expires_in');
        localStorage.removeItem('token');
        localStorage.removeItem('id');

        history.push('/auth/login');
        notify('tr', 'Logging out', 'success');
      })
      .catch((error) => {
        console.log('error', error);
        // notify('tr', 'Something went wrong', 'danger');
      });
  };

  const notLogoutHandler = (e) => {
    e.preventDefault();
    console.log('notLogoutHandler');
    setopenModal(false);
    history.push('/admin/menu');
  };
  return (
    <div>
      <Modal
        className="modal-dialog-centered"
        isOpen={openModal}
        toggle={() => setopenModal(false)}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Logout
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => this.toggleModal('exampleModal')}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body"> Are you sure you want to logout?</div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={(e) => notLogoutHandler(e)}
          >
            Close
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={(e) => LogoutHandler(e)}
          >
            Yes
          </Button>
        </div>
      </Modal>
      <div className="rna-wrapper">
        <NotificationAlert ref={notifAlert} />
      </div>
    </div>
  );
}

export default Logout;
