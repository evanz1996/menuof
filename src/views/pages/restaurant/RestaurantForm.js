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
import { createRestaurant } from 'actions/restaurant';
import { useDispatch, useSelector } from 'react-redux';
import { AccessTokenRestaurant } from 'actions/restaurant';
import { color } from '@mui/system';
import './restaurant.css';
import NotificationAlert from 'react-notification-alert';
import { REGISTER_SUCCESS } from 'actions/types';
function RestaurantForm() {
  const dispatch = useDispatch();
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

  const [errors, setErrors] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    fiscalNumber: '',
    billingAddress: '',
    vatCode: '',
    timeZoneMessage: '',
  });
  let history = useHistory();

  const notifAlert = useRef(null);
  const notify = (place, message, type) => {
    console.log('im here');
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
    notifAlert.current.notificationAlert(options);
  };

  // return <div>Hello Res Form</div>;
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('im here');
    let restaurant = {
      owner_id: 2,
      name: name,
      company_name: companyName,
      description: description,
      phone: telephone,
      vat_code: vatCode,
      fiscal_number: fiscalNumber,
      timezone: timezone,
      country_code: countryCode,
      currency: 'USDT',
      latitude: latitude,
      longitude: longitude,
      billing_address: billingAddress,
      address: address,
      profile_image: profileImage,
      cover_image: coverImage,
      category_id: 1,
    };

    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));
    // const token =
    //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NWNlZjU0Yy0wMjJlLTQyMzAtOTYxMi05MTM5Y2UxM2IwOTkiLCJqdGkiOiJhYTczN2YxMjIwYzQwYTUwNDRlOGMyMzdmY2IxM2JiMWRlNTkzOTE2NzE3NGVmMzIwYmEzODc1Nzg3ODZiZDhkMjhmNTU5N2I1ODhiYTkwNCIsImlhdCI6MTY0NzY4OTYyMC45NTg4ODMsIm5iZiI6MTY0NzY4OTYyMC45NTg4OTksImV4cCI6MTY3OTIyNTYyMC45MzExMDYsInN1YiI6IjY1Iiwic2NvcGVzIjpbXX0.EXPq37KLYy0wXDC-qlLW9NJu1HhyrqanOdpwmhxKK5PO5PkA1WWCINgIOc3eRJ7E0yAmOrUo7pORkYU0Th6fyu6HIeVVrUfkJP6i_h1cwbYBtaPF0OuMh8xNXIQVf1yRlY5jpdCiaeAff4uMYld2hg_sIqmz4NDmO_XV6htX1ihJKv7WJitCE1PLyr6sOYlfWw6uHhpW5eSGLDdODCVDvOQuC26V1lPg_8fpVf32v_hryhrlmMvXfxpTueIDuVGVxnw_aRWhTTSyQRxgpgBOXLMBnXqvkb3Iis4IOJP22N_4xy6oA3QgggMT9uXCeXkpW9_7VhFU6kKqk0wgXD__Mqrm4EdItHYc0q6uhfXHj3IbBNqKw6SpsaTl8LmlzB1RFheCEElUnQw-JY3izuAtmOanlGtNZYJYxFK3POK1GTbqvI6555IT1j4GibP8ABUI053zfJWk8vdaU-S7wbvHjvBMVONzbKtuCi7NAOYunVlR-07xbdpxMV-HBDJD6LXEq1XZ6BeL9vjKZ6jSVwOBJzGQZct0pCzv_SmtjK8PvZ_PoBstzVEJDd6bzTIWv0yzyhcFFEG-UJVEv1Ybqda0w_u40RG6_ZdPzYh0RKYUK7D9zMc7MbxJbMpYVzdw0M7rPruaasI9szkUASLEiANTw2wnacWMCU3xbcewKSqnUmM';

    fetch('http://menuof.test/api/resturant-owner/resturants', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(restaurant),
    })
      .then((res) => res.json())
      .then((result) => {
        // alert(result);
        console.log(result);
        if (result.status === 422) {
          console.log(result.error);
          // setErrors(result.error);
          setErrors({
            name: result.error.name,
            phoneNumber: result.error.phone,
            address: result.error.address,
            fiscalNumber: result.error.fiscal_number,
            billingAddress: result.error.billing_address,
            vatCode: result.error.vat_code,
            timeZoneMessage: result.error.timezone,
          });
        } else {
          notify('tr', 'successfully created', 'success');
          dispatch({
            type: REGISTER_SUCCESS,
          });

          setTimeout(function () {
            history.push('/admin/dashboard');
          }, 1000);
        }
      })
      .catch((error) => {
        console.log('error ERROR', error);
        notify('tr', 'Failed to create', 'danger');
      });
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
                      placeholder="John Snow"
                      id="name"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && errors.name !== undefined && (
                      <span className="errorMessage"> {errors.name} </span>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label">Company Name</label>
                    <Input
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
                      id="phone"
                      type="text"
                      onChange={(e) => setTelephone(e.target.value)}
                    />
                    {errors.phoneNumber && errors.phoneNumber !== undefined && (
                      <span className="errorMessage">{errors.phoneNumber}</span>
                    )}
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
                    {errors.vatCode && errors.vatCode !== undefined && (
                      <span className="errorMessage">{errors.vatCode}</span>
                    )}
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
                    {errors.fiscalNumber &&
                      errors.fiscalNumber !== undefined && (
                        <span className="errorMessage">
                          {errors.fiscalNumber}
                        </span>
                      )}
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
                    {errors.timeZoneMessage &&
                      errors.timeZoneMessage !== undefined && (
                        <span className="errorMessage">
                          {errors.timeZoneMessage}
                        </span>
                      )}
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
                {errors.address && errors.address !== undefined && (
                  <span className="errorMessage">{errors.address}</span>
                )}
              </FormGroup>
              <FormGroup>
                <label className="form-control-label">Billing Address</label>
                <Input
                  placeholder=""
                  id="billingAddress"
                  type="text"
                  onChange={(e) => setbillingAddress(e.target.value)}
                />
                {errors.billingAddress &&
                  errors.billingAddress !== undefined && (
                    <span className="errorMessage">
                      {errors.billingAddress}
                    </span>
                  )}
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
      <div className="rna-wrapper">
        <NotificationAlert ref={notifAlert} />
      </div>
    </>
  );
}

export default RestaurantForm;
