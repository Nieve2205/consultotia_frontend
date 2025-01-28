import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../OfferPanel.css"

const OfferPanel = () => {
  const [offers, setOffers] = useState([]);
  const [services, setServices] = useState([]);
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    services: [],
    price: 0,
    image: null
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [offersResponse, servicesResponse] = await Promise.all([
        axios.get('https://consultoria.up.railway.app/api/offers/'),
        axios.get('https://consultoria.up.railway.app/api/services/')
      ]);
      setOffers(offersResponse.data);
      setServices(servicesResponse.data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewOffer({ ...newOffer, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewOffer({ ...newOffer, image: e.target.files[0] });
  };

  const handleServicesChange = (e) => {
    const selectedServices = Array.from(e.target.selectedOptions, (option) => option.value);
    setNewOffer({ ...newOffer, services: selectedServices });
  };

  const handleSaveOffer = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newOffer.title);
      formData.append('description', newOffer.description);
      formData.append('price', newOffer.price);
      newOffer.services.forEach((service) => formData.append('services', service));
      if (newOffer.image) {
        formData.append('image', newOffer.image);
      }

      await axios.post('https://consultoria.up.railway.app/api/offers/', formData);
      fetchData();
      setNewOffer({
        title: '',
        description: '',
        services: [],
        price: 0,
        image: null
      });
    } catch (error) {
      console.error('Error al guardar la oferta:', error);
    }
  };

  const handleDeleteOffer = async (offerId) => {
    try {
      await axios.delete(`https://consultoria.up.railway.app/api/offers/${offerId}/`);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar la oferta:', error);
    }
  };

  return (
    <div className="offer-panel">
      <h2>Gestión de Ofertas</h2>

      <div className="offer-form">
        <h3>Nueva Oferta</h3>
        <input
          type="text"
          name="title"
          placeholder="Título de la Oferta"
          value={newOffer.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Descripción de la Oferta"
          value={newOffer.description}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Precio de la Oferta"
          value={newOffer.price}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        <select
          name="services"
          multiple
          value={newOffer.services}
          onChange={handleServicesChange}
        >
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
        <button onClick={handleSaveOffer}>Guardar Oferta</button>
      </div>

      <div className="offer-list">
        <h3>Ofertas Existentes</h3>
        {offers.map((offer) => (
          <div key={offer.id} className="offer-item">
            <h4>{offer.title}</h4>
            <p>{offer.description}</p>
            <p>Precio: {offer.price}</p>
            <div>
              Servicios:
              {offer.services.map((service) => (
                <span key={service.id} className="service-tag">
                  {service.title}
                </span>
              ))}
            </div>
            <button onClick={() => handleDeleteOffer(offer.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferPanel;