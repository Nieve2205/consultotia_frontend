// BrochurePanel.js
import React, { useState, useEffect } from 'react';
import '../AdminPanel.css';

const BASE_URL = 'http://127.0.0.1:8000';

const BrochurePanel = () => {
    const [brochures, setBrochures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingBrochure, setEditingBrochure] = useState(null);

    useEffect(() => {
        fetchBrochures();
    }, []);

    const fetchBrochures = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/brochures/`);
            const data = await response.json();
            setBrochures(data);
        } catch (err) {
            setError('Error al cargar los brochures');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const formData = new FormData(e.target);
            
            // Debug: ver qué datos se están enviando
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
    
            if (editingBrochure) {
                const fileInput = e.target.querySelector('#file');
                console.log('¿Hay nuevo archivo?', fileInput.files.length > 0);
                
                // Solo eliminar el archivo si no hay uno nuevo
                if (!fileInput.files.length) {
                    formData.delete('file');
                }
            }
    
            const url = editingBrochure 
                ? `${BASE_URL}/api/brochures/${editingBrochure.id}/`
                : `${BASE_URL}/api/brochures/`;
    
            console.log('URL:', url);
    
            const response = await fetch(url, {
                method: editingBrochure ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });
    
            // Debug: ver la respuesta completa
            console.log('Status:', response.status);
            const responseText = await response.text();
            console.log('Response:', responseText);
    
            if (!response.ok) {
                throw new Error(`Error al guardar: ${responseText}`);
            }
    
            await fetchBrochures();
            resetForm(e.target);
            setEditingBrochure(null);
        } catch (err) {
            console.error('Error completo:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este brochure?')) return;
        
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/brochures/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Error al eliminar');
            await fetchBrochures();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = (form) => {
        form.reset();
        setEditingBrochure(null);
    };

    const getFileUrl = (fileUrl) => {
        if (!fileUrl) return null;
        if (fileUrl.startsWith('http')) return fileUrl;
        return `${BASE_URL}${fileUrl}`;
    };

    return (
        <div className="admin-panel">
            <h1>{editingBrochure ? 'Editar Brochure' : 'Gestión de Brochures'}</h1>
            
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => setError('')} className="error-close">×</button>
                </div>
            )}

            <div className="form-section">
                <h2>{editingBrochure ? 'Editar Brochure' : 'Nuevo Brochure'}</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="title">Título:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            disabled={loading}
                            defaultValue={editingBrochure?.title || ''}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="file">Archivo PDF:</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            accept=".pdf"
                            onChange={(e) => {
                                // Validación del tipo de archivo
                                const file = e.target.files[0];
                                if (file && file.type !== 'application/pdf') {
                                    setError('Solo se permiten archivos PDF');
                                    e.target.value = '';
                                }
                            }}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? 'Guardando...' : (editingBrochure ? 'Actualizar' : 'Guardar')}
                        </button>
                        {editingBrochure && (
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
                <h2>Brochures Existentes</h2>
                <div className="brochures-list">
                    {brochures.map(brochure => (
                        <div key={brochure.id} className="brochure-item">
                            <div className="brochure-content">
                                <h3>{brochure.title}</h3>
                                <div className="brochure-actions">
                                    <a 
                                        href={getFileUrl(brochure.file)} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="view-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(getFileUrl(brochure.file), '_blank', 'noopener,noreferrer');
                                        }}
                                    >
                                        Ver PDF
                                    </a>
                                    <button 
                                        onClick={() => setEditingBrochure(brochure)}
                                        className="edit-button"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(brochure.id)}
                                        className="delete-button"
                                    >
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

export default BrochurePanel;