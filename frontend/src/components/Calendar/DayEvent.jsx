import PropTypes from 'prop-types';
import './viewStyles.css';

// const getColorForBackground = (name) => {
//   const colorsBackground = {
//     'A': 'rgba(255, 214, 102, 0.5)',
//     'B': 'rgba(255, 107, 109, 0.5)',
//     'C': 'rgba(194, 158, 239, 0.5)',
//   };
//   return colorsBackground[name.charAt(0).toUpperCase()] || 'rgba(0, 0, 0, 0)';
// };

export const DayEvent = ({ event }) => {
  // eslint-disable-next-line no-console
  console.log(event);
  const { title, color, kidsName, start, end, desc, type } = event;
  const commonStyle = {
    borderRadius: '0px 7px 7px 0px',
  };

  const circleStyle = {
    ...commonStyle,
    width: '45px',
    height: '45px',
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

  const descStyle = {
    fontFamily: 'Roboto',
    color: '#081821',
    fontWeight: 200,
    fontSize: '16px',
    lineHeight: '40px',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '0',
    marginTop: '0px',
    opacity: '0.75',
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
    marginTop: '5px',
    marginLeft: 'auto',
    marginRight: '5px',
  };

  const boxStyle = {
    backgroundColor: `${color}4D`,
    borderLeft: `5px solid ${color}`,
    height: '100%',
    alignItems: 'center',
    position: 'relative',
    top: 0,
    left: 0,
    start: 'top',
    display: 'flex'
  };

  // Function to format date and time
  const formatEventTime = (startDate, endDate) => {
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const dateOptions = { weekday: 'short', day: '2-digit', month: 'short' };
    const startTime = startDate.toLocaleTimeString('en-GB', timeOptions);
    const endTime = endDate.toLocaleTimeString('en-GB', timeOptions);
    const date = startDate.toLocaleDateString('en-GB', dateOptions);

    return `${startTime} - ${endTime} ${date}`;
  };

  // Inside the return statement of the DayEvent component
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
        <div style={descStyle}>
          {desc && <span>{desc}</span>}
        </div>
        <div style={{ fontSize: '14px', opacity: '0.4' }}>
          {type && <span>{type}</span>}
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

DayEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    kidsName: PropTypes.string.isRequired,
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
};

export const DayViewHeader = ({ date }) => {

  const formatDate = (date) => {
    const options = { weekday: 'short', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };
  // eslint-disable-next-line no-console
  console.log('formatDate is: ', formatDate(date));
  return <div>{formatDate(date)}</div>;
};

DayViewHeader.propTypes = {
  date: PropTypes.instanceOf(Date),
};

export default DayEvent;
