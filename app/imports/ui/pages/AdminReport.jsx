import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Reports } from '../../api/reports/Reports';
import ReportsTable from '../components/reports/ReportsTable';
import SideBar from '../components/SideBar';

const AdminReports = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [reports, setReports] = useState([]);

  useTracker(() => {
    const subscription = Meteor.subscribe(Reports.adminPublicationName);
    if (subscription.ready()) {
      const filterCondition = selectedFilter ? { status: selectedFilter } : {};
      const reportsDocs = Reports.collection.find(filterCondition).fetch();
      setReports(reportsDocs);
    }
  }, [selectedFilter]);

  useEffect(() => {
    document.title = 'Your Site - Admin Reports';
  }, []);

  const deleteReport = (reportId) => {
    Meteor.call('reports.delete', reportId, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error('Error deleting report:', error);
      } else {
        // Remove the deleted report from the state
        setReports(reports.filter((report) => report._id !== reportId));
      }
    });
  };

  const renderReports = (report) => (
    <Col key={report._id} md={4} className="mb-4">
      <Card>
        <Card.Body>
          <ReportsTable report={report} onDelete={deleteReport} />
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <Container fluid>
      <Row>
        <Col xs={3}>
          <SideBar onFilterChange={setSelectedFilter} />
        </Col>
        <Col xs={9} className="py-3">
          <Row className="justify-content-center">
            <Col md={8}>
              <Col className="text-center ml-5">
                <h2>Admin Reports</h2>
              </Col>
              <Row>
                {reports.map((report) => {
                  // Only render the report if it's not deleted
                  if (!report.deleted) {
                    return renderReports(report);
                  }
                  return null;
                })}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminReports;
