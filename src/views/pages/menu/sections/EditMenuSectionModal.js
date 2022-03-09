import React, { useState } from 'react';
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
const EditMenuSectionModal = () => {
  const [editModal, setEditModal] = useState(false);
  return (
    <div>
      <>
        <div>
          <Container className="mt--6" fluid>
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Menu Section
            </h5>
            <br></br>
            <Row>
              <Col lg="12">
                <Form>
                  <FormGroup>
                    <label className="form-control-label">
                      Parent Menu Section
                    </label>
                    <Input
                      defaultValue="Salad"
                      id="menuSectionEdit"
                      type="text"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">
                      Sub Menu Section
                    </label>
                    <Input
                      defaultValue="Salad"
                      id="menuSectionEdit"
                      type="text"
                    />
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
    </div>
  );
};

export default EditMenuSectionModal;
