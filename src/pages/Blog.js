// Blog.js
import React, { useState, useEffect } from 'react';
import '../Blog.css';

const BASE_URL = 'https://consultoria.up.railway.app';

const Blog = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
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

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return null;
        if (imageUrl.startsWith('http')) return imageUrl;
        return `${BASE_URL}${imageUrl}`;
    };

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    if (loading) return <div className="blog-loading">Cargando...</div>;
    if (error) return <div className="blog-error">{error}</div>;

    return (
        <div className="blog-container">
            <div className="blog-header">
                <div className="blog-header-content">
                    <h1>Nuestro Blog</h1>
                    <p>Mantente informado sobre las últimas noticias y actualizaciones</p>
                </div>
            </div>

            {news.length === 0 ? (
                <div className="no-posts">
                    <p>No hay publicaciones disponibles</p>
                </div>
            ) : (
                <div className="posts-grid">
                    {news.map(post => (
                        <article key={post.id} className="post-card">
                            <div className="post-image">
                                {post.image && (
                                    <img 
                                        src={getImageUrl(post.image)} 
                                        alt={post.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder.jpg';
                                        }}
                                    />
                                )}
                            </div>
                            <div className="post-content">
                                <h2>{post.title}</h2>
                                <div className="post-metadata">
                                    <span className="post-date">
                                        {formatDate(post.publication_date)}
                                    </span>
                                </div>
                                <p className="post-description">{post.description}</p>
                                <a href={`/blog/${post.slug}`} className="read-more">
                                    Leer más →
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blog;