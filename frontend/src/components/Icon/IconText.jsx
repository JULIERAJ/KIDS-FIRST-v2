import PropTypes from 'prop-types';

import styles from './Icon.module.css';
const IconText = ({ title,clear } ) =>
{
  return (
    <div className={clear ? styles.iconText : styles.iconTextError}>
      &bull; <span style={{ marginLeft: '5px' }}>{title}</span>
    </div>
  );};
IconText.propTypes = {
  title: PropTypes.string,
  clear: PropTypes.bool,
};

export default IconText;
