import PropTypes from 'prop-types';
import React from 'react';
import './HomeDashboard.css';

import decline from '../../media/icons/Thumbs down.png';

import accept from '../../media/icons/Thumbs up.png';

//////
const getColorForBackground = (name) => {
  // Check if name is valid (not null or undefined)
  if (name && typeof name === 'string' && name.length > 0) {
    const colorsBackground = {
      A: 'rgba(255, 214, 102, 0.5)',
      B: 'rgba(255, 107, 109, 0.5)',
      C: 'rgba(213, 202, 235, 0.5)',
      E: 'rgba(0, 0, 0, 0.5)',
    };
    return colorsBackground[name.charAt(0).toUpperCase()] || 'rgba(0, 0, 0, 0)';
  } else {
    // Handle invalid name (e.g., return a default color)
    return 'rgba(0, 0, 0, 0)';
  }
};

export const DayEvent = ({ event }) => {
  const { title, color, kidsName, image, image2, timing } = event;
  const commonStyle = {
    borderRadius: '0px 7px 7px 0px',
  };

  const circleStyle = {
    ...commonStyle,
    width: '27px',
    height: '27px',
    backgroundColor: color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '15px',
    color: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: '5px',
    marginTop: '15px',
  };

  const titleStyle = {
    ...commonStyle,
    fontFamily: 'Roboto',
    color: '#081821',
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '18.75px',
    textAlign: 'left',
    marginLeft: '15px',
    position: 'absolute',
    top: '-8px',
    marginTop: '20px',
  };

  const contentWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginLeft: '25px',
    marginTop: '2px',
  };

  const timingStyle = {
    fontSize: '12px',
    color: '#011D26',
    fontWeight: 200,
    lineHeight: '16.41px',
    textAlign: 'center',
  };

  const boxStyle = {
    backgroundColor: getColorForBackground(kidsName),
    border: '0px',
    borderLeft: `3px solid ${color}`,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '5px',
    position: 'relative',
    top: 0,
    left: 0,
    start: 'top',
  };

  return (
    <>
      <div className="event-box" style={boxStyle}>
        <div style={contentWrapperStyle}>
          <div className="title" style={titleStyle}>
            {title && <span>{title} </span>}
          </div>
          {/* Container for image icons */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* First image icon 
                    <ManagePendingEvent>*/}
            <img
              src={image}
              alt="icon"
              style={{ marginLeft: '85%', marginRight: '15px' }}
            />
            {/*</ManagePendingEvent>*/}
            {/* Second image icon */}
            <img src={image2} alt="icon" />
          </div>
          <div style={timingStyle}>
            {timing && <span style={{ marginLeft: '63%' }}>{timing}</span>}
          </div>
        </div>
        <span className="circle" style={circleStyle}>
          {kidsName && kidsName.charAt(0).toUpperCase()}
        </span>
      </div>
    </>
  );
};
DayEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    kidsName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    image2: PropTypes.string.isRequired,
    timing: PropTypes.string.isRequired,
  }).isRequired,
};

export const DayViewHeader = ({ date }) => {
  const formatDate = (date) => {
    const options = { weekday: 'short', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  return <div>{formatDate(date)}</div>;
};

DayViewHeader.propTypes = {
  date: PropTypes.instanceOf(Date),
};
//export default DayEvent;
/////

const PendingEvents = () => {
  //data for events
  const events = [
    {
      id: 1,
      title: 'Soccer Practice',
      kidsName: 'A',
      timing: '5:00-6:00 PM   Wed, 21Sep',
      color: '#ffd666',
      image: decline,
      image2: accept,
    },
    {
      id: 2,
      title: 'Soccer Practice',
      kidsName: 'B',
      timing: '5:00-6:00 PM   Wed, 21Sep',
      color: '#ff6b6d',
      image: decline,
      image2: accept,
    },
    {
      id: 3,
      title: 'Soccer Practice',
      kidsName: 'C',
      timing: '5:00-6:00 PM   Wed, 21Sep',
      color: '#c29eef',
      image: decline,
      image2: accept,
    },
  ];

  return (
    // <div className="pending-events">
    <div>
      <div className="left-column">
        <h5>Pending Events</h5>
        <p>Events shared to you by your ex-partner</p>
        <div className="event-boxes">
          {/* Render DayEvent component for each event */}
          {events.map((event) => (
            <DayEvent key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

// PendingEvents.propTypes = {
//   pendingMessages: PropTypes.array.isRequired, // Define prop types here
// };
export default PendingEvents;
