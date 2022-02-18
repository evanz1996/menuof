import React, { useState } from 'react';
import {
  Container,
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
import Variation from '../variations/Variation';
import { Redirect } from 'react-router';

function MenuForm() {
  const [openModal, setopenModal] = useState(false);
  let history = useHistory();

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
                      <option value="1">Multiple Choice</option>
                      <option value="2">Alternative Choice</option>
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
                  {/* <a
                    // href={process.env.MENUOF_PUBLIC_FRONT_END_API + }
                    target="_blank"
                    rel="noreferrer noopener"
                    class="btn btn-info"
                  >
                    Add Variations
                  </a> */}
                  <Button onClick={() => setopenModal(true)}>
                    Add Variations
                  </Button>
                </FormGroup>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      {/* Modal */}
      <Modal
        size="lg"
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
