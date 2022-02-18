import React, { useState } from 'react';
import { Input } from 'reactstrap';
function AddRemoveInputField() {
  const [inputFieldsGroup, setInputFieldsGroup] = useState([
    {
      groupName: '',
      guy: '',
      maxChoices: 0,
    },
  ]);

  const addInputField = () => {
    setInputFieldsGroup([
      ...inputFieldsGroup,
      {
        fullName: '',
        guy: '',
        maxChoices: 0,
      },
    ]);
  };

  const removeInputFields = (index) => {
    const rows = [...inputFieldsGroup];
    rows.splice(index, 1);
    setInputFieldsGroup(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFieldsGroup];
    list[index][name] = value;
    setInputFieldsGroup(list);
  };
  return (
    <div>
      AddRemoveInputField
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            {inputFieldsGroup.map((data, index) => {
              const { fullName, guy, maxChoices } = data;
              return (
                <div className="row my-3" key={index}>
                  <div className="col">
                    <div className="form-group">
                      <Input
                        type="text"
                        onChange={(evnt) => handleChange(index, evnt)}
                        value={fullName}
                        name="fullName"
                        className="form-control"
                        placeholder="Full Name"
                      ></Input>

                      <Input id="guy" type="select" name="guy" value="guy">
                        <option value="1">Multiple Choice</option>
                        <option value="2">Alternative Choice</option>
                      </Input>
                      <Input
                        type="number"
                        onChange={(evnt) => handleChange(index, evnt)}
                        value={maxChoices}
                        name="maxChoices"
                        className="form-control"
                        placeholder="Max Choices"
                      ></Input>
                    </div>
                  </div>

                  <div className="col">
                    {inputFieldsGroup.length !== 1 ? (
                      <button
                        className="btn btn-outline-danger"
                        onClick={removeInputFields}
                      >
                        x
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              );
            })}

            <div className="row">
              <div className="col-sm-12">
                <button
                  className="btn btn-outline-success "
                  onClick={addInputField}
                >
                  Add New
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
}

export default AddRemoveInputField;
