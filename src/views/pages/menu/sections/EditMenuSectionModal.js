import React, { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
  Modal,
  CardBody,
  CardText,
} from 'reactstrap';
import axios from 'axios';
import NavBarMenu from './NavBarMenu';
import { useDispatch, useSelector } from 'react-redux';
const EditMenuSectionModal = () => {
  const [editModal, setEditModal] = useState(false);
  const menuId = useSelector((state) => state.currentMenuSelectedReducer);
  const id = useSelector((state) => state.currentRestaurantReducer);
  let selectedMenu = menuId['payload'];
  const [newSection, setNewSection] = useState('');
  const [description, setDescription] = useState('');
  const [fromAvailability, setFromAvailability] = useState('');
  const [toAvailability, setToAvailability] = useState('');
  let mounted = true;
  useEffect(() => {
    console.log('here at EditMenuSectionModal');
    getData();
    return () => (mounted = false);
  }, []);
  let parent_id = '';
  let currentMenu = '';
  const getData = () => {
    console.log('IDDD', id);
    console.log('id', menuId);
    console.log('id.payload', id.payload);
    console.log(
      'url',
      `http://menuof.test/api/resturant-owner/resturant/${id.payload}/menus/${selectedMenu}`
    );
    let token = localStorage.getItem('token');
    var config = {
      method: 'get',
      url: `http://menuof.test/api/resturant-owner/resturant/${id.payload}/menus/${selectedMenu}`,
      // url: `http://menuof.test/api/resturant-owner/resturant/2/menus/2`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log('here at axios NavBar Menu Dash');
        console.log('EditMenu Section', response.data);
        console.log('EditMenu Section', response.data.name);
        setNewSection(response.data.name);
        setDescription(response.data.description);
        setFromAvailability(response.data.availability);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function updateHandler(event) {
    event.preventDefault();
    let token = localStorage.getItem('token');

    if (!selectedMenu) {
      console.log('here !selectedMenu');
      parent_id = currentMenu;
    } else {
      console.log('here selectedMenu', selectedMenu);
      parent_id = selectedMenu;
    }
    const data = {
      resturant_id: id.payload,
      parent_id: parent_id,
      name: newSection,
      description: description,
      availability: fromAvailability,
    };
    console.log('data', data);

    fetch(
      `http://menuof.test/api/resturant-owner/resturant/${id.payload}/menus/${selectedMenu}`,
      {
        method: 'PUT',
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
        console.log('result', result);
        // if (result.status) {
        // if (result.message) {
        //   console.log('MENUS', result.status);
        //   console.log('MENUS', result);
        //   // setErrors({
        //   //   resturant_id: result.errors.resturant_id,
        //   //   parent_id: '',
        //   //   name: result.errors.name,
        //   //   description: result.errors.description,
        //   //   availability: result.errors.availability,
        //   // });
        //   // notify('tr', 'Failed to Add!', 'danger');
        // } else {
        //   console.log('MENUS', result);
        //   // notify('tr', 'successfully Added!', 'success');
        // }
      });
  }
  return (
    <div>
      <>
        <div>
          <Container className="mt--6" fluid>
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Menu Section {selectedMenu}
            </h5>
            <br></br>
            <Row>
              <Col lg="12">
                <Form onSubmit={updateHandler}>
                  <FormGroup>
                    <label className="form-control-label">
                      Parent Menu Section
                    </label>
                    <Input
                      defaultValue="Salad"
                      id="menuSectionEdit"
                      type="text"
                      // value={newSection}
                      // onChange={(e) => setNewSection(e.target.value)}
                    />
                  </FormGroup>
                  <NavBarMenu> </NavBarMenu>
                  <FormGroup>
                    <label className="form-control-label">
                      Sub Menu Section
                    </label>
                    <Input
                      id="menuSectionEdit"
                      type="text"
                      value={newSection}
                      onChange={(e) => setNewSection(e.target.value)}
                    />
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
                    <Input
                      id="menuAvailability"
                      type="text"
                      value={fromAvailability ? fromAvailability : ''}
                      onChange={(e) => setFromAvailability(e.target.value)}
                    />
                    <label
                      className="form-control-label"
                      htmlFor="example-url-input"
                    >
                      To
                    </label>
                    <Input id="menuAvailability" type="date" />
                  </FormGroup>
                  <div className="modal-footer">
                    <Button
                      color="secondary"
                      data-dismiss="modal"
                      type="button"
                      onClick={() => setEditModal(false)}
                    >
                      Close
                    </Button>
                    <Button color="primary" type="submit">
                      Save changes
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    </div>
  );
};

export default EditMenuSectionModal;
