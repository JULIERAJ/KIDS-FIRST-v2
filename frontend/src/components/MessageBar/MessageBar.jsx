import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import './styles.css';

const MessageBar = ({ variant, children }) => (
  <Card className={`my-2 message-bar message-bar-${variant}`}>
    <Card.Body>
      <div>{children}</div>
    </Card.Body>
  </Card>
);

MessageBar.propTypes = {
  // variant: 'error' | 'success',
  variant: PropTypes.oneOf(['error', 'success']),
  // children: PropTypes.element,
  children: PropTypes.node,
};

export default MessageBar;
