import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { modalStatus } from 'actions/modalStatus';
import e from 'cors';
import DishModal from '../menu/dish/DishModal';
import NotificationAlert from 'react-notification-alert';
function DynamicModal(props) {
  let dispatch = useDispatch();
  let currentModalStatus = useSelector((state) => state.modalStatusReducer);
  // currentModalStatus = ;
  console.log('DynamicModal', props);
  console.log('currentModalStatus', currentModalStatus);
  const check = (e) => {
    e.preventDefault();
    console.log('check');
    dispatch(modalStatus(false));
  };
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
    <div>
      <Modal
        size="lg"
        show={currentModalStatus || currentModalStatus['payload']}
      >
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <DishModal></DishModal> */}
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => check(e)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DynamicModal;
