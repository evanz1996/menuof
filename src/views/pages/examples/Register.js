import React, { useState, useRef } from 'react';

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
import { useHistory } from 'react-router-dom';
function Register() {
  // const [focusedName, setfocusedName] = React.useState(false);
  // const [focusedEmail, setfocusedEmail] = React.useState(false);
  // const [focusedPassword, setfocusedPassword] = React.useState(false);

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setName] = useState('');
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state);
  console.log(message);
  const dispatch = useDispatch();
  let history = useHistory();

  const notificationAlertRef = useRef(null);
  const notify = (place, message, type) => {
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
    notificationAlertRef.current.notificationAlert(options);
  };

  const onSubmitHandler = (event) => {
    // console.log('message register', message);
    event.preventDefault();
    console.log('henlo from create signup');

    dispatch(register(name, email, password))
      .then(() => {
        console.log('success register');
        notify('tr', 'successfully registered', 'success');
        // history.push('/admin/menu');
        history.push('/admin/menu');
      })
      .catch(() => {
        console.log('failed register');
        notify('tr', 'Failed to register!', 'danger');
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
                  <small>Create an account</small>
                </div>
                <Form role="form" onSubmit={onSubmitHandler}>
                  <FormGroup
                  // className={classnames({
                  //   focused: focusedName,
                  // })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </InputGroup>
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
                  </FormGroup>
                  <div className="text-muted font-italic">
                    <small>
                      password strength:{' '}
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
        <NotificationAlert ref={notificationAlertRef} />
      </div>
    </>
  );
}

export default Register;
