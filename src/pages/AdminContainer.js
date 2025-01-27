// AdminContainer.js
import React, { useState } from 'react';
import AdminPanel from '../components/AdminPanel';
import SubcategoryPanel from '../components/SubcategoryPanel';
import ServicePanel from '../components/ServicePanel';
import BrochurePanel from '../components/BrochurePanel';
import BlogPanel from '../components/BlogPanel';
import '../AdminPanel.css';

const AdminContainer = () => {
    const [activeTab, setActiveTab] = useState('categories');

    return (
        <div className="admin-container">
            <div className="admin-tabs">
                <button 
                    className={`tab-button ${activeTab === 'categories' ? 'active' : ''}`}
                    onClick={() => setActiveTab('categories')}
                >
                    Categorías
                </button>
                <button 
                    className={`tab-button ${activeTab === 'subcategories' ? 'active' : ''}`}
                    onClick={() => setActiveTab('subcategories')}
                >
                    Subcategorías
                </button>
                <button 
                    className={`tab-button ${activeTab === 'services' ? 'active' : ''}`}
                    onClick={() => setActiveTab('services')}
                >
                    Servicios
                </button>
                <button 
                    className={`tab-button ${activeTab === 'brochures' ? 'active' : ''}`}
                    onClick={() => setActiveTab('brochures')}
                >
                    Brochures
                </button>
                <button 
                    className={`tab-button ${activeTab === 'blog' ? 'active' : ''}`}
                    onClick={() => setActiveTab('blog')}
                >
                    Blog
                </button>
            </div>

            <div className="admin-content">
                {activeTab === 'categories' && <AdminPanel />}
                {activeTab === 'subcategories' && <SubcategoryPanel />}
                {activeTab === 'services' && <ServicePanel />}
                {activeTab === 'brochures' && <BrochurePanel />}
                {activeTab === 'blog' && <BlogPanel />}
            </div>
        </div>
    );
};

export default AdminContainer;