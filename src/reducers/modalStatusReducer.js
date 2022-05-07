import { MODAL_CLOSE, MODAL_OPEN } from 'actions/types';

console.log('MODAL_CLOSE REDUCER', MODAL_CLOSE);
const initialState = false;
function modalStatusReducer(modalStatus = initialState, action) {
  const { type, payload } = action;
  console.log('modalStatusReducer', type, payload);
  switch (type) {
    case MODAL_CLOSE:
      console.log('MODAL_CLOSE');
      return false;
    case MODAL_OPEN:
      console.log('MODAL_OPEN');
      return true;
    default:
      return modalStatus;
  }
}

export default modalStatusReducer;
