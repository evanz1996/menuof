import React, { useState } from 'react';
import {
  Container,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
  Modal,
} from 'reactstrap';
import VariationModalForm from './variation/VariationModalForm';
import { useHistory } from 'react-router-dom';

function MenuForm() {
  const [openModal, setopenModal] = useState(false);
  let history = useHistory();
  const addVariation = () => {
    console.log(addVariation);
    history.push('../variations/Variation.js');
  };

  return (
    <div>
      <Container className="mt--6" fluid>
        <h5 className="modal-title" id="exampleModalLabel">
          Modifica pietanza
        </h5>
        <br></br>
        <Row>
          <Col lg="12">
            <div className="card-wrapper">
              <Form>
                <FormGroup className="row">
                  <Label className="form-control-label" md="2">
                    Titolo:
                  </Label>
                  <Col md="10">
                    <Input id="name" type="text" />
                  </Col>
                </FormGroup>

                <FormGroup className="row">
                  <Label className="form-control-label" md="2">
                    Descrizione:
                  </Label>
                  <Col md="10">
                    <Input id="email" type="email" />
                  </Col>
                </FormGroup>

                <FormGroup className="row">
                  <Label className="form-control-label" md="2">
                    Prezzo
                  </Label>
                  <Col md="10">
                    <Input id="phoneNumber" type="tel" />
                  </Col>
                </FormGroup>
                <FormGroup className="row">
                  <Label className="form-control-label" md="2">
                    User Type
                  </Label>
                  <Col md="10">
                    <Input id="typeOfUser" type="select">
                      <option value="1">Staff</option>
                      <option value="2">Super User</option>
                    </Input>
                  </Col>
                </FormGroup>

                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-control-label">
                        Menu Section:
                      </label>
                      <Input required type="select">
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-control-label"> Sub Section</label>
                      <Input name="password" type="text"></Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-control-label">Variations</label>
                      <Input required type="select">
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Button onClick={() => addVariation}>Add Variations</Button>
                </FormGroup>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      {/* Modal */}
      <Modal
        isOpen={openModal}
        toggle={() => setopenModal(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-header">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setopenModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <VariationModalForm />
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            // onClick={() => addVariation}
          >
            Close
          </Button>
          <Button color="primary" type="button">
            Save changes
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default MenuForm;
