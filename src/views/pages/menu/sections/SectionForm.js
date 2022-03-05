import React, { useState } from 'react';
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

function SectionForm() {
  console.log('restaurantMenu', items);
  const [selected, setSelected] = useState('');

  console.log('selected111', selected);
  return (
    <>
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
                    <Input
                      defaultValue="Salad"
                      id="menuSectionAdd"
                      type="text"
                    />
                    <label>Pick your Selected Menu:</label>

                    <MultiLevelMenu items={items}></MultiLevelMenu>
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
