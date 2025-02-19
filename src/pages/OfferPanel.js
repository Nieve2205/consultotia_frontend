import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../AdminPanel.css';

const BASE_URL = 'https://consultoria.up.railway.app';

const OfferPanel = () => {
  const [offers, setOffers] = useState([]);
  const [editingOffer, setEditingOffer] = useState(null);
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    price: 0,
    image: null
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [offersResponse] = await Promise.all([
        axios.get(`${BASE_URL}/api/offers/`),
      ]);
      setOffers(offersResponse.data);
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

  const handleSaveOffer = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newOffer.title);
      formData.append('description', newOffer.description);
      formData.append('price', newOffer.price);
      if (newOffer.image) {
        formData.append('image', newOffer.image);
      }
  
      if (editingOffer) {
        await axios.put(`${BASE_URL}/api/offers/${editingOffer.id}/`, formData);
      } else {
        await axios.post(`${BASE_URL}/api/offers/`, formData);
      }
      fetchData();
      setNewOffer({
        title: '',
        description: '',
        price: 0,
        image: null
      });
      setEditingOffer(null);
    } catch (error) {
      console.error('Error al guardar la oferta:', error.message);
      console.error('Error details:', error);
    }
  };

  const handleDeleteOffer = async (offerId) => {
    try {
      await axios.delete(`${BASE_URL}/api/offers/${offerId}/`);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar la oferta:', error);
    }
  };

  const handleEditOffer = (offer) => {
    setNewOffer({
      title: offer.title,
      description: offer.description,
      price: offer.price,
      image: null
    });
    setEditingOffer(offer);
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BASE_URL}${imageUrl}`;
};

  return (
    <div className="admin-panel">
        <h1>{editingOffer ? 'Editar Oferta' : 'Gestion de Oferta'}</h1>

        <div className="form-section">
          <h2>{editingOffer ? 'Editar Oferta' : 'Nueva Oferta'}</h2>
          <div className="form">
            <div className="form-group">
              <label>Título de la Oferta:</label>
              <input
                type="text"
                name="title"
                placeholder="Título de la Oferta"
                value={newOffer.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Descripción de la Oferta:</label>
              <textarea
                name="description"
                placeholder="Descripción de la Oferta"
                value={newOffer.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Precio de la Oferta:</label>
              <input
                type="number"
                name="price"
                placeholder="Precio de la Oferta"
                value={newOffer.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Imagen de la Oferta:</label>
              <div className="file-input">
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>
              {newOffer.image && (
                <div className="image-preview">
                  <img src={URL.createObjectURL(newOffer.image)} alt="Preview" />
                </div>
              )}
            </div>
            <div className="form-buttons">
              <button className="submit-button" onClick={handleSaveOffer}>
                {editingOffer ? 'Actualizar' : 'Guardar '}
              </button>
              <button className="cancel-button" onClick={() => setEditingOffer(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>

        <div className="list-section">
          <h2>Ofertas Existentes</h2>
          {offers.length === 0 ? (
            <div className="no-data">No hay ofertas disponibles</div>
          ) : (
            <div className="offer-list">
              {offers.map((offer) => (
                <div key={offer.id} className="category-item">
                  <div className="category-image">
                    {offer.image ? (
                      <img src={getImageUrl(offer.image)} 
                      alt={offer.title} />
                    ) : (
                      <div className="no-image">Sin imagen</div>
                    )}
                  </div>
                  <div className="category-content">
                    <h3>{offer.title}</h3>
                    <p>{offer.description}</p>
                    <p>Precio: S/. {offer.price}</p>
                    <div className="category-actions">
                      <button className="edit-button" onClick={() => handleEditOffer(offer)}>
                        Editar
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteOffer(offer.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  );
};

export default OfferPanel;