import React, { useState, useEffect, useRef } from 'react';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import './Warehouse.css';
import WarehouseBSTable from '../tables/WarehouseBSTable';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Card,
  Container,
  Row,
  CardBody,
  CardText,
  CardTitle,
  Button,
  Input,
  Label,
  Col,
} from 'reactstrap';
import NotificationAlert from 'react-notification-alert';
import 'react-notification-alert/dist/animate.css';
function Warehouse() {
  const [warehouses, setWarehouse] = useState([]);
  const [activeWarehouse, setActiveWarehouse] = useState(false);
  const [blockPurchase, setBlockPurchase] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);

  useEffect(() => {
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
    const fetchData = async () => {
      const data = await fetch(url);
      const response = await data.json();
      setWarehouse(response.meals);
    };
    // call the function
    fetchData().catch(console.error);
  }, []);
  const notifAlertRef = useRef(null);
  const notify = (place, message, type) => {
    console.log('notify');
    let options = {
      place: place,
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            Attention
          </span>
          <span data-notify="message">{message}</span>
        </div>
      ),
      type: type,
      icon: 'ni ni-bell-55',
      autoDismiss: 7,
    };
    console.log(notify);
    notifAlertRef.current.notificationAlert(options);
  };
  const activateWarehouseHandler = (e) => {
    console.log('here');
    // let activateWarehouseStatus = e.target.checked;
    // setActiveWarehouse(activateWarehouseStatus);
    notify('tr', 'hello', 'success');
    console.log('im here at activate warehouse');
  };

  return (
    <div>
      <SimpleHeader name="" parentName="Warehouse Management" />
      <Container className="mt--6" fluid>
        <Row>
          <Card>
            <CardBody>
              <CardTitle className="mb-3" tag="h3">
                Settings
              </CardTitle>
              <CardText className="">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facilis non dolore est fuga nobis ipsum illum eligendi nemo iure
                repellat, soluta, optio minus ut reiciendis voluptates enim
                impedit veritatis officiis.
              </CardText>
              <Row>
                <Col lg="4">
                  <Label check>
                    <Input
                      color="primary"
                      type="checkbox"
                      name="activateWarehouse"
                      onChange={(e) => activateWarehouseHandler(e)}
                    />
                    <strong>Activate warehouse handling</strong>
                  </Label>
                </Col>
                <Col lg="4">
                  <Label check>
                    <Input
                      color="primary"
                      type="checkbox"
                      name="blockPurchase"
                      onChange={(e) => setBlockPurchase(e.target.checked)}
                    />
                    <strong>Block purchase without availability</strong>
                  </Label>
                </Col>
                <Col lg="4">
                  <Label check>
                    <Input
                      color="primary"
                      type="checkbox"
                      onChange={(e) => setShowAvailability(e.target.checked)}
                    />
                    <strong>Show availability in the catalog</strong>
                  </Label>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
      </Container>

      <Container>
        <Row>
          <Card>
            <CardBody>
              <CardTitle className="mb-3" tag="h3">
                Categories
              </CardTitle>
              <CardText className="mb-4 wrap-overlap ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facilis non dolore est fuga nobis ipsum illum eligendi nemo iure
                repellat, soluta, optio minus ut reiciendis voluptates enim
                impedit veritatis officiis.
              </CardText>
              <Button
                color="primary"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Edit
              </Button>
              <UncontrolledDropdown>
                <DropdownToggle color="primary">Style</DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Horizontal
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Vertical
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </CardBody>
          </Card>
        </Row>
      </Container>

      <Container>
        <WarehouseBSTable data={warehouses} />
      </Container>
      <div className="rna-wrapper">
        <NotificationAlert ref={notifAlertRef} />
      </div>
    </div>
  );
}

export default Warehouse;
