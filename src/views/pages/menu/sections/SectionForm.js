import React, { useState } from 'react';
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

  console.log('selected', selectedMenu);
  const selectedMenuHandleChange = () => {
    console.log('selectedMenu', selectedMenu);
    console.log('selectedMenuHandleChange');
    setSelected(selectedMenu);
  };
  function handleSubmit(event) {
    console.log('im here');
    event.preventDefault();
    const data = {
      section: selectedMenu,
      menu: selected,
      description: description,
      fromAvailability: fromAvailability,
      toAvailability: toAvailability,
    };
    console.log(data);
  }
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
      </div>
    </>
  );
}

export default SectionForm;
