import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './styles.css';

const FatherSonBlock = ({ children }) => (
  <Row>
    <Col xs={12} md={6} className='col-left' />

    <Col xs={12} md={6} className='col-right'>
      <div className='col-right-content'>{children}</div>
    </Col>
  </Row>
);

FatherSonBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default FatherSonBlock;
