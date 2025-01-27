// ServicioDetalle.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../ServicioDetalle.css';
import BrochureDownload from '../components/BrochureDownload';

const BASE_URL = 'https://consultoria.up.railway.app';

const ServicioDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brochure, setBrochure] = useState(null);

  useEffect(() => {
    fetchData();
    fetchBrochure();
  }, [id]);

  const fetchBrochure = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/brochures/`);
      const data = await response.json();
      // Asumimos que queremos el brochure más reciente
      if (data && data.length > 0) {
        setBrochure(data[0]);
      }
    } catch (error) {
      console.error('Error al cargar el brochure:', error);
      setBrochure(null); // Establecer brochure a null en caso de error
    }
  };
  
  const fetchData = async () => {
    try {
      const [categoryRes, subcategoriesRes, servicesRes] = await Promise.all([
        fetch(`${BASE_URL}/api/service-categories/${id}/`),
        fetch(`${BASE_URL}/api/service-subcategories/`),
        fetch(`${BASE_URL}/api/services/`)
      ]);

      const categoryData = await categoryRes.json();
      const subcategoriesData = await subcategoriesRes.json();
      const servicesData = await servicesRes.json();

      setCategory(categoryData);
      setSubcategories(subcategoriesData.filter(sub => sub.category === parseInt(id)));
      setServices(servicesData.filter(service => service.is_active));
    } catch (err) {
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BASE_URL}${imageUrl}`;
  };

  const getFileUrl = (fileUrl) => {
    if (!fileUrl) return null;
    if (fileUrl.startsWith('http')) return fileUrl;
    return `${BASE_URL}${fileUrl}`;
  };

  const getServicesForSubcategory = (subcategoryId) => {
    return services.filter(service => service.subcategory === subcategoryId);
  };

  if (loading) {
    return <div className="loading">Cargando detalles...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!category) {
    return <div className="error-message">Categoría no encontrada</div>;
  }

  return (
    <div className="service-detail-container">
      <div className="detail-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate('/servicios')}>
            ← Volver a Servicios
          </button>
          <h1 className="category-title">{category.name}</h1>
          <p className="category-description">{category.description}</p>
        </div>
      </div>

      {category.image && (
        <div className="category-main-image">
          <img src={getImageUrl(category.image)} alt={category.name} />
        </div>
      )}

      <BrochureDownload brochure={brochure} getFileUrl={getFileUrl} />

      <div className="subcategories-container">
        {subcategories.length === 0 ? (
          <div className="no-services">No hay subcategorías disponibles</div>
        ) : (
          subcategories.map((subcategory) => {
            const subcategoryServices = getServicesForSubcategory(subcategory.id);
            return (
              <div key={subcategory.id} className="subcategory-card">
                <h2 className="subcategory-title">{subcategory.name}</h2>
                <p className="subcategory-description">{subcategory.description}</p>
                {subcategoryServices.length > 0 ? (
                  <div className="services-grid">
                    {subcategoryServices.map((service) => (
                      <div key={service.id} className="service-card">
                        <div className="service-images">
                          {service.image_1 && (
                            <div className="service-image">
                              <img 
                                src={getImageUrl(service.image_1)} 
                                alt={`${service.title} - 1`} 
                              />
                            </div>
                          )}
                        </div>
                        <div className="service-content">
                          <h3 className="service-title">{service.title}</h3>
                          <p className="service-description">{service.description}</p>
                          <div className="card-footer">
                            <span className={`status-badge ${service.is_active ? 'active' : 'inactive'}`}>
                              {service.is_active ? 'Disponible' : 'No disponible'}
                            </span>
                            <a 
                              href="https://wa.me/51952870388?text=Hola,%20me%20interesa%20el%20servicio%20de" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="contact-card-button"
                            >
                              Contáctanos 💬
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-services">
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ServicioDetalle;