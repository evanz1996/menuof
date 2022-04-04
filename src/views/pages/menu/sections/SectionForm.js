import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
  Label,
  Card,
  CardBody,
  CardText,
} from 'reactstrap';
import { items } from 'json/restaurantMenu';
import './MultilevelMenu.css';
import MultiLevelMenu from './MultiLevelMenu';
import NavBarMenu from './NavBarMenu';
import NotificationAlert from 'react-notification-alert';
import { useDispatch, useSelector } from 'react-redux';
function SectionForm() {
  const id = useSelector((state) => state.currentMenuSelectedReducer);
  console.log(id['payload']);
  let selectedMenu = id['payload'];
  const [newSection, setNewSection] = useState('');
  const [selected, setSelected] = useState(selectedMenu);
  const [description, setDescription] = useState('');
  const [fromAvailability, setFromAvailability] = useState('');
  const [toAvailability, setToAvailability] = useState('');
  const [errors, setErrors] = useState({
    resturant_id: '',
    parent_id: '',
    name: '',
    description: '',
    availability: '',
  });
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
  console.log('selected', selectedMenu);
  let parent_id = '';
  let currentMenu = '1';
  let currentRestaurant = '1';
  const selectedMenuHandleChange = () => {
    console.log('selectedMenu', selectedMenu);
    console.log('selectedMenuHandleChange');
    setSelected(selectedMenu);
  };
  function handleSubmit(event) {
    console.log('im here');
    event.preventDefault();
    let token = localStorage.getItem('token');

    if (!selectedMenu) {
      parent_id = currentMenu;
    } else {
      parent_id = selectedMenu;
    }

    const data = {
      resturant_id: 1,
      // // parent_id: parent_id,
      // parent_id: 1,
      name: newSection,
      description: description,
      availability: fromAvailability,
      toAvailability: toAvailability,
    };
    console.log(data);
    fetch(
      // `http://menuof.test/api/resturant-owner/resturant/${currentRestaurant}/menus`,
      `http://menuof.test/api/resturant-owner/resturant/${currentRestaurant}/menus`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        // if (result.status) {
        if (result.message) {
          console.log('MENUS', result.status);
          console.log('MENUS', result);
          setErrors({
            resturant_id: result.errors.resturant_id,
            parent_id: '',
            name: result.errors.name,
            description: result.errors.description,
            availability: result.errors.availability,
          });
          notify('tr', 'Failed to Add!', 'danger');
        } else {
          console.log('MENUS', result);
          notify('tr', 'successfully Added!', 'success');
        }
      });
  }

  useEffect(() => {});

  return (
    <>
      <div>
        <Container className="mt--6" fluid>
          <h5 className="modal-title" id="exampleModalLabel">
            Menu Section {selectedMenu}
          </h5>

          <br></br>
          <Row>
            <Col lg="12">
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <label>Select Menu Section:</label>
                  <Input
                    value={selectedMenu}
                    onChange={selectedMenuHandleChange}
                    disabled
                  ></Input>
                  <NavBarMenu items={items}> </NavBarMenu>
                  {/* <MultiLevelMenu items={items}></MultiLevelMenu> */}
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Add Section</label>
                  <Input
                    id="menuSectionAdd"
                    type="text"
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                  />
                  {errors.name && errors.name !== undefined && (
                    <span className="errorMessage">{errors.name}</span>
                  )}
                </FormGroup>

                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example-email-input"
                  >
                    Description
                  </label>
                  <Input
                    id="description"
                    type="text-area"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && errors.description !== undefined && (
                    <span className="errorMessage">{errors.description}</span>
                  )}
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="example-url-input"
                  >
                    Availability
                  </label>
                  <br></br>
                  <label
                    className="form-control-label"
                    htmlFor="example-url-input"
                  >
                    From
                  </label>
                </FormGroup>
                <FormGroup>
                  <Input
                    id="fromAvailability"
                    type="date"
                    value={fromAvailability}
                    onChange={(e) => setFromAvailability(e.target.value)}
                  />
                  <label
                    className="form-control-label"
                    htmlFor="example-url-input"
                  >
                    To
                  </label>
                  <Input
                    id="toAvailability"
                    type="date"
                    value={toAvailability}
                    onChange={(e) => setToAvailability(e.target.value)}
                  />
                </FormGroup>

                <Button color="primary" type="submit">
                  Save changes
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <div className="rna-wrapper">
          <NotificationAlert ref={notifAlert} />
        </div>
      </div>
    </>
  );
}

export default SectionForm;
