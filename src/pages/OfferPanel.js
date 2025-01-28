import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../OfferPanel.css"

const OfferPanel = () => {
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    services: [],
    price: 0,
    image: null
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get('/api/offers/');
      setOffers(response.data);
    } catch (error) {
      console.error('Error al cargar las ofertas:', error);
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

      await axios.post('/api/offers/', formData);
      fetchOffers();
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
      await axios.delete(`/api/offers/${offerId}/`);
      fetchOffers();
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
          {/* Aquí debes obtener los servicios disponibles desde tu API */}
          <option value="1">Servicio 1</option>
          <option value="2">Servicio 2</option>
          <option value="3">Servicio 3</option>
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
            <button onClick={() => handleDeleteOffer(offer.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferPanel;