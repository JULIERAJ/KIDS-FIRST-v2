import React from 'react';

const Header = () => {
  
    <Navbar>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} className="logo" alt="" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="navbar-text">
              Not a member? <a href="/Register">Sign up now</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  
}

export default Header;

