import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Modal,
  Dropdown,
  Label,
} from 'reactstrap';
import NotificationAlert from 'react-notification-alert';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
function OptionModal() {
  const [formValues, setFormValues] = useState([{ groupName: '' }]);
  const [options, setOptions] = useState([]);
  const [optionName, setOptionName] = useState([]);
  const notifAlert = useRef(null);
  const id = useSelector((state) => state.currentRestaurantReducer);
  console.log('IIIID', id.payload);
  const [errors, setErrors] = useState({
    name: '',
  });

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { groupName: '' }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

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
  let isMounted = true;
  useEffect(() => {
    if (localStorage.getItem('id')) {
      if (isMounted) {
        console.log('HUHUHHUMenu');
        getMenuItems();
      }
    }
    return () => (isMounted = false);
  }, []);

  const getMenuItems = () => {
    console.log('Im here ate GET DATA');
    let token = localStorage.getItem('token');
    let URL = '';

    URL = `http://menuof.test/api/resturant-owner/food/options/1/groups`;

    var config = {
      method: 'get',
      url: URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log('here at axios MENU ITEMS');
        console.log(response);
        if (isMounted) {
          setOptions(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const foodOptionGroupHandle = (e) => {
    e.preventDefault();
    console.log('foodOptionGroupHandle');
    let data = {
      name: optionName,
      foodGroups: formValues,
    };
    console.log(data);
    const token = localStorage.getItem('token');
    fetch(
      `http://menuof.test/api/resturant-owner/resturant/${id.payload}/food/options`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.message) {
          setErrors({
            name: result.errors.name,
          });
        } else {
          notify('tr', 'successfully created', 'success');
        }
      })
      .catch((error) => {
        console.log('error ERROR', error);
        notify('tr', 'Failed to create', 'danger');
      });
  };
  return (
    <div>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Option
        </h5>
      </div>
      <Container className="mt--6" fluid>
        <Card>
          <br />
          <CardTitle>
            <h2> New Option</h2>
          </CardTitle>
          <CardBody>
            <Form onSubmit={foodOptionGroupHandle}>
              <Label>Option Name</Label>
              <Input
                type="text"
                name="name"
                value={optionName}
                onChange={(e) => setOptionName(e.target.value)}
              />
              {errors.name && errors.name !== undefined && (
                <span className="errorMessage"> {errors.name} </span>
              )}
              <Row>
                <Col md={12}>
                  {formValues.map((element, index) => (
                    <div className="form-inline" key={index}>
                      <Label>Group Name: </Label>
                      <Input
                        type="select"
                        name="groupName"
                        id="groupName"
                        value={element.groupName || ''}
                        onChange={(e) => handleChange(index, e)}
                      >
                        {options.map((option) => (
                          <option
                            key={option.id}
                            value={option.id}
                            placeholder="select a type"
                          >
                            {option.name}
                          </option>
                        ))}
                      </Input>

                      {index ? (
                        <Button
                          type="button"
                          className="button inline"
                          onClick={() => removeFormFields(index)}
                        >
                          Remove
                        </Button>
                      ) : null}
                    </div>
                  ))}
                </Col>
              </Row>
              <br></br>
              <div>
                <Button onClick={() => addFormFields()}>Add New Group</Button>
                <Button color="primary" type="submit">
                  Save
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Container>

      <div className="rna-wrapper">
        <NotificationAlert ref={notifAlert} />
      </div>
    </div>
  );
}

export default OptionModal;
