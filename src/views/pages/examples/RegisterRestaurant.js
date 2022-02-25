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
import AuthHeader from 'components/Headers/AuthHeader.js';
import { useHistory } from 'react-router-dom';
function RegisterRestaurant() {
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
  //   let success = true;
  if (success) {
    history.push('/admin/dashboard');
  }

  return <div>RegisterRestaurant</div>;
}

export default RegisterRestaurant;
