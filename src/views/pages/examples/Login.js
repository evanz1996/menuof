import React, { useState, useEffect, useRef } from 'react';
// nodejs library that concatenates classes
import classnames from 'classnames';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap';
// core components
import AuthHeader from 'components/Headers/AuthHeader.js';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { login } from 'actions/auth';
import { clearMessage } from 'actions/message';
import NotificationAlert from 'react-notification-alert';
import { LOGIN_SUCCESS } from 'actions/types';
function Login() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const [loggedIn, setloggedIn] = useState('');
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  let history = useHistory();
  // useEffect(() => {
  //   console.log('here at first useEffect');
  //   console.log(localStorage.getItem('id'));
  //   if (localStorage.getItem('id')) {
  //     setloggedIn(localStorage.getItem('id'));
  //     console.log('setState', loggedIn);
  //   }

  //   // if (localStorage.getItem('id')) {
  //   //   history.push('/admin/menu');
  //   // }
  //   // if (localStorage.getItem('id')) {
  //   //   history.push('/admin/menu');
  //   // } else {
  //   //   history.push('/auth/login');
  //   // }
  //   // <Redirect to="/admin/menu" />;
  //   // dispatch(clearMessage());
  // });

  // function checkLocalStorage() {
  //   console.log('checkLocalStorage');
  //   if (setloggedIn(localStorage.getItem('id'))) {
  //     setloggedIn(localStorage.getItem('id'));
  //     console.log('setState', loggedIn);
  //   }
  // }
  // checkLocalStorage();
  // useEffect(() => {
  //   console.log('here at first useEffect');
  //   // <Redirect to="/admin/menu" />;
  //   dispatch(clearMessage());
  // }, [dispatch]);

  // useEffect(() => {
  //   console.log('check if logged In');
  //   console.log('isLoggedIn', isLoggedIn);
  //   console.log('message', message);
  //   console.log('USER', user);
  //   isLoggedIn ? history.push('/admin/menu') : history.push('/auth/login');
  // }, [isLoggedIn]);

  // useEffect(() => {
  //   console.log('message', message);
  //   console.log(isLoggedIn);
  //   if (isLoggedIn) {
  //     history.push('/admin/menu');
  //   } else if (message) {
  //     history.push('/auth/login');
  //     alert(message);
  //     window.location.reload();
  //   }
  // }, [message]);

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
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('henlo from login component');
    let loginUser = {
      email: email,
      password: password,
    };

    console.log('loginUser', loginUser);
    fetch('http://menuof.test/api/resturant-owner/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginUser),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('LOGIN', result);
        if (result.status === 400) {
          notify('tr', result.message, 'danger');
        } else {
          notify('tr', 'successfully created', 'success');
          dispatch({
            type: LOGIN_SUCCESS,
            payload: result,
          });

          localStorage.setItem('id', result.uid);
          localStorage.setItem('expires_in', result.oauthData.expires_in);
          localStorage.setItem('token', result.oauthData.access_token);
          history.push('/admin/menu');
        }
      });
    // setLoading(true);
    // dispatch(login(email, password));
    // if (isLoggedIn) {
    //   history.push('/admin/menu');
    // } else {
    //   if (message) {
    //     history.push('/auth/login');
    //     alert(message);
    //   }
    // }
  };

  return (
    <>
      <AuthHeader
        title="Welcome!"
        lead="Use these awesome forms to login or create new account in your project for free."
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Sign in with credentials</small>
                </div>
                <Form role="form" onSubmit={onSubmitHandler}>
                  <FormGroup
                    className={classnames('mb-3', {
                      focused: email,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        autoComplete="off"
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: password,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        autoComplete="off"
                        name="password"
                        placeholder="Password"
                        type="password"
                        // {...register('password')}

                        onChange={(e) => setpassword(e.target.value)}

                        // className={`form-control ${
                        //   errors.password ? 'is-invalid' : ''
                        // }`}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Remember me</span>
                    </label>
                  </div>

                  <div className="text-center">
                    <Button type="submit" className="my-4" color="info">
                      Sign in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Forgot password?</small>
                </a>
              </Col>
              <Col className="text-right" xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Create new account</small>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div className="rna-wrapper">
        <NotificationAlert ref={notifAlert} />
      </div>
    </>
  );
}

export default Login;
