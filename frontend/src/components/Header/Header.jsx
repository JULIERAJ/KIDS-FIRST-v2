import PropTypes from 'prop-types';
import { Navbar, Container } from 'react-bootstrap';

import logo from '../../media/logo/kids_first_logo_beta.png';

const Header = ({ bg, widget }) => {
  return (
    <Navbar bg={bg} className="py-1">
      <Container className="content-layout">
        <Navbar.Brand href="/" className="py-0">
          <img src={logo} width="80" height="80" alt="KIDS FIRST"/>
        </Navbar.Brand>

        {widget}
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  bg: PropTypes.string,
  widget: PropTypes.element,
};

export default Header;
