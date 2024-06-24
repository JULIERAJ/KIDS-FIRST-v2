/* eslint-disable indent */
/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';

import './kidsCircles.css';
import EventContext from './EventContext';
import events from './events';

import EventModal from '../EventModal/EventModal';
import './headerStyles.css';

const KFToolbar = ({ activeView, setActiveView, onView, label, views, onNavigate, handleCreateButtonClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewButtonClick = (view) => {
    setActiveView(view);
    onView(view);
  };

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
  const uniqueKidNames = events.reduce((acc, event) => {
    if (!acc.some(e => e.kidsName === event.kidsName)) {
      acc.push({ kidsName: event.kidsName, eventId: event.id });
    }
    return acc;
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="KF-toolbar">
      <div className="toolbar">
        <div className="rbc-btn-group">
          <button type="button" onClick={() => onNavigate('PREV')}
            style={{ background: '#D6D9D9', width: '35px', height: '35px', border: 'none', borderRadius: '50px' }}>
            <span>&lt;</span>
          </button>
          <button type="button" onClick={() => onNavigate('NEXT')}
            style={{ background: '#D6D9D9', width: '35px', height: '35px', border: 'none', borderRadius: '50px' }}>
            <span>&gt;</span>
          </button>
        </div>

        <div className="rbc-toolbar-label" >{label}</div>

        {/* Container for buttons */}
        <div className="buttonsContainer">
          {/* Big button */}
          <div className="bigButtonContainer">
            <div onClick={handleCreateButtonClick} className="bigButton"
              style={{ border: '2px solid #EB7005' }}>
              {/* smaller buttons inside big button */}
              <div className="smallButtonsContainer">
                {views.map((view) => (
                  <button key={view} type="button" onClick={() =>
                    handleViewButtonClick(view)} className={`controlButton 
                      ${activeView === view ? 'active' : ''}`} style={{
                      backgroundColor: activeView === view ? '#FCFCFC' : 'transparent', color: activeView === view ?
                        '#EB7005' : '', border: activeView === view ?
                          '2px solid #EB7005' : 'none'
                    }}>
                    {/* Change button text based on view */}
                    {view === 'day' ? 'Daily' : view === 'week' ? 'Weekly' : 'Monthly'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Create button */}
          <button onClick={() => { openModal(); handleCreateButtonClick(); }} className="createButton">
            Create&nbsp;
            <div style={{ width: '8px', height: '8px', marginBottom: '20px' }}>
              <FiPlus />
            </div>
          </button>
        </div>
      </div>

      {/* Container for kid events */}
      <div className="kid-events-container">
        {/* Iterate over unique kid names and create circles */}
        {uniqueKidNames.map(({ eventId, kidsName }) => {
          // Find the first event with the current kid's name
          const event = events.find(event => event.kidsName === kidsName);
          return event ? (
            <div className="wrapper" key={eventId}>
              <div className="circle" style={{ backgroundColor: event.color }}>
                <span className='initial'>{kidsName.charAt(0)}</span>
              </div>
              <div className="info-wrapper">
                <p className="kid-name">{kidsName}</p>
                {/* Toggle button */}
                <button className="toggle-event-button" onClick={() =>
                  handleFilterEvents(kidsName)}> {selectedChildren.includes(kidsName) ?
                    <AiOutlineClose /> : <FiPlus />}</button>
              </div>
            </div>
          ) : null;
        })}
      </div>

      {isModalOpen && <EventModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

// Prop types validation
KFToolbar.propTypes = {
  activeView: PropTypes.string.isRequired,
  setActiveView: PropTypes.func.isRequired,
  onView: PropTypes.func,
  label: PropTypes.string,
  views: PropTypes.array,
  onNavigate: PropTypes.func,
  handleCreateButtonClick: PropTypes.func,
};

export default KFToolbar;
