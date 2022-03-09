// import { SELECTED_RESTAURANT_ID } from './types';
export const selectMenuId = (menuId) => (dispatch) => {
  console.log('here at', menuId);
  console.log('im here at action selectedMenu');
  dispatch({
    type: 'SELECTED_MENU_ID',
    payload: menuId,
  });
};
