import PropTypes from 'prop-types';
const MonthEvent = ({ event }) => {
  return <div>📅 {event.title}</div>;
};
MonthEvent.propTypes = {
  event: PropTypes.object,
};
export default MonthEvent;
