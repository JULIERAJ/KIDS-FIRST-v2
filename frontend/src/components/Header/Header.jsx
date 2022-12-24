import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import "./styles.css";

import logo from "../../media/logo.png";

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

export default Header;
