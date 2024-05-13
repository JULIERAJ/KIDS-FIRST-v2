import React from 'react';

import PendingEvents from './PendingEvents'; // Import PendingEvents component
import WeeksOverview from './WeeksOverview'; // Import WeeksOverview component

const HomeDashboard = () => {
  return (
    <div className="dashboard">
      {/* Pending Events */}
      <WeeksOverview />
      {/* Pending Events */}
      <PendingEvents />
    </div>
  );
};

export default HomeDashboard;
