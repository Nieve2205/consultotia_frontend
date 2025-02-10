import React from 'react';
import '../Experiencia.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCertificate, faAward, faTrophy } from '@fortawesome/free-solid-svg-icons';

const Experiencia = () => {
  const achievements = [
    {
      icon: faStar,
      title: "Excelencia en Servicio",
      description: "Más de 1000 clientes satisfechos"
    },
    {
      icon: faCertificate,
      title: "Certificaciones",
      description: "Acreditaciones Nacionales"
    },
    {
      icon: faAward,
      title: "Reconocimientos",
      description: "Premiados por calidad"
    },
    {
      icon: faTrophy,
      title: "Trayectoria",
      description: "4 años de experiencia"
    }
  ];

  const projects = [
    {
      image: "https://vlv.pe/wp-content/uploads/2020/04/AGROINCA-vlv-1-ok.png",
      title: "AGROINCA PPX",
    },
    {
      image: "https://media.licdn.com/dms/image/v2/C4D0BAQHwlsowQ4Qr-A/company-logo_200_200/company-logo_200_200/0/1637945868087?e=2147483647&v=beta&t=6O-QKx1e_Czas9neyXF-vcn04-8v2d45wLtEWmR9u2Y",
      title: "SUMAC PAQARI",
      category: "Empresa de gestión ambiental"
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcJk28fSZQws2DU-UVi2Z9MbqrnkRnC3wrP7dsWRBzCRsZMz9nUy2b1ISfti2zOz2yQA8&usqp=CAU",
      title: "SC PACKING",
      category: "Fresh Fruit"
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXA0rJxoq1RiP3dBTZWvEkyol2iYmj1grZPw&s",
      title: "SUMAC",
      category: "Institucional"
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYv682_PAt-KPYZjQJ3vQisLJsL2Qredeh4A&s",
      title: "Inversiones Merma",
      category: "S.A.C."
    },
    {
      image: "https://iberaquaculture.com/wp-content/uploads/2024/03/Logo-ITP.jpg",
      title: "Instituto Tecnologíco de la Producción",
      category: "ITP"
    }
  ];

  return (
    <div className="experience-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Experiencia Comprobada</h1>
            <p className="hero-description">
              Liderando el camino en seguridad y salud ocupacional con soluciones innovadoras y resultados comprobados
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <FontAwesomeIcon icon={achievement.icon} className="achievement-icon" />
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nuestros Clientes</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Descubre cómo hemos ayudado a empresas a mejorar su seguridad y salud ocupacional
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <h3>{project.title}</h3>
                    <span>{project.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experiencia;