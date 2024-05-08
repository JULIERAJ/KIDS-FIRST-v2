import PropTypes from 'prop-types';
import React from 'react';
import './viewStyles.css';

// const getColorForBackground = (name) => {
//   const colorsBackground = {
//     'A': 'rgba(255, 214, 102, 0.5)',
//     'B': 'rgba(255, 107, 109, 0.5)',
//     'C': 'rgba(194, 158, 239, 0.5)',
//   };
//   return colorsBackground[name.charAt(0).toUpperCase()] || 'rgba(0, 0, 0, 0)'; 
// };

const WeekEvent = ({ event }) => {
  const { color, kidsName, title, start, end } = event;

  const commonStyle = {
    borderRadius: '0px 7px 7px 0px',
  };
  const circleStyle = {
    ...commonStyle,
    width: '40px',
    height: '40px',
    backgroundColor: color,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    color: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: '5px',
    marginTop: '15px'
  };

  const titleStyle = {
    ...commonStyle,
    fontFamily: 'Roboto',
    color: '#081821',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '18.75px',
    textAlign: 'left',
    marginLeft: '0px',
    position: 'absolute',
    top: '-8px',
    marginTop: '30px',
    marginBottom: '0px'
  };

  const contentWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '60px',
    marginTop: '0px',
  };

  const timingStyle = {
    fontSize: '14px',
    opacity: '0.4',
    fontWeight: 200,
    lineHeight: '40px',
    marginTop: '35px',
    marginLeft: '10px',
    marginRight: '5px',
  };

  const boxStyle = {
    backgroundColor: `${color}4D`,
    borderLeft: `5px solid ${color}`,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    top: 0,
    left: 0,
    start: 'top',
    display: 'flex'
  };

  // Function to format date and time
  // eslint-disable-next-line no-unused-vars
  const formatEventTime = (startDate, endDate) => {
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const dateOptions = { weekday: 'short', day: '2-digit', month: 'short' };
    const startTime = startDate.toLocaleTimeString('en-GB', timeOptions);
    const endTime = endDate.toLocaleTimeString('en-GB', timeOptions);
    const date = startDate.toLocaleDateString('en-GB', dateOptions);

    return `${startTime} - ${endTime} ${date}`;
  };
  return (
    <div className="event-box" style={boxStyle}>
      <div style={contentWrapperStyle} className="content-wrapper">
        <div className="title" style={titleStyle}>
          {title && <span>{title}</span>}
        </div>
        <div className="timing" style={timingStyle}>
          {(start && end) && (
            <span>{formatEventTime(start, end)}</span>
          )}
        </div>
      </div>
      <div>
      </div>
      <span className="circle" style={circleStyle}>
        {kidsName && kidsName.charAt(0).toUpperCase()}
      </span>
    </div >
  );
};

WeekEvent.propTypes = {
  event: PropTypes.object.isRequired,
};

export default WeekEvent;
