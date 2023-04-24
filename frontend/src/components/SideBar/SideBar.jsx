import PropTypes from 'prop-types';
import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = ({ onSectionChange }) => {
  const handleItemClick = (section) => {
    onSectionChange(section);
  };

  return (
    <Nav defaultActiveKey="Dashboard" className="flex-column">
      <Nav.Item>
        <Nav.Link
          eventKey="Dashboard"
          onClick={() => handleItemClick('Dashboard')}
        >
          Dashboard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="Calendar"
          onClick={() => handleItemClick('Calendar')}
        >
          Calendar
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Message" onClick={() => handleItemClick('Message')}>
          Message
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Album" onClick={() => handleItemClick('Album')}>
          Album
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="Kid's Info"
          // eslint-disable-next-line quotes
          onClick={() => handleItemClick("Kid's Info")}
        >
          Kid&apos;s Info
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

Sidebar.propTypes = {
  onSectionChange: PropTypes.func.isRequired,
};

export default Sidebar;
