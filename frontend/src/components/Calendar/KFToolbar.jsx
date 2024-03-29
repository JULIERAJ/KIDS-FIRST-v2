import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';

import './kidsCircles.css';
import EventContext from './EventContext';
import events from './events';

const KFToolbar = ({ onView, label, views, onNavigate }) => {
  
  const { setFilteredEventsData } = useContext(EventContext);

  const [selectedChildren, setSelectedChildren] = useState([]);

  const handleFilterEvents = (kidName) => {
    let updatedChildren;

    if (selectedChildren.includes(kidName)) {
      // If already selected, remove from selectedChildren
      updatedChildren = selectedChildren.filter(child => child !== kidName);
    } else {
      // If not selected, add to selectedChildren
      updatedChildren = [...selectedChildren, kidName];
    }

    // Filter events based on selectedChildren
    const filteredEvents = events.filter(event => updatedChildren.includes(event.kidsName));
    setFilteredEventsData(filteredEvents);

    setSelectedChildren(updatedChildren);
  };
  // Get unique kid names
  const uniqueKidNames = Array.from(new Set(events.map(event => event.kidsName)));

  return (
    <div className="KF-toolbar" >
      <em> ~ Custom toolbar ~ </em>

      <div className="toolbar">
        <div className="rbc-btn-group">
          <button type="button" onClick={() => onNavigate('PREV')}>
                back
          </button>
          <button type="button" onClick={() => onNavigate('NEXT')}>
                next
          </button>
        </div>

        <div className="rbc-toolbar-label">{label}</div>

        <div className="rbc-btn-group">
          {views.map((view) => (
            <button key={view} type="button" onClick={() => onView(view)}>
              {view}
            </button>
          ))}
          <button className="create">Create</button>
        </div>
      </div>

      {/* Container for kid events */}
      <div className="kid-events-container">
        {/* Iterate over unique kid names and create circles */}
        {uniqueKidNames.map((kidName, index) => {
          // Find the first event with the current kid's name
          const event = events.find(event => event.kidsName === kidName);
          return event ? (
            <div className="wrapper" key={index}>
              <div className="circle" style={{ backgroundColor: event.color }}>
                <span className='initial'> {kidName.charAt(0)} </span>
              </div>
              <div className="info-wrapper">
                <p className="kid-name">{kidName}</p>
                {/* Toggle button */}
                <button className="toggle-event-button" onClick={() => handleFilterEvents(kidName)} 
                > {selectedChildren.includes(kidName) ? <AiOutlineClose /> : <FiPlus /> }</button>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

// Prop types validation
KFToolbar.propTypes = {
  onView: PropTypes.func,
  label: PropTypes.string,
  views: PropTypes.array,
  onNavigate: PropTypes.func,
};

export default KFToolbar;
