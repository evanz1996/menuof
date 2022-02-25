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
  Modal,
} from 'reactstrap';
import VariationModalForm from '../variation/VariationModalForm';
function DishModal() {
  const [dishModal, setDishModal] = useState(false);
  const [openModal, setopenModal] = useState(false);
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          New Dish
        </h5>
      </div>
      <Card>
        <CardBody>
          <Form>
            <Row>
              <Col lg="9">
                <FormGroup>
                  <label className="form-control-label"> Title</label>
                  <Input type="text" name="name" />
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <label className="form-control-label"> Price</label>
                  <Input type="text" name="name" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <FormGroup>
                  <label className="form-control-label"> Description</label>
                  <Input type="text-area" name="name" />
                </FormGroup>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label htmlFor="exampleFormControlSelect1">
                    Menu Section
                  </label>
                  <Input id="exampleFormControlSelect1" type="select">
                    <option>Red Pizzas</option>
                    <option>Promo of the day</option>
                    <option>Side Dishes</option>
                    <option>BrushCetta</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label htmlFor="exampleFormControlSelect1">Sub Section</label>
                  <Input id="exampleFormControlSelect1" type="select">
                    <option>Nesunna</option>
                    <option>Normal</option>
                    <option>Whole grain</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label htmlFor="exampleFormControlSelect1">Variations</label>
                  <Input id="exampleFormControlSelect1" type="select">
                    <option>Menu of the day</option>
                    <option>Sauces</option>
                    <option>Dough + Ingredients</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Button onClick={() => setopenModal(true)}>
                    Add Variations
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
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
    </>
  );
}

export default DishModal;
