import React from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Col,
} from 'reactstrap';
function RestaurantSettingsForm() {
  return (
    <div>
      <Card>
        <CardBody>
          <hr />
          <Form>
            <div className="form-row">
              <Col className="mb-8" md="8">
                <FormGroup className="has-success">
                  <label
                    className="form-control-label"
                    htmlFor="validationServer01"
                  >
                    Name
                  </label>
                  <Input
                    className="is-valid"
                    defaultValue="Mark"
                    id="validationServer01"
                    placeholder="First name"
                    required
                    type="text"
                  />
                  <div className="valid-feedback">Looks good!</div>
                </FormGroup>
              </Col>
              <Col className="mb-3" md="4">
                <FormGroup className="has-success">
                  <label
                    className="form-control-label"
                    htmlFor="validationServer02"
                  >
                    Telephone
                  </label>
                  <Input
                    className="is-valid"
                    defaultValue="Otto"
                    id="validationServer02"
                    placeholder="Last name"
                    required
                    type="text"
                  />
                  <div className="valid-feedback">Looks good!</div>
                </FormGroup>
              </Col>
            </div>
            <div className="form-row">
              <Col className="mb-8" md="8">
                <FormGroup className="has-danger">
                  <label
                    className="form-control-label"
                    htmlFor="validationServer03"
                  >
                    Description
                  </label>
                  <Input
                    className="is-invalid"
                    id="validationServer03"
                    placeholder="City"
                    required
                    type="text-area"
                  />
                  <div className="invalid-feedback">
                    Please provide a valid city.
                  </div>
                </FormGroup>
              </Col>
              <Col className="mb-3" md="3">
                <FormGroup className="has-danger">
                  <label
                    className="form-control-label"
                    htmlFor="validationServer04"
                  >
                    State
                  </label>
                  <Input
                    className="is-invalid"
                    id="validationServer04"
                    placeholder="State"
                    required
                    type="text"
                  />
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </FormGroup>
              </Col>
              <Col className="mb-3" md="3">
                <FormGroup className="has-danger">
                  <label
                    className="form-control-label"
                    htmlFor="validationServer05"
                  >
                    Zip
                  </label>
                  <Input
                    className="is-invalid"
                    id="validationServer05"
                    placeholder="Zip"
                    required
                    type="text"
                  />
                  <div className="invalid-feedback">
                    Please provide a valid zip.
                  </div>
                </FormGroup>
              </Col>
            </div>
            <FormGroup className="has-danger">
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input is-invalid"
                  defaultValue=""
                  id="invalidCheck3"
                  required
                  type="checkbox"
                />
                <label className="custom-control-label" htmlFor="invalidCheck3">
                  Agree to terms and conditions
                </label>
                <div className="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
            </FormGroup>
            <Button color="primary" type="submit">
              Submit form
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default RestaurantSettingsForm;
