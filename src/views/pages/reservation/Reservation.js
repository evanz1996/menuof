import React, { useEffect, useState } from 'react';
import SimpleHeader from 'components/Headers/SimpleHeader.js';

import {
  Card,
  Container,
  Row,
  Col,
  CardBody,
  CardText,
  CardTitle,
  Button,
  Form,
} from 'reactstrap';
import ReservationBSTable from '../tables/ReservationBSTable';

function Reservation() {
  let [reservations, setReservations] = useState([]);
  // let [activateModal, setActivateModal] = useState(false);

  useEffect(() => {
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
    const fetchData = async () => {
      const data = await fetch(url);
      const response = await data.json();
      setReservations(response.meals);
    };
    fetchData().catch(console.error);
  }, []);
  console.log(reservations);

  return (
    <div>
      <SimpleHeader name="" parentName="Reservations" />

      <Container className="mt--6" fluid>
        <Row>
          <Card>
            <CardBody>
              <CardTitle className="mb-3" tag="h3">
                Reservation
              </CardTitle>
              <CardText className="mb-4 wrap-overlap">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facilis non dolore est fuga nobis ipsum illum eligendi nemo iure
                repellat, soluta, optio minus ut reiciendis voluptates enim
                impedit veritatis officiis.
              </CardText>
              <Row>
                <Col xl="3">
                  <Form>
                    <label className="custom-toggle mr-1">
                      <input defaultChecked type="checkbox" />
                      <span
                        className="custom-toggle-slider rounded-circle"
                        data-label-off="Deactivate"
                        data-label-on="Activate"
                      />
                    </label>
                  </Form>

                  {/* <Button color="primary" href="#pablo" onClick={manageHandler}>
                    Management Of
                  </Button> */}
                </Col>
                <Col xl="3">
                  <Button
                    color="success"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Timetables
                  </Button>
                </Col>

                <Col xl="3">
                  <Button
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Book
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
                    Pending Reservations Notice
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
        <ReservationBSTable data={reservations}></ReservationBSTable>
      </Container>
    </div>
  );
}

export default Reservation;
