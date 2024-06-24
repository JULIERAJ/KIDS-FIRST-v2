import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MessageNotification from "./MessageNotification"; // Import MessageNotification component
import PendingEvents from "./PendingEvents"; // Import PendingEvents component
import WeeksOverview from "./WeeksOverview"; // Import WeeksOverview component

const HomeDashboard = () => {
  return (
    <Container fluid>
      <Row>
        {/* Weeks Overview */}
        <WeeksOverview />
      </Row>

      <Row style={{marginTop : 40}}>
        {/* Pending Events */}
        <Col  >
          <PendingEvents />
        </Col>
         {/* Message Notification */}
        <Col  >
          <MessageNotification />
        </Col>
      </Row>

    </Container>
  );
};

export default HomeDashboard;
