import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials, setAdminStatus } from '../store/authSlice';

const styles = `
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg,rgb(30, 50, 114) 0%,rgb(255, 115, 0) 100%);
    padding: 20px;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }

  .login-box {
    width: 100%;
    max-width: 420px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .login-title {
    color: #ffffff;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 40px;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .error-message {
    background: rgba(255, 82, 82, 0.1);
    color: #ff5252;
    padding: 15px;
    border-radius: 16px;
    margin-bottom: 25px;
    border: 1px solid rgba(255, 82, 82, 0.2);
    font-size: 14px;
  }

  .form-group {
    margin-bottom: 25px;
    position: relative;
  }

  .form-label {
    display: block;
    color: #ffffff;
    margin-bottom: 12px;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .input-container {
    position: relative;
  }

  .form-input {
    width: 100%;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid rgba(30, 60, 114, 0.3);
    border-radius: 16px;
    font-size: 16px;
    color: #1e3c72;
    transition: all 0.3s ease;
    outline: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .form-input:focus {
    border-color: #ff7f50;
    box-shadow: 0 0 0 4px rgba(255, 127, 80, 0.2);
  }

  .form-input::placeholder {
    color: #94a3b8;
  }

  .submit-button {
    width: 100%;
    padding: 16px;
    background: #ff7f50;
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(255, 127, 80, 0.3);
  }

  .submit-button:hover {
    background: #ff6b3d;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 127, 80, 0.4);
  }

  .submit-button:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(255, 127, 80, 0.3);
  }

  @media (max-width: 480px) {
    .login-box {
      padding: 30px 20px;
    }
  }
`;

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.password) {
      setError('Por favor complete todos los campos');
      return;
    }

    try {
      const response = await fetch('https://consultoria.up.railway.app/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.access) {
        // Guardar en Redux
        dispatch(setCredentials({
          token: data.access,
          user: formData.username
        }));

        // También guardar en localStorage
        localStorage.setItem('token', data.access);

        const adminCheck = await fetch('https://consultoria.up.railway.app/api/check-admin/', {
          headers: {
            'Authorization': `Bearer ${data.access}`,
            'Content-Type': 'application/json',
          },
        });

        if (adminCheck.ok) {
          const adminData = await adminCheck.json();
          
          if (adminData.is_admin) {
            dispatch(setAdminStatus(true));
            navigate('/admin');
          } else {
            setError('No tienes permisos de administrador');
          }
        } else {
          setError('No tienes permisos de administrador');
        }
      } else {
        setError(data.detail || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al conectar con el servidor');
    }
};

  return (
    <>
      <style>{styles}</style>
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Iniciar Sesión</h2>
          
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Usuario</label>
              <div className="input-container">
                <input
                  type="text"
                  name="username"
                  className="form-input"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <div className="input-container">
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;