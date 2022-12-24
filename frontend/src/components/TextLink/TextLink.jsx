import PropTypes from 'prop-types';

import './styles.css';

/**
 * @param {string} linkTitle
 * @param {string} title
 * @param {string} to - href
 */

const TextLink = ({ linkTitle, title, to }) => (
  <span className="text-link-title">{title}
    <a href={to} className="text-link">
      {' '}
      {linkTitle}
    </a>
  </span>
);

TextLink.propTypes = {
  linkTitle: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string,
};

export default TextLink;
