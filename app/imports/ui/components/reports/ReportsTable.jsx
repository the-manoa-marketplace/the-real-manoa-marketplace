import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import ItemRemoveModal from './ItemRemoveModal';
import DismissModal from './DismissModal';

const ReportsTable = ({ report }) => {
  const [showReport, setShowReport] = useState(false);
  const handleClose = () => setShowReport(false);
  const handleShow = () => setShowReport(true);

  const [showDismiss, setShowDismiss] = useState(false);
  const handleDismissClose = () => setShowDismiss(false);
  const handleDismissOpen = () => setShowDismiss(true);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title><b>ITEM:</b> {report.itemName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <b>OWNER:</b> {report.owner}
        </Card.Subtitle>
        <Card.Text>
          <br />
          <b>REPORT DESCRIPTION:</b>
          <br />
          {report.report}
        </Card.Text>
        <div className="d-flex justify-content-end">
          <Button onClick={handleShow} variant="danger" className="me-2">Delete</Button>
          <Button onClick={handleDismissOpen} variant="secondary">Dismiss</Button>
        </div>
      </Card.Body>
      <ItemRemoveModal handleClose={handleClose} report={report} show={showReport} />
      <DismissModal handleClose={handleDismissClose} report={report} show={showDismiss} />
    </Card>
  );
};

ReportsTable.propTypes = {
  report: PropTypes.shape({
    owner: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    report: PropTypes.string.isRequired,
    closed: PropTypes.bool,
  }).isRequired,
};

export default ReportsTable;
