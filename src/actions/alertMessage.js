import { SUCCESS_ALERT, FAILED_ALERT } from './types';

export const alertMessage = (message) => (dispatch) => {
  console.log('here at', message);
  console.log('Action modalStatus');
  if (message === 'success') {
    console.log('message', 'SUCCESS');
    dispatch({
      type: SUCCESS_ALERT,
      payload: message,
    });
  } else {
    console.log('message', 'FAILED');
    dispatch({
      type: FAILED_ALERT,
      payload: message,
    });
  }
};
