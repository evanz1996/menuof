import React from 'react';
import {
  Card,
  CardHeader,
  Row,
  Modal,
  Button,
  Col,
  Table,
  Container,
} from 'reactstrap';

export class OrderModalBody extends React.PureComponent {
  render() {
    return (
      <>
        <div>
          <Row>
            <Col sm="6">Payment: On delivery</Col>
            <Col sm="6">Delivery: test101</Col>
          </Row>
          <Row>
            <Col sm="6"> First name: test101</Col>
            <Col sm="6">Address: test101</Col>
          </Row>
          <Row>
            <Col sm="6">Phone number: test101</Col>
            <Col sm="6">Email-Address: test101</Col>
          </Row>
          {/* 
          <Table className="align-items-center" responsive id="react-bs-table">
            <thead className="thead-light">
              <tr>
                <th scope="col">Qty</th>
                <th scope="col">Order</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> 1</td>
                <td>2 </td>
                <td>300 </td>
                <td>600 </td>
              </tr>
            </tbody>
            Subtotal: 600 <br />
            Delivery costs: 50
            <br /> Discount (Card): 0 Total 650
            <br />
          </Table> */}
        </div>
      </>
    );
  }
}

export default OrderModalBody;
