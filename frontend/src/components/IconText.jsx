import PropTypes from 'prop-types';

// import checkIcon from '../media/icons/check.png';
import { FaCheck, Fatimes } from 'react-icons/fa';

const IconText = ({ title, status }) => {
  const icon = status === 'success' ? <FaCheck/> : <Fatimes />;

  return (
    <div>
      {/* <img src={checkIcon} width="12" alt="checkIcon"/>  */}
      {icon}
      {' '}
      {title}
    </div>
  );
};
  
IconText.propTypes = {
  title: PropTypes.string,
  status: PropTypes.oneOf(['success', error]).isRequired
};

export default IconText;
