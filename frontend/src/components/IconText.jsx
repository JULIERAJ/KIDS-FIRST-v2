import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
const IconText = ({ title, clear }) =>
{
  return (
    <div>
      {clear ? <GrClose /> : <FaCheck color='white'/>}
      {' '}
      {title}
    </div>
  );};
IconText.propTypes = {
  title: PropTypes.string,
  clear: PropTypes.bool,
};

export default IconText;
