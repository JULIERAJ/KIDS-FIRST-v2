import React from 'react';
import PropTypes from 'prop-types';

const getColorForName = (name) => {
  // Implement logic to map kid names to colors here:
  const colors = {
    'A': '#FFD666',
    'B': '#FF6B6D',
    'C': '#C29EEF',
    // ... add more mappings as needed
  };
  return colors[name.charAt(0).toUpperCase()] || 'black'; // Default black
};

const WeekEvent = ({ event }) => {
  const { color, kidsName, title, timing } = event; // Destructure event data

  // Consolidated styles with clear naming and positioning
  const eventBoxStyle = {
    backgroundColor: color,
    display: 'flex',
    flexDirection: 'column',
    width: '100vw', 
    minHeight: '100vh',
    position: 'absolute', // Consider adjusting positioning based on calendar layout
    top: '33px', 
    left: '10px', 
    borderRadius: '0px 7px 7px 0px',
  };

  const lineStyle = {
    width: '2px',
    height: '100%', // Matches event box height
    backgroundColor: getColorForName(kidsName),
    position: 'absolute',
    top: '0',
    left: '0',
    gap: '0px',
    borderRadius: '0px 7px 7px 0px',
  };

  const circleStyle = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    color: 'white',
    position: 'absolute',
    top: '29px', 
    left: '13px', 
  };

  const contentWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1, // Grow to fill remaining space
    marginLeft: '25px', // Adjust spacing between circle and content
    marginTop: '2px', // Adjust spacing above content
  };

  const titleStyle = {
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '18.75px',
    textAlign: 'left',
    color: '#081821',
    marginBottom: '2px', // Optional margin for spacing
  };

  const timingStyle = {
    fontSize: '14px',
    color: '#011D26',
    fontWeight: 200,
    lineHeight: '16.41px',
  };

  return (
    <div className="event-box" style={eventBoxStyle}>
      <div className="line" style={lineStyle}></div>
      <span className="circle" style={circleStyle}>
        {kidsName.charAt(0).toUpperCase()}
      </span>
      <div style={contentWrapperStyle}>
        <div className="title" style={titleStyle}>
          {title && <span>{title}</span>}
        </div>
        <div className="timing" style={timingStyle}>
          {timing && <span>{timing}</span>}
        </div>
      </div>
    </div>
  );
};

WeekEvent.propTypes = {
  event: PropTypes.object.isRequired,
};

export default WeekEvent;









