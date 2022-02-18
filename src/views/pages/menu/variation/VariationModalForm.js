import React, { useState } from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
  Card,
  CardBody,
  CardTitle,
  Label,
} from 'reactstrap';
import AddRemoveInputField from 'views/pages/addRemoveInputField/AddRemoveInputField';
function VariationModalForm() {
  // const [formValues, setFormValues] = useState([
  //   { groupname: '', guy: '', maxChoices: 0 },
  // ]);

  const [formValues, setFormValues] = useState([{ name: '', email: '' }]);

  const [formGroupValues, setformGroupValues] = useState([
    { groupName: '', groupOptions: '', maxChoices: 0 },
  ]);

  let addFormFields = () => {
    setFormValues([...formValues, { itemName: '', itemPrice: 0 }]);
  };
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let removeFormFields = (i) => {
    console.log('index', i);
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  //group
  let addGroupFields = () => {
    console.log('i am here bro');
    setformGroupValues([
      ...formGroupValues,
      { groupName: '', groupOptions: '', maxChoices: 0 },
    ]);
    console.log(formGroupValues);
  };
  let handleGroupChange = (i, e) => {
    let newFormValues = [...formGroupValues];
    newFormValues[i][e.target.name] = e.target.value;
    setformGroupValues(newFormValues);
  };
  let removeGroupFormFields = (i) => {
    console.log('index', i);
    let newFormValues = [...formGroupValues];
    newFormValues.splice(i, 1);
    setformGroupValues(newFormValues);
  };

  return (
    <>
      <Container className="mt--6" fluid>
        <strong> Variants Management</strong>
        <br />

        <Card>
          <CardBody>
            <CardTitle>Name Variation</CardTitle>
            <FormGroup className="row">
              <Col md="10">
                <Input
                  id="variationName"
                  type="text"
                  placeholder="Ex: Variation Pizza"
                />
              </Col>
            </FormGroup>
          </CardBody>
        </Card>

        <Form>
          <Card>
            {formGroupValues.map((input, index) => (
              <div key={index}>
                <CardBody>
                  <CardTitle> Group </CardTitle>

                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-control-label">Group name</label>
                        {/* <Input required type="text" placeholder="eg: Dough" /> */}
                        <Input
                          type="text"
                          name="name"
                          value={input.groupName || ''}
                          onChange={(e) => handleGroupChange(index, e)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-control-label"> Options</label>
                        <Input
                          className="form-control"
                          id="sel1"
                          type="select"
                          name="options"
                          value={input.groupOptions || ''}
                          onChange={(e) => handleGroupChange(index, e)}
                        >
                          <option value="1">Multiple Choice</option>
                          <option value="2">Alternative Choice </option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <label className="form-control-label">
                          Max Choices
                        </label>
                        <Input
                          type="numbers"
                          name="maxChoices"
                          value={input.maxChoices || ''}
                          onChange={(e) => handleGroupChange(index, e)}
                        ></Input>

                        {index ? (
                          <Button
                            type="button"
                            className="ni ni-fat-remove"
                            onClick={() => removeGroupFormFields(index)}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <Button
                        className="button add"
                        type="button"
                        color="info"
                        onClick={() => addFormFields()}
                      >
                        Add Item
                      </Button>
                    </Col>
                  </Row>
                  <br></br>
                  {formValues.map((element, index) => (
                    <div key={index}>
                      <Row>
                        <Col md="4">
                          <Input
                            placeholder="integral"
                            type="text"
                            name="itemName"
                            value={element.itemName || ''}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </Col>

                        <Col md="4">
                          <Input
                            placeholder="€"
                            type="number"
                            name="itemPrice"
                            value={element.itemPrice || ''}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </Col>
                        <Col md="4">
                          <Button
                            type="button"
                            color="calm"
                            className="ni ni-fa-trash-can"
                            onClick={() => removeFormFields(index)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </CardBody>
              </div>
            ))}
          </Card>
        </Form>

        <Button
          className="button add primary"
          color="success"
          type="button"
          onClick={() => addGroupFields()}
        >
          Add New Group
        </Button>
      </Container>
    </>
  );
}

export default VariationModalForm;
