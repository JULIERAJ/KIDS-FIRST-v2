import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [filteredEventsData, setFilteredEventsData] = useState([]);

  return (
    <EventContext.Provider value={{ filteredEventsData, setFilteredEventsData }}>
      {children}
    </EventContext.Provider>
  );
};
EventProvider.propTypes = {
  children: PropTypes.node,
};
export default EventContext;
