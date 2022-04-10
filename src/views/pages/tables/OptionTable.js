import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'reactstrap';
import OptionModal from '../variations/OptionModal';

function OptionTable() {
  const [options, setOptions] = useState([]);
  const id = useSelector((state) => state.currentRestaurantReducer);
  const [optionModal, setOptionModal] = useState(false);

  let isMounted = true;
  useEffect(() => {
    if (localStorage.getItem('id')) {
      if (isMounted) {
        console.log('OptionTable');
        getOptions();
      }
    }

    return () => (isMounted = false);
  }, []);

  const getOptions = () => {
    console.log('OptionTable');
    let token = localStorage.getItem('token');
    let URL = '';

    URL = `http://menuof.test/api/resturant-owner/resturant/${id.payload}/food/options`;
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
  const ModalOpen = (e) => {
    setOptionModal(true);
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

      <Button onClick={(e) => ModalOpen(e)}>New </Button>
      <Button>Cancel </Button>

      {/* Food Option Modal for assigning Group options */}
      <Modal
        size="lg"
        isOpen={optionModal}
        toggle={() => setOptionModal(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-body">
          <OptionModal></OptionModal>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setOptionModal(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default OptionTable;
