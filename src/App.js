import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateAdminRoute from './components/PrivateAdminRoute';
import Home from './pages/Home';
import AdminPanel from './components/AdminPanel';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Nosotros from './pages/Nosotros';
import Experiencia from './pages/Experiencia';
import Contacto from './pages/Contacto';
import WhatsappButton from './components/WhatsappButton';
import Servicios from './pages/Servicios';
import ServicioDetalle from './pages/ServicioDetalle';
import LoginForm from './pages/LoginForm';
import AdminContainer from './components/AdminContainer';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogDetails';

const AppContent = () => {
  const location = useLocation();
  const hideNavAndFooter = ['/login'].includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
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
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;