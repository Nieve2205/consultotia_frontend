import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png';

const CustomNavbar = () => {
  const navStyles = {
    navbar: {
      background: 'linear-gradient(45deg, #0052cc 0%, #ff6b2b 100%)',
      padding: '0.5rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    brand: {
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center'
    },
    logo: {
      width: '60px',
      height: '60px',
      marginRight: '20px',
      marginLeft: '20px',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
    },
    link: {
      color: 'white !important',
      margin: '0 15px',
      padding: '0.5rem 0',
      position: 'relative',
      transition: 'all 0.3s ease',
      fontSize: '1rem',
      fontWeight: '500'
    }
  };

  return (
    <Navbar expand="lg" style={navStyles.navbar}>
      <Container>
        <Navbar.Brand 
          href="/" 
          className="d-flex align-items-center"
          style={navStyles.brand}
        >
          <img 
            src={logo} 
            alt="Logo CORVEL'S" 
            style={navStyles.logo}
          />
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          style={{
            border: 'none',
            padding: '0.25rem'
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {['Inicio', 'Nosotros', 'Servicios', 'Experiencia', 'Contacto','Blog', 'Servicios Especiales'].map((item, index) => (
              <Nav.Link
                key={index}
                href={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
                style={navStyles.link}
                className="nav-link-custom"
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;