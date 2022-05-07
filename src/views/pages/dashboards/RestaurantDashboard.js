import React, { useState, useEffect, useRef } from 'react';
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
  FormGroup,
  Form,
  Col,
  Input,
  Modal,
} from 'reactstrap';
import NotificationAlert from 'react-notification-alert';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import RestaurantTable from '../tables/RestaurantTable';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ImageResizer from '../images/ImageResizer';
import ImageUploader from 'react-images-upload';
function RestaurantDashboard() {
  const [restaurant, setRestaurant] = useState([]);
  const [selectedValue, setSelectedValue] = useState(1);

  const [addModal, setAddModal] = useState(false);
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
    cover_image: '',
    profile_image: '',
  });
  let check = document.getElementById('text-filter-column-Menu');
  let dataFieldTable = ['Title', 'Description', 'Action'];

  let mounted = true;
  useEffect(() => {
    if (localStorage.getItem('id')) {
      if (mounted) {
        getData();
      }
    }
    return () => (mounted = false);
  }, []);
  const getData = () => {
    console.log('Im here ate GET DATA');
    let token = localStorage.getItem('token');
    var config = {
      method: 'get',
      url: 'http://menuof.test/api/resturant-owner/resturants',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        if (mounted) {
          setRestaurant(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log('Restaurant Dashboard', restaurant);

  const onProfile = (e) => {
    console.log('hello', e);
    setProfileImage(e.target.files[0]);
  };
  const onCoverImage = (e) => {
    // console.log('hello', pictureFiles);
    // setCoverImage(pictureFiles);
    setCoverImage(e.target.files[0]);
  };
  // const renderMenu = (menu) => {
  //   return menu.map((item, index) => (
  //     <div key={index} style={{ marginLeft: '25px' }}>
  //       <li key={item.id}> {item.title}</li>

  //       {item.child && renderMenu(item.child)}
  //     </div>
  //   ));
  // };

  const column = [
    { dataField: 'id', text: 'ID', sort: true },
    { dataField: 'name', text: 'Name', sort: true, filter: textFilter() },
    { dataField: 'slug', text: 'Slug', sort: true },
    // {
    //   dataField: 'Menu',
    //   text: 'Menu',
    //   sort: true,
    //   isDummyField: true,
    //   filter: textFilter(),
    //   formatter: (cellContent, row) => {
    //     console.log(row);
    //     console.log(cellContent);
    //     return <div key={menu.id}>{renderMenu(menu.data)}</div>;
    //   },
    // },
    {
      dataField: 'Action',
      text: 'Delete',
      editable: false,
      isDummyField: true,
      formatter: (cellContent, row) => {
        return (
          <button
            className="btn btn-danger btn-xs"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        );
      },
    },
  ];
  const handleDelete = (rowId) => {
    console.log(rowId);
  };
  const notifAlert = useRef(null);
  const notify = (place, message, type) => {
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

  // const onSubmitHandler = (event) => {
  //   event.preventDefault();
  //   let restaurant = {
  //     owner_id: localStorage.getItem('id'),
  //     name: name,
  //     company_name: companyName,
  //     description: description,
  //     phone: telephone,
  //     vat_code: vatCode,
  //     fiscal_number: fiscalNumber,
  //     timezone: timezone,
  //     country_code: countryCode,
  //     currency: 'USDT',
  //     latitude: latitude,
  //     longitude: longitude,
  //     billing_address: billingAddress,
  //     address: address,
  //     profile_image: profileImage,
  //     cover_image: coverImage,
  //     category_id: 1,
  //   };
  //   console.log('onSubmitHandler', restaurant);
  //   const token = localStorage.getItem('token');
  //   fetch('http://menuof.test/api/resturant-owner/resturants', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: restaurant,
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       if (result.message) {
  //         setErrors({
  //           name: result.errors.name,
  //           phoneNumber: result.errors.phone,
  //           address: result.errors.address,
  //           fiscalNumber: result.errors.fiscal_number,
  //           billingAddress: result.errors.billing_address,
  //           vatCode: result.errors.vat_code,
  //           timeZoneMessage: result.errors.timezone,
  //           cover_image: result.errors.cover_image,
  //           profile_image: result.errors.profile_image,
  //         });
  //       } else {
  //         notify('tr', 'successfully created', 'success');
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('error ERROR', error);
  //       notify('tr', 'Failed to create', 'danger');
  //     });
  // };

  const onSubmitHandler = (event) => {
    console.log('onSubmitHandler');
    event.preventDefault();
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token} `);
    var formdata = new FormData();
    formdata.append('address', address);
    formdata.append('billing_address', billingAddress);
    formdata.append('cover_image', coverImage);
    formdata.append('fiscal_number', fiscalNumber);
    formdata.append('name', name);
    formdata.append('phone', telephone);
    formdata.append('profile_image', profileImage);
    formdata.append('timezone', timezone);
    formdata.append('vat_code', vatCode);
    formdata.append('category_id', '1');
    formdata.append('currency', 'USDT');
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('http://menuof.test/api/resturant-owner/resturants', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('test101', result);
        if (result.message) {
          setErrors({
            name: result.errors.name,
            phoneNumber: result.errors.phone,
            address: result.errors.address,
            fiscalNumber: result.errors.fiscal_number,
            billingAddress: result.errors.billing_address,
            vatCode: result.errors.vat_code,
            timeZoneMessage: result.errors.timezone,
            cover_image: result.errors.cover_image,
            profile_image: result.errors.profile_image,
          });
        } else {
          alert('working success');
          notify('tr', 'successfully created', 'success');
        }
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <>
      <div>
        <SimpleHeader name="" parentName="Restaurant Management" />
        <Container className="mt--6" fluid>
          <Row>
            <Card>
              <CardBody>
                <CardTitle className="mb-3" tag="h3">
                  Restaurant
                </CardTitle>
                <CardText className="mb-4 wrap-overlap">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Facilis non dolore est fuga nobis ipsum illum eligendi nemo
                  iure repellat, soluta, optio minus ut reiciendis voluptates
                  enim impedit veritatis officiis.
                </CardText>
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={(e) => setAddModal(true)}
                >
                  Add Restaurant
                </Button>
                <ImageResizer></ImageResizer>
              </CardBody>
            </Card>
          </Row>
        </Container>
        <Container>
          <RestaurantTable
            column={dataFieldTable}
            data={restaurant}
          ></RestaurantTable>
          {/* <BootstrapTable
            keyField="id"
            data={restaurant}
            columns={column}
            hover
            pagination={paginationFactory()}
            filter={filterFactory()}
          /> */}
        </Container>
      </div>
      {/* Menu Section Modal */}
      <Modal
        size="lg"
        isOpen={addModal}
        toggle={() => setAddModal(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-header">
          <CardTitle className="mb-3" tag="h3">
            Restaurant Form
          </CardTitle>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setAddModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
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
                  {errors.fiscalNumber && errors.fiscalNumber !== undefined && (
                    <span className="errorMessage">{errors.fiscalNumber}</span>
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
              {errors.billingAddress && errors.billingAddress !== undefined && (
                <span className="errorMessage">{errors.billingAddress}</span>
              )}
            </FormGroup>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label className="form-control-label">Profile Image</label>
                  <Input
                    type="file"
                    id="myProfile"
                    name="myProfile"
                    onChange={onProfile}
                  />

                  {/* <ImageUploader
                    withIcon={false}
                    withPreview={true}
                    buttonText="Choose Profile Image"
                    onChange={onProfile}
                    imgExtension={['.jpg', '.png']}
                    maxFileSize={5242880}
                  /> */}
                </FormGroup>
                {errors.cover_image && errors.cover_image !== undefined && (
                  <span className="errorMessage"> {errors.cover_image} </span>
                )}
              </Col>
              <Col md="6">
                <FormGroup>
                  <label className="form-control-label">Cover Image</label>
                  <Input
                    type="file"
                    id="myCoverImage"
                    name="myCoverImage"
                    onChange={onCoverImage}
                  />
                  {/* <ImageUploader
                    withIcon={false}
                    withPreview={true}
                    buttonText="Choose cover image"
                    onChange={onCoverImage}
                    imgExtension={['.jpg', '.png']}
                    maxFileSize={5242880}
                  /> */}
                </FormGroup>
                {errors.profile_image && errors.profile_image !== undefined && (
                  <span className="errorMessage"> {errors.profile_image} </span>
                )}
              </Col>
            </Row>
            <Button type="submit" className="success">
              Submit
            </Button>
          </Form>

          <div className="rna-wrapper">
            <NotificationAlert ref={notifAlert} />
          </div>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setAddModal(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default RestaurantDashboard;
