// Servicios.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Servicios.css';

const BASE_URL = 'https://consultoria.up.railway.app';

const Servicios = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/service-categories/`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BASE_URL}${imageUrl}`;
  };

  const handleServiceClick = (categoryId) => {
    navigate(`/servicios/${categoryId}`);
  };

  const handleKeyPress = (event, categoryId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(`/servicios/${categoryId}`);
    }
  };

  if (loading) {
    return <div className="loading">Cargando servicios...</div>;
  }

  return (
    <div className="modern-services">
      <div className="services-header">
        <div className="glass-effect"></div>
        <h1>Nuestros Servicios</h1>
        <p>Descubre nuestras soluciones integrales</p>
      </div>

      <div className="services-grid">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="service-item"
            onClick={() => handleServiceClick(category.id)}
            onKeyPress={(e) => handleKeyPress(e, category.id)}
            tabIndex={0}
            role="button"
            aria-label={`Ver detalles de ${category.name}`}
          >
            <div className="service-content">
              <div className="service-image-wrapper">
                <div className="service-image-container">
                  {category.image ? (
                    <img 
                      src={getImageUrl(category.image)}
                      alt={category.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="no-image">
                      <span>{category.name[0]}</span>
                    </div>
                  )}
                  <div className="image-overlay">
                    <button 
                      className="explore-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(category.id);
                      }}
                    >
                      Explorar
                    </button>
                  </div>
                </div>
              </div>
              <div className="service-info">
                <h3>{category.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servicios;