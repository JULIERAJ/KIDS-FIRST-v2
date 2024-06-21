import PropTypes from 'prop-types';
import './DayMonthEventStyles.css';
import { formatEventTime } from './utils/dateUtils';

export const DayEvent = ({ event }) => {
  const { title, color, kidsName, start, end, desc, type } = event;

  const circleStyle = {
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

  const boxStyle = {
    backgroundColor: `${color}4D`,
    borderLeft: `5px solid ${color}`,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    top: 0,
    left: '-4px',
    start: 'top',
    display: 'flex',
    paddingRight: '5px',
    paddingBottom: '5px'
  };

  return (
    <div className='event-box' style={boxStyle}>
      <div className="DayEventContentWrapperStyle content-wrapper">
        <div className="title titleStyle" >
          {title && <span>{title}</span>}
        </div>
        <div className="DayEventTimingStyle" >
          {start && end && (
            <span>{formatEventTime(start, end)}</span>
          )}
        </div>
        <div className="descStyle">
          {desc && <span>{desc}</span>}
        </div>
        <div style={{ fontSize: '14px', opacity: '0.4' }}>
          {type && <span> <span
            style={{
              fontFamily: 'Material Symbols Outlined',
              fontSize: '18px',
              lineHeight: '18px',
              marginRight: '8px',
              verticalAlign: 'middle'
            }}>
            {type.includes('Solo') ? 'person' : 'group'}
          </span>{type}</span>}
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
    desc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    kidsName: PropTypes.string.isRequired,
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default DayEvent;
