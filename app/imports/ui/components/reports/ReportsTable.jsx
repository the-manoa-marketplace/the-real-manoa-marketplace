import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';
import ItemRemoveModal from './ItemRemoveModal';
import DismissModal from './DismissModal';

/** Renders a single row in the List Stuff (Admin) table */
const ReportsTable = ({ report }) => {
  const [showReport, setShowReport] = useState(false);
  const handleClose = () => setShowReport(false);
  const handleShow = () => setShowReport(true);

  const [showDismiss, setShowDismiss] = useState(false);
  const handleDismissClose = () => setShowDismiss(false);
  const handleDismissOpen = () => setShowDismiss(true);

  return (
    <Col className="py-3" style={{ borderBottom: '2px solid #ECECEC' }}>
      <Row xs={12} className="d-flex justify-content-between">
        <Col xs={12} lg={8}>
          <div className="h5"><b>ITEM:</b>&nbsp;&nbsp;&nbsp;{report.itemName}</div>
          <div className="h5"><b>OWNER:</b>&nbsp;&nbsp;&nbsp;{report.owner}</div>
          <div className="h5"><b>REPORT DESCRIPTION:</b></div>
          <div>{report.report}</div>
        </Col>
        <Col lg={2} className="d-flex justify-content-end">
          <Button onClick={handleShow} variant="danger">Delete</Button>
          <Button onClick={handleDismissOpen} variant="dark">Dismiss</Button>
        </Col>
      </Row>
      <ItemRemoveModal handleClose={handleClose} report={report} show={showReport} />
      <DismissModal handleClose={handleDismissClose} report={report} show={showDismiss} />
    </Col>
  );
};

// Require a document to be passed to this component.
ReportsTable.propTypes = {
  report: PropTypes.shape({
    owner: PropTypes.string,
    itemName: PropTypes.string,
    itemId: PropTypes.string,
    report: PropTypes.string,
    closed: PropTypes.bool,
  }).isRequired,
};

export default ReportsTable;
