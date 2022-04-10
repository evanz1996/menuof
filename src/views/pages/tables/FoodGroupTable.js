import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'reactstrap';
import FoodOptionGroupModal from '../variations/FoodOptionGroupModal';
function FoodGroupTable() {
  const [options, setOptions] = useState([]);
  const id = useSelector((state) => state.currentRestaurantReducer);
  const [optionGroup, setOptionGroup] = useState(false);
  const [columns, setColumns] = useState([
    { dataField: 'Title', text: '', sort: true },
  ]);
  console.log('options rest', id);
  let isMounted = true;

  useEffect(() => {
    if (localStorage.getItem('id')) {
      if (isMounted) {
        console.log('OptionTable');
        getGroupOptions();
      }
    }

    return () => (isMounted = false);
  }, []);

  const getGroupOptions = () => {
    console.log('OptionTable');
    let token = localStorage.getItem('token');
    let URL = '';

    URL = `http://menuof.test/api/resturant-owner/food/options/1/groups`;
    console.log(URL);
    var config = {
      method: 'get',

      url: URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log('here at axios OptionTable');
        if (isMounted) {
          console.log(response);
          setOptions(response.data);
          console.log('OptionTable', options);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {options.map((option) => (
            <tr key={option.id}>
              <td>{option.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={(e) => setOptionGroup(true)}>New </Button>
      <Button>Cancel </Button>
      <Modal
        size="lg"
        isOpen={optionGroup}
        toggle={() => setOptionGroup(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-body">
          <FoodOptionGroupModal></FoodOptionGroupModal>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setOptionGroup(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default FoodGroupTable;
