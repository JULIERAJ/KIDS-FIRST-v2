import PropTypes from 'prop-types';

import checkIcon from '../media/icons/check.png';
import crossMark from '../media/icons/crossMark.png';

const IconText = ({ title, status }) => {
  const icon =
    status === 'success' ? (
      <img src={checkIcon} width='12' alt='checkIcon' />
    ) : (
      <img src={crossMark} width='12' alt='crossMarkIcon' />
    );

  return (
    <div>
      {icon} 
      {''}
      {title}
    </div>
  );
};

IconText.propTypes = {
  title: PropTypes.string,
  status: PropTypes.oneOf(['success', 'error']).isRequired,
};

export default IconText;
