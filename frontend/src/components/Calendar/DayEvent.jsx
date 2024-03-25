import PropTypes from 'prop-types';
import './viewStyles.css';

export const DayEvent = ({ event }) => {
  //console.log(event);
  return <div>🏴‍☠️ {event.title}</div>;
};

export const DayViewHeader = ({ date }) => {
  const formatDate = (date) => {
    const options = { weekday: 'short', day: '2-digit' }; // Use '2-digit' for day to include leading zeros
    return new Date(date).toLocaleDateString('en-GB', options);
  };
    // Format the date
  const formattedDate = formatDate(date);
  // Split the formatted date into weekday and day parts
  const [weekday, day] = formattedDate.split(' ');

  // Check if the date is today
  const isToday = new Date(date).toLocaleDateString('en-GB') === new Date().toLocaleDateString('en-GB');
  return (
    <div className="day-header">
      <div className={`weekday ${isToday ? 'today' : ''}`}>{weekday}</div>
      <div className={`day ${isToday ? 'today' : ''}`}>{day}</div>
    </div>
  );
};
DayEvent.propTypes = {
  event: PropTypes.object,
};
DayViewHeader.propTypes = {
  date: PropTypes.instanceOf(Date),
};
