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
function Register() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const { message } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  const [errorMessage, setErrorMessage] = useState({});
  const [fnameMessage, setFnameMessage] = useState('');
  const [lnameMessage, setLnameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const dispatch = useDispatch();
  let history = useHistory();
  const [returnedMessage, setReturnedMessage] = useState(message);
  const [errors, setErrors] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
  });
  console.log('RESPONSE1111', auth);
  console.log('RESPONSE1111', message);

  // let id = '';
  // if (message.uid) {
  //   console.log((id = message.uid));
  //   id = message.uid;
  // }
  // console.log('IDDDD', id);
  let errorMessages = {};

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
    // console.log('message register', message);
    event.preventDefault();
    console.log('henlo from create signup');

    let registerUser = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    };
    console.log(registerUser);
    fetch('http://menuof.test/api/resturant-owner/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerUser),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.message === 'The given data was invalid.') {
          console.log('setErrors');
          setErrors({
            fname: result.errors.fname,
            lname: result.errors.lname,
            email: result.errors.email,
            password: result.errors.password,
          });
        } else {
          console.log('Successfully Added!');
          console.log(result);
          console.log(result.uid);

          localStorage.setItem('id', result.uid);
          localStorage.setItem('expires_in', result.oauthData.expires_in);
          localStorage.setItem('token', result.oauthData.token);
          localStorage.setItem(
            'owner_id',
            JSON.stringify(result.role[0]['id'])
          );
          notify('tr', 'successfully created', 'success');
          setTimeout(function () {
            history.push('/auth/restaurant');
          }, 1000);
        }
      })
      .catch((error) => {
        console.log('error ERROR', error);
        notify('tr', 'Failed to create', 'danger');
      });

    // dispatch(register(fname, lname, email, password)).then(() => {
    //   console.log('returnedMessage', message);
    //   console.log('RESPONSE', message);
    //   notify('tr', 'successfully registered', 'success');

    //   setTimeout(function () {
    //     history.push('/auth/restaurant');
    //   }, 1000);
    // });
    // .catch((error) => {
    //   console.log('IM HEEERE BROOOOO');
    //   // notify('tr', 'Failed to register!', 'danger');
    //   console.log('Failed to register!', message);
    //   console.log('Failed to registers  ERROOOORs', errors);
    // });
  };

  console.log(errors);
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
                    {errors.fname && errors.fname !== undefined && (
                      <span className="errorMessage">{errors.fname[0]}</span>
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
                    {errors.lname && errors.lname !== undefined && (
                      <span className="errorMessage">{errors.lname[0]}</span>
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
                    {errors.email && errors.email !== undefined && (
                      <span className="errorMessage">{errors.email[0]}</span>
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
                    {errors.password && errors.password !== undefined && (
                      <span className="errorMessage">{errors.password[0]}</span>
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
