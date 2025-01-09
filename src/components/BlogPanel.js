// BlogPanel.js
import React, { useState, useEffect } from 'react';
import '../AdminPanel.css';

const BASE_URL = 'http://127.0.0.1:8000';

const BlogPanel = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingNews, setEditingNews] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/news/`);
            const data = await response.json();
            setNews(data);
        } catch (err) {
            setError('Error al cargar las noticias');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const formData = new FormData(e.target);
            
            // Generar el slug a partir del título
            const title = formData.get('title');
            const slug = title.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');
            
            formData.append('slug', slug);
    
            // Si estamos editando y no se seleccionó una nueva imagen, no enviarla
            if (editingNews) {
                const imageInput = e.target.querySelector('input[type="file"]');
                if (!imageInput.files.length) {
                    formData.delete('image');
                }
            }
    
            const token = localStorage.getItem('token');
            const url = editingNews 
                ? `${BASE_URL}/api/news/${editingNews.id}/`
                : `${BASE_URL}/api/news/`;
    
            const response = await fetch(url, {
                method: editingNews ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
    
            if (!response.ok) {
                // Log para debugging
                console.log('Response status:', response.status);
                const errorText = await response.text();
                console.log('Error response:', errorText);
                throw new Error('Error al guardar la noticia');
            }
    
            await fetchNews();
            resetForm(e.target);
            setEditingNews(null);
            setPreviewImage(null);
        } catch (err) {
            console.error('Error completo:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar esta noticia?')) return;
        
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/news/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (!response.ok) throw new Error('Error al eliminar la noticia');
            await fetchNews();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (news) => {
        setEditingNews(news);
        if (news.image) {
            setPreviewImage(getImageUrl(news.image));
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = (form) => {
        form.reset();
        setEditingNews(null);
        setPreviewImage(null);
    };

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return null;
        if (imageUrl.startsWith('http')) return imageUrl;
        return `${BASE_URL}${imageUrl}`;
    };

    return (
        <div className="admin-panel">
            <h1>{editingNews ? 'Editar Noticia' : 'Gestión de Blog'}</h1>
            
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => setError('')} className="error-close">×</button>
                </div>
            )}

            {loading && <div className="loading-message">Cargando...</div>}

            <div className="form-section">
                <h2>{editingNews ? 'Editar Noticia' : 'Nueva Noticia'}</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="title">Título:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            disabled={loading}
                            defaultValue={editingNews?.title || ''}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Contenido:</label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            disabled={loading}
                            defaultValue={editingNews?.description || ''}
                            className="form-textarea"
                            rows="6"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Imagen:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={loading}
                            className="form-input"
                        />
                        {previewImage && (
                            <div className="image-preview">
                                <img src={previewImage} alt="Vista previa" />
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="publication_date">Fecha de Publicación:</label>
                        <input
                            type="datetime-local"
                            id="publication_date"
                            name="publication_date"
                            required
                            disabled={loading}
                            defaultValue={editingNews?.publication_date?.slice(0, 16) || new Date().toISOString().slice(0, 16)}
                            className="form-input"
                        />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? 'Guardando...' : (editingNews ? 'Actualizar' : 'Guardar')}
                        </button>
                        {editingNews && (
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
                <h2>Noticias Publicadas</h2>
                {news.length === 0 ? (
                    <p className="no-data">No hay noticias publicadas</p>
                ) : (
                    <div className="news-list">
                        {news.map(item => (
                            <div key={item.id} className="news-item">
                                <div className="news-image-container">
                                    {item.image && (
                                        <img 
                                        src={getImageUrl(item.image)} // Usar getImageUrl aquí
                                        alt={item.title}
                                        onError={(e) => {
                                            console.log('Error loading image:', item.image);
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder.jpg';
                                        }}
                                    />
                                    )}
                                </div>
                                <div className="news-content">
                                    <h3 className="news-title">{item.title}</h3>
                                    <p className="news-description">{item.description}</p>
                                    <div className="news-metadata">
                                        <span className="publication-date">
                                            Publicado: {formatDate(item.publication_date)}
                                        </span>
                                    </div>
                                    <div className="news-actions">
                                        <button 
                                            onClick={() => handleEdit(item)}
                                            className="edit-button"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item.id)}
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

export default BlogPanel;