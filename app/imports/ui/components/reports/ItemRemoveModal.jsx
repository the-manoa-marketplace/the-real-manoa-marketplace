import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Flag } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, HiddenField } from 'uniforms-bootstrap5';
import { Listings } from '../../../api/listing/Listing';
import { Reports } from '../../../api/reports/Reports';

const bridge = new SimpleSchema2Bridge(Reports.schema);

const ItemRemoveModal = ({ show, handleClose, report }) => {
  const submit = (data) => {
    const { closed } = data;
    Listings.collection.remove(report.itemId);
    Reports.collection.update(report._id, { $set: { closed } }, (error) => (
      error
        ? swal('Error', error.message, 'error')
        : swal('Success', 'Report has been resolved', 'success')
    ));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <AutoForm schema={bridge} onSubmit={(data) => submit(data)} model={report}>
        <Modal.Header closeButton>
          <Modal.Title><Flag /></Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Are you sure you want to delete ${report.itemName}?`}</Modal.Body>
        <HiddenField name="closed" value="true" />
        <ErrorsField />
        <Modal.Footer>
          <Button type="submit" variant="dark">Remove</Button>
          <Button variant="outline-dark" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </AutoForm>
    </Modal>
  );
};

ItemRemoveModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  report: PropTypes.shape({
    itemName: PropTypes.string,
    itemId: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ItemRemoveModal;
