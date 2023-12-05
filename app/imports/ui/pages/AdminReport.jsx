import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Reports } from '../../api/reports/Reports'; // Ensure this path is correct
import ReportsTable from '../components/reports/ReportsTable'; // Ensure this component exists
import LoadingSpinner from '../components/LoadingSpinner';
import SideBar from '../components/SideBar'; // If you have a sidebar for the admin panel

const AdminReports = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  // useTracker connects Meteor data to React components.
  const { ready, reports } = useTracker(() => {
    const subscription = Meteor.subscribe(Reports.adminPublicationName);
    const rdy = subscription.ready();

    // Here you might want to apply a filter based on the selectedFilter
    const filterCondition = selectedFilter ? { status: selectedFilter } : {}; // Adjust as per your requirements

    const reportsDocs = Reports.collection.find(filterCondition).fetch();
    return {
      reports: reportsDocs,
      ready: rdy,
    };
  }, [selectedFilter]);

  useEffect(() => {
    document.title = 'Your Site - Admin Reports'; // Change 'Your Site' to your actual site name
  }, []);

  // This is a placeholder. Ensure you create a UI component for displaying reports.
  const renderReports = (report) => (
    <Col key={report._id} md={4} className="mb-4">
      <Card>
        <Card.Body>
          {/* Your ReportsTable component should be designed to display report details */}
          <ReportsTable report={report} />
        </Card.Body>
      </Card>
    </Col>
  );

  return ready ? (
    <Container fluid>
      <Row>
        {/* Sidebar if needed for the admin panel */}
        <Col xs={3}>
          <SideBar onFilterChange={setSelectedFilter} />
        </Col>
        {/* Main content */}
        <Col xs={9} className="py-3">
          <Row className="justify-content-center">
            <Col md={8}>
              <Col className="text-center ml-5">
                <h2>Admin Reports</h2>
              </Col>
              <Row>
                {/* Map through reports and render them */}
                {reports.map(renderReports)}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default AdminReports;
