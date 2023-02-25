import PropTypes from 'prop-types';

import checkIcon from '../media/icons/check.png';

const IconText = ({ title }) => 
  <div>
    <img src={checkIcon} width="12" alt="checkIcon"/> 
    {' '}
    {title}
  </div>;

IconText.propTypes = {
  title: PropTypes.string,
};

export default IconText;
