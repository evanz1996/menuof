import React, { useState, useRef, useEffect } from 'react';

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
import { register } from 'actions/auth';
import { useDispatch, useSelector } from 'react-redux';

import NotificationAlert from 'react-notification-alert';
import 'react-notification-alert/dist/animate.css';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
function Register() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [spinner, setSpinner] = useState(false);
  const { message } = useSelector((state) => state);
  const [errorMessage, setErrorMessage] = useState({});
  const [fnameMessage, setFnameMessage] = useState('');
  const [lnameMessage, setLnameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const dispatch = useDispatch();
  let history = useHistory();
  console.log('RESPONSE', message);
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

  // useEffect(() => {
  //   console.log('im here bro', message);

  // }, [message]);

  const onSubmitHandler = (event) => {
    // console.log('message register', message);
    event.preventDefault();
    console.log('henlo from create signup');

    dispatch(register(fname, lname, email, password))
      .then(() => {
        notify('tr', 'successfully registered', 'success');
        console.log('RESPONSE', { message });
        setTimeout(function () {
          history.push('/auth/restaurant');
        }, 1000);
        // if (response !== undefined || response === '') {
        //   console.log('I am here');
        //   console.log(response);
        // } else {
        //   // console.log('response.error', response.response);
        //   // console.log('response.error', response.data);
        //   notify('tr', 'Failed to register!', 'danger');
        // }
        // console.log(response.response);
        // if (response.status === 200) {
        //   console.log('success register');
        //   notify('tr', 'successfully registered', 'success');
        // } else {
        //   console.log('failed register');
        //   notify('tr', 'Failed to register!', 'danger');
        // }
        // console.log('success register');
        // notify('tr', 'successfully registered', 'success');
        // setTimeout(function () {
        //   history.push('/auth/restaurant');
        // }, 1000);
      })
      .catch(() => {
        notify('tr', 'Failed to register!', 'danger');
        console.log('Failed to register!', message);
      });
  };

  return (
    <>
      <AuthHeader
        title="Create Restaurant Account"
        lead="Hey, Welcome to MenuOf. Register Now!"
      />

      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Card className="bg-secondary border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Create a Restaurant User Account</small>
                </div>
                <Form role="form" onSubmit={onSubmitHandler}>
                  <FormGroup>
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="First name"
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </InputGroup>
                    {message.message !== undefined &&
                      message.message.fname !== undefined && (
                        <span> {message.message.fname[0]} </span>
                      )}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Last name"
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </InputGroup>
                    {message.message !== undefined &&
                      message.message.lname !== undefined && (
                        <span> {message.message.lname[0]} </span>
                      )}
                  </FormGroup>

                  <FormGroup>
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </InputGroup>
                    {message.message !== undefined &&
                      message.message.email !== undefined && (
                        <span> {message.message.email[0]} </span>
                      )}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setpassword(e.target.value)}
                      />
                    </InputGroup>
                    {message.message !== undefined &&
                      message.message.password !== undefined && (
                        <span> {message.message.password[0]} </span>
                      )}
                  </FormGroup>
                  <div className="text-muted font-italic">
                    <small>
                      password strength:
                      <span className="text-success font-weight-700">
                        strong
                      </span>
                    </small>
                  </div>
                  <Row className="my-4">
                    <Col xs="12">
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="customCheckRegister"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckRegister"
                        >
                          <span className="text-muted">
                            I agree with the{' '}
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button className="mt-4" color="info" type="submit">
                      Create account
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <div className="rna-wrapper">
        <NotificationAlert ref={notifAlert} />
      </div>
    </>
  );
}

export default Register;
