import React from 'react';
import '../About.css';
import logo from '../assets/logo.png';

const Nosotros = () => {

  const modernBlue = '#0052cc';
  const modernOrange = '#ff6b2b';
  
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero-banner">
        <h1>Sobre Nosotros</h1>
        <p>Transformando la seguridad y salud laboral con soluciones innovadoras</p>
      </div>

      {/* Misión y Visión */}
      <div className="mission-vision-section">
        <div className="mission-box">
          <div className="content-box">
            <h2>Misión</h2>
            <div className="image-text-container">
              <img 
                src="https://www.nalandaglobal.com/wp-content/uploads/seguridad-y-salud-trabajo.jpg" 
                alt="Misión"
              />
              <p>
                Brindar servicios especializados a nuestros clientes en seguridad y salud en el trabajo 
                con la finalidad de prevenir sus accidentes de trabajo y/o enfermedades ocupacionales 
                a sus colaboradores.
              </p>
            </div>
          </div>
        </div>

        <div className="vision-box">
          <div className="content-box">
            <h2>Visión</h2>
            <div className="image-text-container">
              <img 
                src="https://2302063.fs1.hubspotusercontent-na1.net/hubfs/2302063/sst2.jpg" 
                alt="Visión"
              />
              <p>
                Posicionarse como socio estratégico de clientes vigentes y futuros continuando 
                brindando servicio especializados en seguridad, salud en el trabajo, medio ambiente 
                y calidad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nosotros Section */}
      <div 
        className="container-fluid py-5 mb-5"
        style={{
          background: `linear-gradient(45deg, ${modernBlue}11, ${modernOrange}11)`,
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h2 style={{ color: modernBlue, marginBottom: '1.5rem', fontSize: '2.5rem' }}>Nosotros</h2>
              <div style={{ borderLeft: `4px solid ${modernOrange}`, paddingLeft: '1.5rem' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                  Empresa especializada en consultoría, asesoría y capacitaciones de Seguridad,
                  Salud Ocupacional, Medio Ambiente, Calidad, Ingeniería y Proyectos, entre otros.
                </p>
                <p style={{ fontSize: '1.1rem' }}>
                  Ofrecemos el dictado y elaboración de cursos, talleres presenciales o virtuales
                  orientados a los profesionales de hoy, y la comunidad empresarial que deseen
                  ampliar o mejorar el manejo de su entorno dentro de su empresa.
                </p>
              </div>
            </div>
            <div className="col-md-5 text-center">
              <img
                src={logo} 
                alt="Logo CORVEL'S" 
                style={{
                  maxWidth: '300px',
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))',
                  transform: 'scale(1.1)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Valores Section */}
      <div className="values-section">
        <h2>Nuestros Valores</h2>
        <div className="values-grid">
          <div className="value-card">
            <img src="https://cdn-icons-png.flaticon.com/128/4766/4766820.png" alt="Liderazgo" />
            <h3>Liderazgo</h3>
            <p>Innovamos constantemente y lideramos con visión, inspirando confianza y motivación en cada uno de nuestros proyectos.</p>
          </div>
          <div className="value-card">
            <img src="https://cdn-icons-png.flaticon.com/128/1599/1599933.png" alt="Cooperación" />
            <h3>Cooperación</h3>
            <p>Fomentamos el trabajo en equipo, compartiendo ideas y esfuerzos para alcanzar objetivos comunes y generar soluciones efectivas.</p>
          </div>
          <div className="value-card">
            <img src="https://cdn-icons-png.flaticon.com/128/3937/3937026.png" alt="Calidad" />
            <h3>Calidad</h3>
            <p>Nos comprometemos a ofrecer productos y servicios de excelencia, siempre superando las expectativas de nuestros clientes.</p>
          </div>
          <div className="value-card">
            <img src="https://cdn-icons-png.flaticon.com/128/4953/4953099.png" alt="Pasión" />
            <h3>Pasión</h3>
            <p>Amamos lo que hacemos, y esa pasión nos impulsa a crear, mejorar y seguir creciendo para ofrecer lo mejor a nuestros clientes.</p>
          </div>
        </div>
      </div>

      {/* Final Banner */}
      <div className="final-banner">
        <h2>Nuestros Valores Impulsan Nuestro Éxito</h2>
        <p>En Corvel's, nos guiamos por principios que nos permiten ofrecer lo mejor a nuestros clientes.</p>
      </div>
    </div>
  );
};

export default Nosotros;