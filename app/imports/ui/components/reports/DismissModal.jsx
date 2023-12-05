import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Reports } from '../../../api/reports/Reports';

const DismissModal = ({ show, handleClose, report }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Dismiss</Modal.Title>
    </Modal.Header>
    <Modal.Body>{`Are you sure you want to dismiss the report for ${report.itemName}?`}</Modal.Body>
    <Modal.Footer>
      <Button
        variant="danger"
        onClick={() => {
          Reports.collection.remove(report._id);
          handleClose();
        }}
      >
        Dismiss
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
);

DismissModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  report: PropTypes.shape({
    itemName: PropTypes.string,
    _id: PropTypes.string,
    reportingUser: PropTypes.string,
  }).isRequired,
};

export default DismissModal;
