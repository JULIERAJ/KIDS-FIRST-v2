import PropTypes from 'prop-types';
import React from 'react';
import './viewStyles.css';
import './WeekEventStyles.css';

const WeekEvent = ({ event }) => {
  const { color, kidsName, title, start, end } = event;

  const circleStyle = {
    width: '25px',
    height: '25px',
    backgroundColor: color,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    color: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: '0px',
    marginTop: '15px'
  };

  const boxStyle = {
    backgroundColor: `${color}4D`,
    borderLeft: `5px solid ${color}`,
    height: '100%',
    alignItems: 'center',
    position: 'relative',
    top: 0,
    left: '-4px',
    start: 'top',
    display: 'flex'
  };

  const getTruncatedTitle = (title) => {
    if (title.length <= 11) {
      return title;
    }
    return title.substring(0, 11) + '...';
  };

  const truncatedTitle = getTruncatedTitle(title);

  // Function to format date and time
  const formatEventTime = (startDate, endDate) => {
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const startTime = startDate.toLocaleTimeString('en-GB', timeOptions);
    const endTime = endDate.toLocaleTimeString('en-GB', timeOptions);
    return `${startTime} - ${endTime}`;
  };
  return (
    <div className="event-box" style={boxStyle}>
      <div className="contentWrapperStyle content-wrapper">
        {truncatedTitle && <span className="titleStyle title" >{truncatedTitle}</span>}
        <div className="timingStyle">
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
