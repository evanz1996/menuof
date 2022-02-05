import React, { useEffect, useState } from 'react';
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
import OrderBSTable from '../tables/OrderBSTable';
function Order() {
  let [orders, setOrders] = useState([]);

  useEffect(() => {
    // declare the data fetching function

    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
    const fetchData = async () => {
      const data = await fetch(url);
      const response = await data.json();
      setOrders(response.meals);
    };
    fetchData().catch(console.error);
  }, []);
  console.log(orders);
  return (
    <div>
      <SimpleHeader name="" parentName="Orders " />
      <OrderBSTable data={orders}></OrderBSTable>
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
                          #
                        </th>
                        <th className="sort" data-sort="budget" scope="col">
                          Order
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          Date
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          Delivery
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          Area
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          Payment
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          Total
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          State
                        </th>

                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody className="list">
                      {orders.map((order) => (
                        <tr key={order.idMeal}>
                          <td>{order.idMeal}</td>
                          <td>{order.strMeal}</td>
                          <td>{order.strCategory}</td>
                          <td>{order.strIngredient1}</td>
                          <td>{order.strIngredient2}</td>
                          <td>{order.strIngredient3}</td>
                          <td>{order.strMeasure1}</td>
                          <td>
                            <select>
                              <option value="actual value 1">
                                Display Text 1
                              </option>
                              <option value="actual value 2">
                                Display Text 2
                              </option>
                              <option value="actual value 3">
                                Display Text 3
                              </option>
                            </select>
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

export default Order;
