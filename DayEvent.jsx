import PropTypes from 'prop-types';
import './viewStyles.css';

const getColorForBackground = (name) => {
  const colorsBackground = {
    'A': 'rgba(255, 214, 102, 0.5)',
    'B': 'rgba(255, 107, 109, 0.5)',
    'C': 'rgba(194, 158, 239, 0.5)',
  };
  return colorsBackground[name.charAt(0).toUpperCase()] || 'rgba(0, 0, 0, 0)';
};

export const DayEvent = ({ event }) => {
  const { title, color, kidsName, timing } = event;
  const commonStyle = {
    borderRadius: '0px 7px 7px 0px',
  };

  const circleStyle = {
    ...commonStyle,
    width: '25px',
    height: '25px',
    backgroundColor: color,
    display: 'flex',
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
    marginLeft: '15px',
    position: 'absolute',
    top: '-8px',
    marginTop: '20px'
  };

  const contentWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginLeft: '25px',
    marginTop: '2px',
  };

  const timingStyle = {
    fontSize: '14px',
    color: '#011D26',
    fontWeight: 200,
    lineHeight: '16.41px',
  };

  const boxStyle = {
    backgroundColor: getColorForBackground(kidsName),
    borderLeft: `2px solid ${color}`,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    top: 0,
    left: 0,
    start: 'top'
  };

  return (
    <div className="event-box" style={boxStyle}>
      <div style={contentWrapperStyle}>
        <div className="title" style={titleStyle}>
          {title && <span>{title}</span>}
        </div>
        <div className="timing" style={timingStyle}>
          {timing && <span>{timing}</span>}
        </div>
      </div>
      <span className="circle" style={circleStyle}>
        {kidsName && kidsName.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

DayEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    kidsName: PropTypes.string.isRequired,
    timing: PropTypes.string,
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

export default DayEvent;
