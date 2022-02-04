import React from 'react';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import './Order.css';

import {
  Table,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  CardText,
  CardTitle,
  Button,
  Form,
} from 'reactstrap';
function Order() {
  return (
    <div>
      <SimpleHeader name="" parentName="Orders " />
      <Container className="mt--6" fluid>
        <Row>
          <Card>
            <CardBody>
              <CardTitle className="mb-3" tag="h3">
                Manage Orders
              </CardTitle>
              <CardText className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facilis non dolore est fuga nobis ipsum illum eligendi nemo iure
                repellat, soluta, optio minus ut reiciendis voluptates enim
                impedit veritatis officiis.
              </CardText>
              <Row>
                <Col xl="4">
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Management Of
                  </Button>
                </Col>

                <Col xl="4">
                  <Button
                    color="success"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Delivery Map Brands
                  </Button>
                </Col>
                <Col xl="3">
                  <input
                    className="custom-control-input notice-pending"
                    id="customCheck1"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Notice of Pending Orders
                  </label>
                  <input
                    className="custom-control-input notice-pending"
                    id="customCheck1"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Automatic Confirmation
                  </label>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default Order;
