import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const message = "Hola, estoy interesado en sus servicios de consultoría...";
    const encodedMessage = encodeURIComponent(message);
    return (
        <div className="home-container">
            {/* Carrusel Modernizado */}
            <div id="carouselExample" className="carousel slide modern-carousel" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="carousel-overlay"></div>
                        <img src="https://cdn.prod.website-files.com/646ff4554f90b915da8582ab/64837cc6862d883c05905d0c_capa.jpg" className="d-block w-100" alt="Imagen 1" />
                        <div className="carousel-caption modern-caption">
                            <div className="caption-content">
                                <h1 className="display-3 fw-bold mb-4">Corvel's Consultoria</h1>
                                <p className="lead mb-4">El crecimiento de su negocio es nuestra meta.</p>
                                <a href="/contacto" className="btn btn-primary btn-lg modern-btn">
                                    Conoce más
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="carousel-overlay"></div>
                        <img src="https://6097063.fs1.hubspotusercontent-na1.net/hubfs/6097063/blog%20%284%29-1.jpg" className="d-block w-100" alt="Imagen 2" />
                        <div className="carousel-caption modern-caption">
                            <div className="caption-content">
                                <h1 className="display-4 fw-bold mb-4">Esfuerzo y optimismo constante para la mejora continua</h1>
                                <a href="/servicios" className="btn btn-primary btn-lg modern-btn">
                                    Nuestros servicios
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="carousel-overlay"></div>
                        <img src="https://www.esan.edu.pe/images/blog/2021/03/17/1500x844-habilidades-responsables-seguridad-salud-trabajo.jpg" className="d-block w-100" alt="Imagen 3" />
                        <div className="carousel-caption modern-caption">
                            <div className="caption-content">
                                <h1 className="display-4 fw-bold mb-4">Servicios orientados a salvaguardar la seguridad y salud en el trabajo</h1>
                                <a href="/contacto" className="btn btn-primary btn-lg modern-btn">
                                    Contáctanos
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de Bienvenida */}
            <div className="welcome-section">
                <div className="container">
                    <div className="row justify-content-center align-items-center g-5">
                        <div className="col-lg-6">
                            <div className="welcome-image-container">
                                <img 
                                    src="https://img.freepik.com/foto-gratis/vista-inferior-rascacielos-dia-soleado_23-2148230390.jpg?semt=ais_hybrid" 
                                    alt="Office Building" 
                                    className="welcome-image"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="welcome-content">
                                <h2 className="display-4 fw-bold mb-4">Bienvenidos</h2>
                                <div className="accent-line mb-4"></div>
                                <h4 className="h3 mb-4">LA OPTIMIZACIÓN DE LOS PROCESOS PARA LA MEJORA CONTINUA</h4>
                                <p className="lead mb-4">
                                    Nuestro compromiso es la evolución de su empresa de forma impecable, 
                                    no te preocupes el desarrollo de tu negocio es nuestro objetivo.
                                </p>
                                <div className="contact-box p-4">
                                    <p className="mb-3">Contáctanos para más información sobre cómo podemos ayudarte.</p>
                                        <a 
                                            href={`https://wa.me/51952870388?text=${encodedMessage}`}
                                            className="modern-contact-btn"
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                        <FontAwesomeIcon icon={faWhatsapp} className="me-2" />
                                        Contáctanos
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de Propósito */}
            <div className="purpose-section mt-5">
                <div className="overlay-gradient"></div>
                <div className="container position-relative">
                    <div className="row align-items-center g-4">
                        <div className="col-md-6">
                            <div className="purpose-content">
                                <h2 className="text-white display-4 mb-4 fw-bold">
                                    Nuestra Marca
                                </h2>
                                <div className="d-flex align-items-start mb-4">
                                    <ul className="text-white list-unstyled">
                                        <li className="mb-2">° Tecnología a la vanguardia de la empresa</li>
                                        <li className="mb-2">° Condiciones y metodologías de trabajo innovadoras</li>
                                        <li className="mb-2">° Equipo técnico especializado</li>
                                        <li className="mb-2">° Costos módicos de servicio acorde al mercado</li>
                                        <li className="mb-2">° Tiempo de entrega inmediato</li>
                                        <li className="mb-2">° Confiabilidad, confidencialidad y compromiso</li>
                                        <li className="mb-2">° Soluciones integrales bajo los estándares de normas internacionales</li>
                                        <li className="mb-2">° Comunicación horizontal y constante con el cliente</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img 
                                src="https://www.shutterstock.com/image-photo/credit-finance-business-team-explain-600nw-2230060655.jpg" 
                                alt="Teamwork" 
                                className="purpose-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;