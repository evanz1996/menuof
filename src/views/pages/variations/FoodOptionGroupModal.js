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
function FoodOptionGroupModal() {
  const [formValues, setFormValues] = useState([
    { elementName: '', price: '' },
  ]);
  const [groupElements, setGroupElements] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupTitle, setGroupTitle] = useState('');
  const [minChoice, setMinChoice] = useState('');
  const [maxChoice, setMaxChoice] = useState('');
  const notifAlert = useRef(null);
  const [errors, setErrors] = useState({
    name: '',
    min_choice: '',
    max_choice: '',
  });
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
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { elementName: '', price: '' }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const foodOptionGroupHandle = (e) => {
    e.preventDefault();
    console.log('foodOptionGroupHandle');
    let data = {
      name: groupName,
      min_choice: minChoice,
      max_choice: maxChoice,
      foodGroups: formValues,
    };
    console.log(data);
    const token = localStorage.getItem('token');
    fetch(`http://menuof.test/api/resturant-owner/food/options/1/groups`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.message) {
          setErrors({
            name: result.errors.name,
            min_choice: result.errors.min_choice,
            max_choice: result.errors.max_choice,
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
    <>
      <div>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Group Option
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
                <FormGroup>
                  <Label for="groupName">Group Name</Label>
                  <Input
                    id="groupName"
                    name="groupName"
                    placeholder="Add Group Name"
                    type="text"
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                  {errors.name && errors.name !== undefined && (
                    <span className="errorMessage"> {errors.name} </span>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label for="groupTitle">Group Title</Label>
                  <Input
                    id="groupTitle"
                    name="groupTitle"
                    placeholder="Add Group Title"
                    type="groupTitle"
                    onChange={(e) => setGroupTitle(e.target.value)}
                  />
                  {errors.title && errors.title !== undefined && (
                    <span className="errorMessage"> {errors.title} </span>
                  )}
                </FormGroup>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleCity">Min. Choice</Label>
                      <Input
                        name="minChoice"
                        onChange={(e) => setMinChoice(e.target.value)}
                      />
                      {errors.min_choice && errors.min_choice !== undefined && (
                        <span className="errorMessage">
                          {errors.min_choice}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleState">Max Choice</Label>
                      <Input
                        name="maxChoice"
                        onChange={(e) => setMaxChoice(e.target.value)}
                      />
                      {errors.max_choice && errors.max_choice !== undefined && (
                        <span className="errorMessage">
                          {errors.max_choice}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Label> Group Elements</Label>
                {formValues.map((element, index) => (
                  <div key={index}>
                    <Row>
                      <Col md={9}>
                        <FormGroup>
                          <Label>Name</Label>
                          <Input
                            id="elementName"
                            name="elementName"
                            value={element.elementName || ''}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="price">Price</Label>
                          <Input
                            id="price"
                            name="price"
                            value={element.price || ''}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </FormGroup>
                      </Col>

                      {index ? (
                        <Button
                          type="button"
                          className="button remove"
                          onClick={() => removeFormFields(index)}
                        >
                          Remove
                        </Button>
                      ) : null}
                    </Row>
                  </div>
                ))}

                <Button type="button" onClick={() => addFormFields()}>
                  Add New Group
                </Button>

                <Button color="primary">Save</Button>
              </Form>
            </CardBody>
          </Card>
        </Container>

        <div className="rna-wrapper">
          <NotificationAlert ref={notifAlert} />
        </div>
      </div>
    </>
  );
}

export default FoodOptionGroupModal;
