import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

//import style from '../../pages/Register/RegisterForm.module.css';

import '../MessageBar/styles.css';

//let email = '';

const FromInput = ({ label,...props }) => (
  <Form.Group className='py-2'>
    <Form.Label>{label}</Form.Label>
    <Form.Control {...props} />
  </Form.Group>
);

FromInput.propTypes = {
  label: PropTypes.string,
};
export default FromInput;
