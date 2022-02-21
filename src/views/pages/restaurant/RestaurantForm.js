import React, { useState, useRef } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';
// core components
import AuthHeader from 'components/Headers/AuthHeader.js';

function RestaurantForm() {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [telephone, setTelephone] = useState('');
  const [phone, setPhone] = useState('');
  const [vatCode, setVatCode] = useState('');
  const [fiscalNumber, setFiscalNumber] = useState('');
  const [timezone, setTimezone] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [currency, setCurrency] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [billingAddress, setbillingAddress] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('im here');
  };
  return (
    <>
      <AuthHeader
        title="Restaurant Form"
        lead="Time for you to set up the details of  your restaurant"
      />
      <Container className="mt--8 ">
        <Card>
          <CardBody>
            <CardTitle className="mb-3" tag="h3">
              Restaurant Form
            </CardTitle>
            <Form role="form" onSubmit={onSubmitHandler}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Name</label>
                    <Input
                      defaultValue="John Snow"
                      id="name"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Company Name</label>
                    <Input
                      defaultValue="company name...."
                      id="Company name"
                      type="text"
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="example-email-input"
                >
                  Description
                </label>
                <Input
                  defaultValue="Description...."
                  id="description"
                  type="textarea"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormGroup>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Telephone </label>
                    <Input
                      id="phone"
                      type="text"
                      onChange={(e) => setTelephone(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Vat Code</label>
                    <Input
                      defaultValue="vat code..."
                      id="vatCode"
                      type="text"
                      onChange={(e) => setVatCode(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Fiscal Number</label>
                    <Input
                      defaultValue="fiscal ...."
                      id="fiscalNumber"
                      type="text"
                      onChange={(e) => setFiscalNumber(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Timezone</label>
                    <Input
                      defaultValue=""
                      id="timezone"
                      type="text"
                      onChange={(e) => setTimezone(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Country Code</label>
                    <Input
                      defaultValue=""
                      id="countryCode"
                      type="text"
                      onChange={(e) => setCountryCode(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Currency</label>
                    <Input
                      defaultValue=""
                      id="currency"
                      type="text"
                      onChange={(e) => setCurrency(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Latitude</label>
                    <Input
                      defaultValue=""
                      id="latitude"
                      type="text"
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Longitude</label>
                    <Input
                      defaultValue=""
                      id="longitude"
                      type="text"
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <label className="form-control-label">Address</label>
                <Input
                  defaultValue=""
                  id="address"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label">Billing Address</label>
                <Input
                  defaultValue=""
                  id="billingAddress"
                  type="text"
                  onChange={(e) => setbillingAddress(e.target.value)}
                />
              </FormGroup>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Profile Image</label>
                    <Input
                      defaultValue=""
                      id="profile_image"
                      type="text"
                      onChange={(e) => setProfileImage(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Cover Image</label>
                    <Input
                      defaultValue=""
                      id="cover_image"
                      type="text"
                      onChange={(e) => setCoverImage(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button type="submit" className="success">
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default RestaurantForm;
