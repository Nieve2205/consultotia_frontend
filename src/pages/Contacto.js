import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faClock, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import '../Contacto.css';

const Contacto = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await emailjs.sendForm(
        'service_gvoyvzf', // Reemplaza con tu Service ID
        'template_ue2iia8', // Reemplaza con tu Template ID
        form.current,
        '3dnxF-rI7icmrSceW' // Reemplaza con tu Public Key
      );

      if (result.text === 'OK') {
        setStatus('success');
        form.current.reset();
      }
    } catch (error) {
      setStatus('error');
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 5000); // Limpia el mensaje después de 5 segundos
    }
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-overlay">
          <h1>Contáctanos</h1>
          <p>Estamos aquí para ayudarte</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          {/* Mensajes de estado */}
          {status === 'success' && (
            <div className="alert success-alert">
              ¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.
            </div>
          )}
          
          {status === 'error' && (
            <div className="alert error-alert">
              Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
            </div>
          )}

          <div className="contact-grid">
            {/* Información de Contacto */}
            <div className="contact-info">
              <h2>INFORMACIÓN DE CONTACTO</h2>
              <div className="info-divider"></div>
              
              <div className="info-card">
                <div className="info-item">
                  <div className="icon-wrapper">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div className="info-content">
                    <h3>Visita nuestra oficina en:</h3>
                    <p>Urb. Corazón de María A-1 J.L.B. y R. - Arequipa</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon-wrapper">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div className="info-content">
                    <h3>¿Tienes alguna consulta?</h3>
                    <p>(+51) 952 870 388</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon-wrapper">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <div className="info-content">
                    <h3>Horario de trabajo</h3>
                    <p>Lunes- Viernes: 08:00-18:00</p>
                    <p>Sábados: 08:00-02:30</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon-wrapper">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div className="info-content">
                    <h3>Correo electrónico</h3>
                    <p>corvels.consultoria@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="contact-form">
              <h2>FORMULARIO DE CONTACTO</h2>
              <div className="form-divider"></div>
              <p className="form-description">
                Si deseas recibir una consulta gratuita, por favor rellena el formato.
              </p>

              <form ref={form} onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="user_name"
                    placeholder="Tu Nombre" 
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <input 
                    type="email" 
                    name="user_email"
                    placeholder="Tu Correo Electrónico" 
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <input 
                    type="text" 
                    name="subject"
                    placeholder="Asunto" 
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea 
                    name="message"
                    placeholder="Tu Mensaje (Opcional)" 
                    className="form-control"
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    'ENVIANDO...'
                  ) : (
                    <>
                      ENVIAR
                      <FontAwesomeIcon icon={faPaperPlane} className="ms-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;