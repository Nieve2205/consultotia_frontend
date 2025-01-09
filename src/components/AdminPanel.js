// AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../AdminPanel.css';

const BASE_URL = 'https://consultoria.up.railway.app';

const AdminPanel = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    // Obtener el token del localStorage
    const getAuthHeader = () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Para debug
      return {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json'
          }
      };
    };

    useEffect(() => {
      fetchCategories();
    }, []);

    const fetchCategories = async () => {
      try {
          const token = localStorage.getItem('token');
          console.log('Fetching categories...');
  
          const response = await fetch('http://localhost:8000/api/service-categories/', {
              method: 'GET',  // Explícitamente especificar GET
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                  // No necesitamos el token para GET si es público
              }
          });
  
          console.log('Response status:', response.status);
          
          // Si la respuesta no es ok, obtener el texto del error
          if (!response.ok) {
              const errorText = await response.text();
              console.log('Error response:', errorText);
              throw new Error(`Error al cargar las categorías: ${errorText}`);
          }
  
          const data = await response.json();
          console.log('Categories data:', data);
          setCategories(data);
          
      } catch (error) {
          console.error('Error completo:', error);
          setError('Error al cargar las categorías');
      }
    };

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return null;
        // Si la URL ya empieza con http, usarla tal cual
        if (imageUrl.startsWith('http')) return imageUrl;
        // Si no, concatenar con la URL base
        return `${BASE_URL}${imageUrl}`;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');
        console.log('Token usado:', token); // Debug token
    
        try {
            const formData = new FormData(e.target);
            
            // Debug datos del formulario
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
    
            if (editingCategory) {
                console.log('Editando categoría:', editingCategory.id);
    
                // Solo eliminar la imagen si existe el campo pero no se seleccionó un nuevo archivo
                if (e.target.image && !e.target.image.files[0]) {
                    formData.delete('image');
                }
    
                const response = await fetch(
                    `http://localhost:8000/api/service-categories/${editingCategory.id}/`, 
                    {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                        body: formData
                    }
                );
    
                // Debug respuesta
                console.log('Status:', response.status);
                const responseText = await response.text();
                console.log('Respuesta:', responseText);
    
                if (!response.ok) {
                    throw new Error(`Error al actualizar la categoría: ${responseText}`);
                }
    
                try {
                    const data = JSON.parse(responseText);
                    console.log('Datos actualizados:', data);
                } catch (e) {
                    console.log('La respuesta no es JSON válido');
                }
            } else {
                //código para crear nueva categoría
                const response = await fetch(
                    'http://localhost:8000/api/service-categories/',
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                        body: formData
                    }
                );
    
                if (!response.ok) {
                    throw new Error('Error al crear la categoría');
                }
            }
    
            await fetchCategories();
            resetForm(e.target);
            setEditingCategory(null);
        } catch (error) {
            console.error('Error completo:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (file) {
              setPreviewImage(URL.createObjectURL(file));
          }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;
        
        const token = localStorage.getItem('token');
        setLoading(true);
        
        try {
            const response = await fetch(
                `http://localhost:8000/api/service-categories/${id}/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
    
            if (!response.ok) {
                throw new Error('Error al eliminar la categoría');
            }
    
            await fetchCategories();
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

      // Función para manejar edición
    const handleEdit = (category) => {
        setEditingCategory(category);
        if (category.image) {
            setPreviewImage(`http://localhost:8000${category.image}`);
        }
    };

      const resetForm = (form) => {
          form.reset();
          setEditingCategory(null);
          setPreviewImage(null);
      };

      return (
          <div className="admin-panel">
              <h1>{editingCategory ? 'Editar Categoría' : 'Gestión de Categorías'}</h1>
              
              {error && (
                  <div className="error-message">
                      {error}
                      <button onClick={() => setError('')} className="error-close">×</button>
                  </div>
              )}

              <div className="form-section">
                  <h2>{editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
                  <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={editingCategory?.name || ''}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descripción:</label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={editingCategory?.description || ''}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Imagen:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={(e) => {
                                if (e.target.files[0]) {
                                    console.log('Nueva imagen seleccionada:', e.target.files[0]);
                                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                                }
                            }}
                        />
                        {previewImage && (
                            <div className="image-preview">
                                <img src={previewImage} alt="Vista previa" />
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="order">Orden:</label>
                        <input
                            type="number"
                            id="order"
                            name="order"
                            defaultValue={editingCategory?.order || 0}
                        />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? 'Guardando...' : (editingCategory ? 'Actualizar' : 'Guardar')}
                        </button>
                        {editingCategory && (
                            <button 
                                type="button" 
                                onClick={() => {
                                    setEditingCategory(null);
                                    setPreviewImage(null);
                                }} 
                                className="cancel-button"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
              </div>

              <div className="list-section">
                  <h2>Categorías Existentes</h2>
                  <div className="categories-list">
                    {categories.map(category => (
                        <div key={category.id} className="category-item">
                            <div className="category-image">
                                {category.image ? (
                                    <img 
                                        src={getImageUrl(category.image)}
                                        alt={category.name}
                                        onError={(e) => {
                                            console.log('Error loading image:', category.image);
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder.jpg';
                                        }}
                                    />
                                ) : (
                                    <div className="no-image">
                                        <span>{category.name[0]}</span>
                                    </div>
                                )}
                            </div>
                            <div className="category-content">
                                <h3>{category.name}</h3>
                                <p>{category.description}</p>
                                <span className="order-badge">Orden: {category.order}</span>
                                <div className="category-actions">
                                    <button onClick={() => handleEdit(category)} className="edit-button">
                                        Editar
                                    </button>
                                    <button onClick={() => handleDelete(category.id)} className="delete-button">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
          </div>
      );
};

export default AdminPanel;