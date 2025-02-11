import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import '../Footer.css';

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-main">
        <Container>
          <Row className="g-4">
            {/* Logo y Descripción */}
            <Col lg={4} md={6}>
              <div className="footer-brand">
                <div className="logo-container">
                  <img src={logo} alt="Logo CORVEL'S" className="footer-logo" />
                </div>
                <h5 className="brand-name">CORVEL'S CONSULTORÍA TÉCNICA</h5>
                <div className="brand-divider"></div>
                <p className="brand-description">
                  Brindamos servicios de consultoría y capacitaciones especializados 
                  en seguridad y salud en el trabajo.
                </p>
              </div>
            </Col>

            {/* Enlaces Rápidos */}
            <Col lg={2} md={6}>
              <div className="footer-section">
                <h5 className="footer-title">Enlaces</h5>
                <div className="footer-links">
                  {['Servicios', 'Nosotros', 'Contacto'].map((item, index) => (
                    <a 
                      key={index}
                      href={`/${item.toLowerCase()}`} 
                      className="footer-link"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </Col>

            {/* Información de Contacto */}
            <Col lg={4} md={6}>
              <div className="footer-section">
                <h5 className="footer-title">Contáctanos</h5>
                <div className="contact-info">
                  <div className="contact-item">
                    <FontAwesomeIcon icon={faPhone} className="contact-icon"/>
                    <div className="contact-details">
                      <span>+51 952 870 388</span>
                      <span>+51 992 519 389</span>
                      <span>+51 978 886 685</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <FontAwesomeIcon icon={faEnvelope} className="contact-icon"/>
                    <div className="contact-details">
                      <span>corvels.consultoria@gmail.com</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <FontAwesomeIcon icon={faLocationDot} className="contact-icon"/>
                    <div className="contact-details">
                      <span>Urb. Corazón de María A-1 J.L.B. y R.</span>
                      <span>Arequipa, Perú</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* Redes Sociales */}
            <Col lg={2} md={6}>
              <div className="footer-section">
                <h5 className="footer-title">Síguenos</h5>
                <div className="social-links">
                  {[
                    { icon: faFacebook, name: 'Facebook', url: 'https://www.facebook.com' },
                    { icon: faLinkedin, name: 'LinkedIn', url: 'https://www.linkedin.com/in/corvelsconsultoria' },
                    { icon: faInstagram, name: 'Instagram', url: 'https://www.instagram.com/corvelsconsultoria?igsh=MXcwYzNsZ2w3NzY1OA==' }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={social.icon} />
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="footer-bottom">
        <Container>
          <p>&copy; {new Date().getFullYear()} Corvel's Consultoría Técnica | Todos los derechos reservados</p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;