// BrochureDownload.js
import React from 'react';

const BrochureDownload = ({ brochure, getFileUrl }) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleDownload = (e) => {
    e.preventDefault();
    const fileUrl = getFileUrl(brochure.file);
    
    if (isMobile) {
      // En dispositivos móviles, abre el PDF en una nueva pestaña
      // Esto permitirá que el sistema operativo use su visor de PDF predeterminado
      window.open(fileUrl, '_blank', 'noopener,noreferrer');
    } else {
      // En desktop, intenta la descarga directa
      try {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = brochure.title || 'brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error al descargar:', error);
        // Si falla la descarga directa, abre en nueva pestaña
        window.open(fileUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <div className="download-section">
      <div className="download-content">
        <h2>Conoce más sobre nuestros servicios</h2>
        <p>Descarga nuestro brochure completo de servicios y descubre todo lo que podemos ofrecerte.</p>
        {brochure ? (
          <a 
            href={getFileUrl(brochure.file)}
            className="download-button"
            onClick={handleDownload}
          >
            {isMobile ? 'Ver' : 'Descargar'} {brochure.title} <span className="download-icon">📥</span>
          </a>
        ) : (
            <p>Cargando brochure...</p>
        )}
      </div>
    </div>
  );
};

export default BrochureDownload;