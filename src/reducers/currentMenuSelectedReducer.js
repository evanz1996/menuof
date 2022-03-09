import { SELECTED_MENU_ID } from 'actions/types';
const initialState = 889898989;

function currentMenuSelectedReducer(selectedtId = initialState, action) {
  console.log('here at currentSelectedMenu REDUCER');

  const { type, payload } = action;
  switch (type) {
    case SELECTED_MENU_ID:
      console.log('Selected menu');
      return { ...selectedtId, payload };
    default:
      return selectedtId;
  }
}
export default currentMenuSelectedReducer;
