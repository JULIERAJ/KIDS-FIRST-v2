import React from 'react';

import PendingEvents from './PendingEvents'; // Import PendingEvents component

const HomeDashboard = () => {
 
  return (
    <div className="dashboard">
      {/* Pending Events */}
      <PendingEvents />
    </div>
  );
};

export default HomeDashboard;
