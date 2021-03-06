import React from 'react';
import ReactDOM from 'react-dom';
// react library for routing
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// plugins styles from node_modules
import 'react-notification-alert/dist/animate.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '@fullcalendar/common/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'select2/dist/css/select2.min.css';
import 'quill/dist/quill.core.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// plugins styles downloaded
import 'assets/vendor/nucleo/css/nucleo.css';
// core styles
import 'assets/scss/argon-dashboard-pro-react.scss?v1.2.0';
import AdminLayout from 'layouts/Admin.js';
import RTLLayout from 'layouts/RTL.js';
import AuthLayout from 'layouts/Auth.js';
import IndexView from 'views/Index.js';
import { configureStore } from '@reduxjs/toolkit';
import auth from 'reducers/auth';
import message from 'reducers/message';
import { Provider } from 'react-redux';
import currentRestaurantReducer from 'reducers/currentRestaurantReducer';
import currentMenuSelectedReducer from 'reducers/currentMenuSelectedReducer';
import modalStatusReducer from 'reducers/modalStatusReducer';
import { Modal } from 'reactstrap';
import DynamicModal from 'views/pages/modal/DynamicModal';
import NotificationAlert from 'views/pages/modal/NotificationAlert1';
const reducer = {
  auth: auth,
  message: message,
  currentRestaurantReducer: currentRestaurantReducer,
  currentMenuSelectedReducer: currentMenuSelectedReducer,
  modalStatusReducer: modalStatusReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});
ReactDOM.render(
  <Provider store={store}>
    <div className="rna-wrapper">
      <NotificationAlert />
    </div>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route path="/" render={(props) => <IndexView {...props} />} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
