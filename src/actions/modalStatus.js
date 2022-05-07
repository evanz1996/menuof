import { MODAL_OPEN, MODAL_CLOSE } from './types';

export const modalStatus = (status) => (dispatch) => {
  console.log('here at', status);
  console.log('Action modalStatus');
  if (status) {
    console.log('modalStatus', 'OPEN');
    dispatch({
      type: MODAL_OPEN,
      payload: true,
    });
  } else {
    console.log('modalStatus', 'CLOSE');
    dispatch({
      type: MODAL_CLOSE,
      payload: false,
    });
  }
};
