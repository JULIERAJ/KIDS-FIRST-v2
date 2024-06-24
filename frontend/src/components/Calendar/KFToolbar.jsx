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

const KFToolbar = ({
  activeView,
  setActiveView,
  onView,
  label,
  views,
  onNavigate,
  handleCreateButtonClick,
}) => {
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
      updatedChildren = selectedChildren.filter((child) => child !== kidName);
    } else {
      // If not selected, add to selectedChildren
      updatedChildren = [...selectedChildren, kidName];
    }

    // Filter events based on selectedChildren
    const filteredEvents = events.filter((event) =>
      updatedChildren.includes(event.kidsName)
    );
    setFilteredEventsData(filteredEvents);

    setSelectedChildren(updatedChildren);
  };

  // Get unique kid names
  const uniqueKidNames = Array.from(
    new Set(events.map((event) => event.kidsName))
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className='KF-toolbar'>
      <div className='toolbar'>
        <div className='rbc-btn-group'>
          <button
            type='button'
            onClick={() => onNavigate('PREV')}
            style={{
              background: '#D6D9D9',
              width: '35px',
              height: '35px',
              border: 'none',
              borderRadius: '50px',
            }}>
            <span>&lt;</span>
          </button>
          <button
            type='button'
            onClick={() => onNavigate('NEXT')}
            style={{
              background: '#D6D9D9',
              width: '35px',
              height: '35px',
              border: 'none',
              borderRadius: '50px',
            }}>
            <span>&gt;</span>
          </button>
        </div>

        <div className='rbc-toolbar-label'>{label}</div>

        {/* Container for buttons */}
        <div className='buttonsContainer'>
          {/* Big button */}
          <div className='bigButtonContainer'>
            <button
              onClick={handleCreateButtonClick}
              className='styles.bigButton'
              style={{ border: '2px solid #EB7005' }}>
              {/* smaller buttons inside big button */}
              <div className='smallButtonsContainer'>
                {views.map((view) => (
                  <button
                    key={view}
                    type='button'
                    onClick={() => handleViewButtonClick(view)}
                    className={`controlButton 
                      ${activeView === view ? 'active' : ''}`}
                    style={{
                      backgroundColor:
                        activeView === view ? '#FCFCFC' : 'transparent',
                      color: activeView === view ? '#EB7005' : '',
                      border:
                        activeView === view ? '2px solid #EB7005' : 'none',
                    }}>
                    {/* Change button text based on view */}
                    {view === 'day'
                      ? 'Daily'
                      : view === 'week'
                      ? 'Weekly'
                      : 'Monthly'}
                  </button>
                ))}
              </div>
            </button>
          </div>
          {/* Create button */}
          <button
            onClick={() => {
              openModal();
              handleCreateButtonClick();
            }}
            className='createButton'>
            Create&nbsp;
            <div style={{ width: '8px', height: '8px', marginBottom: '20px' }}>
              <FiPlus />
            </div>
          </button>
        </div>
      </div>

      {/* Container for kid events */}
      <div className='kid-events-container'>
        {/* Iterate over unique kid names and create circles */}
        {uniqueKidNames.map((kidName, index) => {
          // Find the first event with the current kid's name
          const event = events.find((event) => event.kidsName === kidName);
          return event ? (
            <div className='wrapper' key={index}>
              <div className='circle' style={{ backgroundColor: event.color }}>
                <span className='initial'>{kidName.charAt(0)}</span>
              </div>
              <div className='info-wrapper'>
                <p className='kid-name'>{kidName}</p>
                {/* Toggle button */}
                <button
                  className='toggle-event-button'
                  onClick={() => handleFilterEvents(kidName)}>
                  {' '}
                  {selectedChildren.includes(kidName) ? (
                    <AiOutlineClose />
                  ) : (
                    <FiPlus />
                  )}
                </button>
              </div>
            </div>
          ) : null;
        })}
      </div>
      {isModalOpen && <EventModal onClose={closeModal} />}
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
