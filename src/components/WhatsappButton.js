import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Cambiado a free-brands-svg-icons
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../WhatsappButton.css';

const WhatsappButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "51952870388"; // Tu número de WhatsApp
  const message = encodeURIComponent("Hola, estoy interesad@ en tus servicios");

  const handleWhatsappClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="whatsapp-container">
      {isOpen && (
        <div className="whatsapp-popup">
          <div className="popup-header">
            <span>Corvel's Consultoría Técnica</span>
            <button onClick={() => setIsOpen(false)} className="close-button">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="popup-content">
            <p>Hola 👋</p>
            <p>¿En qué podemos ayudarte?</p>
            <button onClick={handleWhatsappClick} className="chat-button">
              Chatea con nosotros
              <span className="chat-arrow">➤</span>
            </button>
          </div>
        </div>
      )}
      <button 
        className="whatsapp-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faWhatsapp} />
      </button>
    </div>
  );
};

export default WhatsappButton;