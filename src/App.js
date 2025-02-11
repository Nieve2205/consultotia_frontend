import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateAdminRoute from '../src/PrivateAdminRoute';
import Home from './pages/Home';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Nosotros from './pages/Nosotros';
import Experiencia from './pages/Experiencia';
import Contacto from './pages/Contacto';
import WhatsappButton from './components/WhatsappButton';
import Servicios from './pages/Servicios';
import ServicioDetalle from './pages/ServicioDetalle';
import LoginForm from './pages/LoginForm';
import AdminContainer from './pages/AdminContainer';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogDetails';
import { Helmet, HelmetProvider } from 'react-helmet-async'; 

const AppContent = () => {
  const location = useLocation();
  const hideNavAndFooter = ['/login'].includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Helmet>
        <title>Corvel's Consultoria - Servicios de Consultoría Técnica</title>
        <meta name="description" content="Empresa especializada en consultoría, asesoría y capacitaciones de Seguridad, Salud Ocupacional, Medio Ambiente, Calidad, Ingeniería y Proyectos, entre otros." />
        <meta name="google-site-verification" content="S47Kam1yL3iWAZ6XXxuBtBzk_hrVAi5fnQCkHbHOuFg" />
        {/* Añade más meta tags para mejorar el SEO */}
        <meta name="keywords" content="consultoría, empresarial, SST, seguridad laboral, procesos, mejora continua, Perú" />
        <meta property="og:title" content="Corvel's Consultoria" />
        <meta property="og:description" content="Servicios profesionales de consultoría empresarial" />
        <meta property="og:url" content="https://corvelsconsultoria.vercel.app" />
      </Helmet>
      {!hideNavAndFooter && <WhatsappButton />}
      {!hideNavAndFooter && <NavigationBar />}
      <div className={`content-container ${!hideNavAndFooter ? 'mb-5' : ''}`}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />}/> 
          <Route path="/experiencia" element={<Experiencia/>} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/:slug' element={<BlogPostDetail />} />
          <Route path='/servicios/:id' element={<ServicioDetalle />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin" element={
            <PrivateAdminRoute>
              <AdminContainer />
            </PrivateAdminRoute>
          } />
        </Routes>
      </div>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <HelmetProvider> 
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
};

export default App;