import PropTypes from 'prop-types';
const WeekEvent = ({ event }) => {
  const { title, color } = event; // Destructure event to get title and color
  return <div style={{ backgroundColor: color }}>📅 {title}</div>;
};
WeekEvent.propTypes = {
  event: PropTypes.object,
};
export default WeekEvent;
