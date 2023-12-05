// ReportModal.jsx
import React, { useRef } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Modal } from 'react-bootstrap';
import { Flag } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const formSchema = new SimpleSchema({
  report: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const ReportModal = ({ show, handleClose, item }) => {
  const formRef = useRef(null);

  const submit = (data) => {
    const reportData = {
      report: data.report,
      itemName: item.listingTitle, // assuming item object has a listingTitle
      itemId: item._id, // assuming item object has a unique _id
      owner: item.owner, // assuming item object has an owner field
      createdAt: new Date(),
      closed: false,
    };

    // Call the Meteor method to insert the report
    Meteor.call('ReportsCollection.insert', reportData, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Your report has been submitted.', 'success');
        formRef.current.reset();
        handleClose();
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><Flag /> Report Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AutoForm ref={formRef} schema={bridge} onSubmit={submit}>
          <LongTextField name="report" placeholder="Describe the issue" />
          <ErrorsField />
        </AutoForm>
      </Modal.Body>
      <Modal.Footer>
        <SubmitField value="Submit Report" />
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ReportModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.shape({
    listingTitle: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReportModal;
