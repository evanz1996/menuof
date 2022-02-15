import React, { useState } from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
  Modal,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';
function VariationModalForm() {
  const [formValues, setFormValues] = useState([{ name: '', email: '' }]);

  const addFormFields = () => {
    setFormValues([...formValues, { name: '', email: '' }]);
  };
  return (
    <div>
      <Container className="mt--6" fluid>
        <Card className="bg-secondary border-0 mb-0">
          <strong> Variants Management</strong>
        </Card>
        <Card>
          <Form>
            <CardBody>
              <CardTitle>Name Variation</CardTitle>
              <CardText>
                <FormGroup className="row">
                  <Col md="10">
                    <Input
                      id="variationName"
                      type="text"
                      placeholder="Ex: Variation Pizza"
                    />
                  </Col>
                </FormGroup>
              </CardText>

              <CardTitle> Group </CardTitle>
              <Row>
                <Col md="4">
                  <FormGroup>
                    <label className="form-control-label">Group name</label>
                    <Input required type="text" placeholder="eg: Dough" />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label className="form-control-label"> Guy</label>
                    <Input name="guy" type="select">
                      <option value="1">Multiple Choice</option>
                      <option value="2">Alternative Choice </option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label className="form-control-label">Max Choices</label>
                    <Input name="maxChoices" type="number"></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Button type="button" onClick={() => addFormFields()}>
                  {' '}
                  Add Item
                </Button>
              </Row>
            </CardBody>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default VariationModalForm;
