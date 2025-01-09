// BlogPostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../BlogDetail.css';

const BASE_URL = 'https://consultoria.up.railway.app';

const BlogPostDetail = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { slug } = useParams();

    useEffect(() => {
        fetchPost();
    }, [slug]);

    const fetchPost = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/news/${slug}/`);
            if (!response.ok) throw new Error('Noticia no encontrada');
            const data = await response.json();
            setPost(data);
        } catch (err) {
            setError(err.message);
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
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    if (loading) return <div className="post-loading">Cargando...</div>;
    if (error) return <div className="post-error">{error}</div>;
    if (!post) return <div className="post-error">Noticia no encontrada</div>;

    return (
        <div className="post-detail-container">
            <div className="post-detail-header">
                <Link to="/blog" className="back-to-blog">← Volver al Blog</Link>
                <h1>{post.title}</h1>
                <div className="post-meta">
                    <span className="post-date">{formatDate(post.publication_date)}</span>
                </div>
            </div>

            {post.image && (
                <div className="post-detail-image">
                    <img 
                        src={getImageUrl(post.image)} 
                        alt={post.title}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder.jpg';
                        }}
                    />
                </div>
            )}

            <div className="post-detail-content">
                <div className="post-detail-text">
                    {post.description.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPostDetail;