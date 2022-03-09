import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
import { items } from 'json/restaurantMenu';
import './MultilevelMenu.css';
import MultiLevelMenu from './MultiLevelMenu';
import NavBarMenu from './NavBarMenu';
import { useDispatch, useSelector } from 'react-redux';
function SectionForm() {
  const [selected, setSelected] = useState('');
  const id = useSelector((state) => state.currentMenuSelectedReducer);
  console.log(id['payload']);
  let selectedMenu = id['payload'];
  // useEffect(() => {
  //   console.log('useEffect', id);
  // }, [id]);

  const selectedMenuHandleChange = () => {
    console.log('selectedMenuHandleChange');
  };
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
              <Form>
                <FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Add Section</label>
                    <Input
                      defaultValue="Salad"
                      id="menuSectionAdd"
                      type="text"
                    />
                    <label>Pick your Selected Menu:</label>
                    <Input
                      value={'hello'}
                      onChange={selectedMenuHandleChange}
                    ></Input>
                    <NavBarMenu items={items}> </NavBarMenu>
                    {/* <MultiLevelMenu items={items}></MultiLevelMenu> */}
                  </FormGroup>
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
    </>
  );
}

export default SectionForm;
