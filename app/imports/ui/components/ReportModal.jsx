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
    const { report } = data;
    const reportData = {
      report,
      itemName: item.listingTitle,
      itemId: item._id,
      owner: item.owner,
      createdAt: new Date(),
      closed: false,
    };
    console.log(reportData);
    Meteor.call('ReportsCollectionInsert', reportData, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Report has been submitted', 'success').then(() => {
          formRef.current.reset();
          handleClose();
        });
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <AutoForm ref={formRef} schema={bridge} onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title><Flag /> Report Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LongTextField name="report" placeholder="Describe the issue" />
          <ErrorsField />
        </Modal.Body>
        <Modal.Footer>
          <SubmitField value="Submit Report" />
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </AutoForm>
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
