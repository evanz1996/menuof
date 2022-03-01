import React, { useState } from 'react';
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
} from 'reactstrap';
import { Menu } from 'json/restaurantMenu';
import ParentMenu from './ParentMenu';

function SectionForm() {
  console.log('restaurantMenu', Menu);
  const [selectedMenu, setSelectedMenu] = useState('');

  const handleMenuSelect = (e) => {
    console.log('Selected Menu', e.target.value);
    console.log(Menu);
    let ParentMenu = e.target.value;
    const subMenu2nd=""
    Menu.map((menu, key) => (
      subMenu2nd = ParentMenu !== '' ? menu[ParentMenu] : ''  console.log();)
     
    )
   
  };
  return (
    <div>
      <Container className="mt--6" fluid>
        <h5 className="modal-title" id="exampleModalLabel">
          Menu Section
        </h5>
        <br></br>

        <Row>
          <Col lg="12">
            <Form>
              <FormGroup>
                <FormGroup>
                  <label className="form-control-label">Add Section</label>
                  <Input defaultValue="Salad" id="menuSectionAdd" type="text" />
                  <label className="form-control-label">
                    Select Menu Section
                  </label>
                  <div className="Container">
                    <Input
                      type="select"
                      name="menuSections"
                      onChange={(e) => handleMenuSelect(e)}
                      value={selectedMenu}
                    >
                      <option value="">Select Menu Section</option>
                      {Menu.map((menu, key) => (
                        <option key={key} value={menu.uid}>
                          {menu.name}
                        </option>
                      ))}
                    </Input>
                  </div>
                  {/* <Input
                    type="select"
                    name="select"
                    id="menuSection"
                    onChange={(e) => handleMenuSelect(e)}
                    value={selectedMenu}
                  >
                    {Menu.map((menu, index) => {
                      console.log(index);
                      return (
                        <option key={menu.uid} value={menu.uid}>
                          {menu.name}
                        </option>
                      );
                    })}
                  </Input> */}

                  {/* // return{' '}
                  <ParentMenu items={menu} key={index}></ParentMenu>; // return
                  ( //{' '}
                  <li className="menu-items" key={index}>
                    // <a href="/#">{menu.name}</a>
                    //{' '}
                  </li>
                  // ); */}
                </FormGroup>
              </FormGroup>
              <FormGroup>
                <label className="form-control-label">Sub Section</label>
                <Input defaultValue="chicken" id="subsection" type="text" />
              </FormGroup>
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="example-email-input"
                >
                  Description
                </label>
                <Input id="description" type="text-area" />
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
                <Input id="menuAvailability" type="date" />
                <label
                  className="form-control-label"
                  htmlFor="example-url-input"
                >
                  To
                </label>
                <Input id="menuAvailability" type="date" />
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SectionForm;
