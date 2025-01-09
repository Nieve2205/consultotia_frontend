// SubcategoryPanel.js
import React, { useState, useEffect } from 'react';
import '../ServicePanel.css';

const BASE_URL = 'http://127.0.0.1:8000';

const SubcategoryPanel = () => {
    const [subcategories, setSubcategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingSubcategory, setEditingSubcategory] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [subcategoriesRes, categoriesRes] = await Promise.all([
                fetch(`${BASE_URL}/api/service-subcategories/`),
                fetch(`${BASE_URL}/api/service-categories/`)
            ]);

            const subcategoriesData = await subcategoriesRes.json();
            const categoriesData = await categoriesRes.json();

            setSubcategories(subcategoriesData);
            setCategories(categoriesData);
        } catch (err) {
            setError('Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            description: formData.get('description'),
            category: formData.get('category'),
            order: parseInt(formData.get('order')) || 0
        };

        try {
            const url = editingSubcategory 
                ? `${BASE_URL}/api/service-subcategories/${editingSubcategory.id}/`
                : `${BASE_URL}/api/service-subcategories/`;

            const response = await fetch(url, {
                method: editingSubcategory ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Error al guardar');

            await fetchData();
            resetForm(e.target);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar esta subcategoría?')) return;
        
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/service-subcategories/${id}/`, {
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

    const handleEdit = (subcategory) => {
        setEditingSubcategory(subcategory);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const resetForm = (form) => {
        form.reset();
        setEditingSubcategory(null);
    };

    return (
        <div className="admin-panel">
            <h1>Gestión de Subcategorías</h1>
            
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => setError('')} className="error-close">×</button>
                </div>
            )}

            {loading && <div className="loading-message">Cargando...</div>}

            <div className="form-section">
                <h2>{editingSubcategory ? 'Editar Subcategoría' : 'Nueva Subcategoría'}</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="category">Categoría:</label>
                        <select
                            id="category"
                            name="category"
                            required
                            disabled={loading}
                            defaultValue={editingSubcategory?.category || ''}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            disabled={loading}
                            defaultValue={editingSubcategory?.name || ''}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descripción:</label>
                        <textarea
                            id="description"
                            name="description"
                            disabled={loading}
                            defaultValue={editingSubcategory?.description || ''}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="order">Orden:</label>
                        <input
                            type="number"
                            id="order"
                            name="order"
                            disabled={loading}
                            defaultValue={editingSubcategory?.order || 0}
                        />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? 'Guardando...' : editingSubcategory ? 'Actualizar' : 'Guardar'}
                        </button>
                        {editingSubcategory && (
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
                <h2>Subcategorías Existentes</h2>
                {subcategories.length === 0 ? (
                    <p className="no-data">No hay subcategorías registradas</p>
                ) : (
                    <div className="categories-list">
                        {subcategories.map(subcategory => (
                            <div key={subcategory.id} className="category-item">
                                <div className="category-content">
                                    <h3>{subcategory.name}</h3>
                                    <p>{subcategory.description || 'Sin descripción'}</p>
                                    <p className="category-relation">
                                        Categoría: {categories.find(c => c.id === subcategory.category)?.name}
                                    </p>
                                    <span className="order-badge">Orden: {subcategory.order}</span>
                                    <div className="category-actions">
                                        <button 
                                            onClick={() => handleEdit(subcategory)}
                                            className="edit-button"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(subcategory.id)}
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

export default SubcategoryPanel;