import React, { useState, useEffect } from 'react';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import './Warehouse.css';

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
  FormGroup,
  Input,
} from 'reactstrap';
function Warehouse() {
  const [warehouses, setWarehouse] = useState([]);
  const [quantity, setQuantity] = useState([]);

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
  console.log(warehouses);
  return (
    <div>
      {' '}
      <SimpleHeader name="" parentName="Warehouse Management" />
      <Container className="mt--6" fluid>
        <Row>
          <Card>
            <CardBody>
              <CardTitle className="mb-3" tag="h3">
                Settings
              </CardTitle>
              <CardText className="mb-4">
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
        <Row>
          <Card>
            <CardBody>
              <CardTitle className="mb-3" tag="h3">
                Categories
              </CardTitle>
              <CardText className="mb-4">
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
        <Row>
          <Col xl="5"></Col>
          <Col xl="12">
            <Row>
              <div className="col">
                <Card>
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Dishes</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th className="sort" data-sort="name" scope="col">
                          Product
                        </th>
                        <th className="sort" data-sort="budget" scope="col">
                          Quantity
                        </th>

                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody className="list">
                      {warehouses.map((warehouse) => (
                        <tr key={warehouse.idMeal}>
                          <td className="p">{warehouse.strInstructions}</td>
                          <td>
                            <Col md="6">
                              <FormGroup>
                                <Input
                                  type="number"
                                  value={quantity || ''}
                                  onChange={(e) => setQuantity(e.target.value)}
                                ></Input>
                              </FormGroup>
                            </Col>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Warehouse;
