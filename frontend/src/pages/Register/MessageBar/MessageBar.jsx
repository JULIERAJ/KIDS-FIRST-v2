import Card from "react-bootstrap/Card";

import "./styles.css";

/**
 * @param {string} variant: 'error' | 'success'
 */

const MessageBar = ({ variant, children }) =>
  <Card className={`my-2 message-bar message-bar-${variant}`}>
    <Card.Body>
      <div>{children}</div>
    </Card.Body>
  </Card>;

export default MessageBar;
