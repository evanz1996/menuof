import React, { useState, useRef, useEffect } from 'react';

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
import { useHistory } from 'react-router-dom';
import { render } from 'preact/compat';
import { geolocated } from 'react-geolocated';
function RestaurantForm() {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [telephone, setTelephone] = useState('');
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

  let history = useHistory();

  // return <div>Hello Res Form</div>;
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('im here');
    let restaurant = {
      name: name,
      company_name: companyName,
      description: description,
      phone: telephone,
      vat_code: vatCode,
      fiscal_number: fiscalNumber,
      timezone: timezone,
      country_code: countryCode,
      currency: currency,
      latitude: latitude,
      longitude: longitude,
      billing_address: billingAddress,
      address: address,
      profile_image: profileImage,
      cover_image: coverImage,
    };
    console.log('res', restaurant);
  };

  let success = false;
  if (success) {
    history.push('/admin/dashboard');
  }

  useEffect(() => {
    console.log('usehere');
    const script = document.createElement('script');

    script.src = 'http://maps.googleapis.com/maps/api/js?sensor=false';
    script.async = true;
    // Update the document title using the browser API
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude is :', position.coords.latitude);

      console.log('Longitude is :', position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      GetAddress(
        position.coords.latitude,
        GetAddress(position.coords.longitude)
      );
    });
  });
  console.log('latitude', latitude);
  console.log('longitude', longitude);
  function GetAddress(lat, lng) {
    // var latlng = new google.maps.LatLng(lat, lng);
    // var geocoder = (geocoder = new google.maps.Geocoder());
    // geocoder.geocode(
    //   {
    //     latLng: latlng,
    //   },
    //   function (results, status) {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //       if (results[0]) {
    //         var address = results[1].address_components;
    //         for (var i = 0, iLen = address.length; i < iLen; i++) {
    //           if (address[i].types[0] === 'country') {
    //             var countryName = address[i].long_name;
    //             alert(countryName);
    //           }
    //         }
    //       }
    //     }
    //   }
    // );
  }
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
                      required
                      placeholder="John Snow"
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
                      required
                      placeholder="company name...."
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
                  required
                  placeholder="Description...."
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
                      required
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
                      placeholder="vat code..."
                      id="vatCode"
                      type="text"
                      onChange={(e) => setVatCode(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <FormGroup>
                    <label className="form-control-label">Fiscal Number</label>
                    <Input
                      placeholder="fiscal ...."
                      id="fiscalNumber"
                      type="text"
                      onChange={(e) => setFiscalNumber(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label className="form-control-label">Timezone</label>
                    <Input
                      placeholder=""
                      id="timezone"
                      type="text"
                      onChange={(e) => setTimezone(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="">
                  <FormGroup>
                    <label className="form-control-label">Country Code</label>
                    <Input
                      placeholder=""
                      id="countryCode"
                      type="text"
                      onChange={(e) => setCountryCode(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              {/* <Row>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Country Code</label>
                    <Input
                      placeholder=""
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
                      placeholder=""
                      id="currency"
                      type="text"
                      hidden
                      onChange={(e) => setCurrency(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row> */}
              {/* <Row>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Latitude</label>
                    <Input
                      placeholder=""
                      id="latitude"
                      type="text"
                      hidden
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Longitude</label>
                    <Input
                      placeholder=""
                      id="longitude"
                      type="text"
                      hidden
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row> */}
              <FormGroup>
                <label className="form-control-label">Address</label>
                <Input
                  placeholder=""
                  id="address"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label">Billing Address</label>
                <Input
                  placeholder=""
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
                      placeholder=""
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
                      placeholder=""
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
