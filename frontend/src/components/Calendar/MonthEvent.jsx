import PropTypes from 'prop-types';
import React from 'react';
import './viewStyles.css';
import './DayMonthEventStyles.css';

const MonthEvent = ({ event }) => {
  const { color, kidsName, title } = event;

  const circleStyle = {
    width: '20.36px',
    height: '21px',
    backgroundColor: color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    color: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: -5,
    left: -20,
    marginLeft: '30px',
    marginTop: '12px',
  };

  const boxStyle = {
    backgroundColor: `${color}4D`,
    borderLeft: `4px solid ${color}`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginLeft: '-9px',
    borderRadius: '0px 7px 7px 0px',
  };

  const getTruncatedTitle = (title) => {
    if (title.length <= 11) {
      return title;
    }
    return title.substring(0, 11) + '...';
  };

  const truncatedTitle = getTruncatedTitle(title);

  return (
    <div className="rbc-event-content" >
      <div className="kid-events-container" style={boxStyle}>
        <span className="circle" style={circleStyle}>
          {kidsName.charAt(0).toUpperCase()}
        </span>
        {truncatedTitle && <span className="title" style={{ marginLeft: '-30px', marginTop: '-5px' }}>{truncatedTitle}</span>}
      </div>
    </div>
  );
};

MonthEvent.propTypes = {
  event: PropTypes.object.isRequired,
};

export default MonthEvent;
