import PropTypes from 'prop-types';
const MonthEvent = ({ event }) => {
  const { title, color } = event; // Destructure event to get title and color
  return <div style={{ backgroundColor: color }}>📅 {title}</div>;
};
MonthEvent.propTypes = {
  event: PropTypes.object,
};
export default MonthEvent;
