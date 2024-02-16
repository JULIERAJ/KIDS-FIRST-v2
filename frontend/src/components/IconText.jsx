import PropTypes from 'prop-types';

import checkIcon from '../media/icons/check.png';
import xIcon from '../media/icons/xIcon.png';

const IconText = ({ title, clear }) =>
{
  return (
    <div>
      <img src={clear ? xIcon : checkIcon } width="12" alt="icon"/>
      {' '}
      {title}
    </div>
  );};
IconText.propTypes = {
  title: PropTypes.string,
  clear: PropTypes.bool,
};

export default IconText;
