import React, { useEffect, useState } from 'react';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import './Order.css';

import {
  Card,
  Container,
  Row,
  Col,
  CardBody,
  CardText,
  CardTitle,
  Button,
  Modal,
} from 'reactstrap';
import OrderBSTable from '../tables/OrderBSTable';
function Order() {
  let [orders, setOrders] = useState([]);
  let [manageModal, setManageModal] = useState(false);

  const toggleModal = (state) => {
    manageModal(true);
  };
  useEffect(() => {
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
    const fetchData = async () => {
      const data = await fetch(url);
      const response = await data.json();
      setOrders(response.meals);
    };
    fetchData().catch(console.error);
  }, []);
  console.log(orders);

  function manageHandler(e) {
    e.preventDefault();
    console.log('manage');
    setManageModal(true);
  }
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
              <CardText className="mb-4 wrap-overlap">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facilis non dolore est fuga nobis ipsum illum eligendi nemo iure
                repellat, soluta, optio minus ut reiciendis voluptates enim
                impedit veritatis officiis.
              </CardText>
              <Row>
                <Col xl="3">
                  <Button color="primary" href="#pablo" onClick={manageHandler}>
                    Management Of
                  </Button>
                </Col>

                <Col xl="3">
                  <Button
                    color="success"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Delivery Map Brands
                  </Button>
                </Col>
                <Col xl="3" sm="5" md="4">
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
      <Container>
        <OrderBSTable data={orders}></OrderBSTable>
      </Container>

      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={manageModal}
        toggle={() => toggleModal('defaultModal')}
      >
        <div className="modal-header">
          <h1 className="modal-title" id="modal-title-default">
            Home delivery time slots
          </h1>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setManageModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body wrap-overlap ">
          <p>
            Select the time slots you want to deactivate for today. NB It will
            not be possible to cancel the changes. The bands deactivated today
            will automatically be available tomorrow according to the parameters
            selected in Settings Orders
          </p>
          <h3> Bands available today for home deliveries:</h3>
          <h3> Bands available today for take away:</h3>
        </div>
        <div className="modal-footer">
          <Button color="primary" type="button">
            Save changes
          </Button>
          <Button
            className="ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={() => setManageModal(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Order;
