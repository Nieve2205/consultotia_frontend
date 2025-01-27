// ServicePanel.js
import React, { useState, useEffect } from 'react';
import '../ServicePanel.css';

const BASE_URL = 'https://consultoria.up.railway.app';

const ServicePanel = () => {
    const [services, setServices] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingService, setEditingService] = useState(null);
    const [previewImage1, setPreviewImage1] = useState(null);
    const [previewImage2, setPreviewImage2] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [servicesRes, subcategoriesRes] = await Promise.all([
                fetch(`${BASE_URL}/api/services/`),
                fetch(`${BASE_URL}/api/service-subcategories/`)
            ]);

            const servicesData = await servicesRes.json();
            const subcategoriesData = await subcategoriesRes.json();

            setServices(servicesData);
            setSubcategories(subcategoriesData);
        } catch (err) {
            setError('Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e, setPreview) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const formData = new FormData(e.target);
            
            // Manejar el estado activo
            formData.append('is_active', e.target.querySelector('#is_active').checked);
            
            // Manejar las imágenes de forma segura
            const image1Input = e.target.querySelector('#image_1');
            const image2Input = e.target.querySelector('#image_2');
    
            if (editingService) {
                if (image1Input && !image1Input.files.length) {
                    formData.delete('image_1');
                }
                if (image2Input && !image2Input.files.length) {
                    formData.delete('image_2');
                }
    
                const response = await fetch(
                    `${BASE_URL}/api/services/${editingService.id}/`, 
                    {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: formData
                    }
                );
    
                if (!response.ok) {
                    const errorData = await response.text();
                    throw new Error(errorData);
                }
            } else {
                const response = await fetch(
                    `${BASE_URL}/api/services/`, 
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: formData
                    }
                );
    
                if (!response.ok) {
                    throw new Error('Error al crear el servicio');
                }
            }
    
            await fetchData();
            resetForm(e.target);
            setEditingService(null);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este servicio?')) return;
        
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/services/${id}/`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Error al eliminar');
            
            await fetchData();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (service) => {
        setEditingService(service);
        setPreviewImage1(service.image_1 ? getImageUrl(service.image_1) : null);
        setPreviewImage2(service.image_2 ? getImageUrl(service.image_2) : null);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const resetForm = (form) => {
        form.reset();
        setEditingService(null);
        setPreviewImage1(null);
        setPreviewImage2(null);
    };

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return null;
        if (imageUrl.startsWith('http')) return imageUrl;
        return `${BASE_URL}${imageUrl}`;
    };

    return (
        <div className="admin-panel">
            <h1>Gestión de Servicios</h1>
            
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => setError('')} className="error-close">×</button>
                </div>
            )}

            {loading && <div className="loading-message">Cargando...</div>}

            <div className="form-section">
                <h2>{editingService ? 'Editar Servicio' : 'Nuevo Servicio'}</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="subcategory">Subcategoría:</label>
                        <select
                            id="subcategory"
                            name="subcategory"
                            required
                            disabled={loading}
                            defaultValue={editingService?.subcategory || ''}
                        >
                            <option value="">Selecciona una subcategoría</option>
                            {subcategories.map(subcategory => (
                                <option key={subcategory.id} value={subcategory.id}>
                                    {subcategory.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">Título:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            disabled={loading}
                            defaultValue={editingService?.title || ''}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descripción:</label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            disabled={loading}
                            defaultValue={editingService?.description || ''}
                            style={{ whiteSpace: 'pre-wrap' }} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="order">Orden:</label>
                        <input
                            type="number"
                            id="order"
                            name="order"
                            disabled={loading}
                            defaultValue={editingService?.order || 0}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image_1">Imagen 1:</label>
                        <input
                            type="file"
                            id="image_1"
                            name="image_1"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, setPreviewImage1)}
                            disabled={loading}
                            className="file-input"
                        />
                        {previewImage1 && (
                            <div className="image-preview">
                                <img src={previewImage1} alt="Vista previa 1" />
                            </div>
                        )}
                    </div>

                    <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                id="is_active"
                                name="is_active"
                                checked={editingService ? editingService.is_active : true}
                                onChange={(e) => setEditingService(prev => 
                                    prev ? {...prev, is_active: e.target.checked} : prev
                                )}
                            />
                            Servicio Activo
                        </label>
                    </div>

                    <div className="form-buttons">
                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? 'Guardando...' : editingService ? 'Actualizar' : 'Guardar'}
                        </button>
                        {editingService && (
                            <button 
                                type="button" 
                                onClick={() => resetForm(document.querySelector('.form'))}
                                className="cancel-button"
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="list-section">
                <h2>Servicios Existentes</h2>
                {services.length === 0 ? (
                    <p className="no-data">No hay servicios registrados</p>
                ) : (
                    <div className="services-list">
                        {services.map(service => (
                            <div key={service.id} className="service-item">
                                <div className="service-images">
                                    {service.image_1 && (
                                        <div className="service-image">
                                            <img 
                                                src={getImageUrl(service.image_1)} 
                                                alt={`${service.title} - 1`}
                                                onError={(e) => {
                                                    console.log('Error loading image:', service.image_1);
                                                    e.target.onerror = null;
                                                    e.target.src = '/placeholder.jpg';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="service-content">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <p className="service-subcategory">
                                        Subcategoría: {subcategories.find(s => s.id === service.subcategory)?.name}
                                    </p>
                                    <div className="service-meta">
                                        <span className="order-badge">Orden: {service.order}</span>
                                        <span className={`status-badge ${service.is_active ? 'active' : 'inactive'}`}>
                                            {service.is_active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </div>
                                    <div className="category-actions">
                                        <button 
                                            onClick={() => handleEdit(service)}
                                            className="edit-button"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(service.id)}
                                            className="delete-button"
                                        >
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

export default ServicePanel;