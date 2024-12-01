import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import LogoChico from '../assets/img/LogoChico.jpeg';



const MenuApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
  const [favoritesCount, setFavoritesCount] = useState(0); // Estado para el contador de favoritos
  const navigate = useNavigate(); // Hook para redirigir

  // Verificar si hay un token en localStorage al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Actualiza el estado basado en si el token existe o no
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLoginClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate('/login');
    }
  };

  const handlePerfilClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/perfil");
    } else{
      alert("Debe iniciar sesión para poder ingresar a este área");
      navigate('/login');
    }
    };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img className="w-50" id="Logo" src={LogoChico} alt="Logo" />
        </Link>

        {/* Botón colapsable */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Menús principales a la izquierda */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink 
              to="/" 
              className="nav-link">
              Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
              to="/categorias" 
              className="nav-link">
              Categorías
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
              to="/nosotros" 
              className="nav-link">
              Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
              to="/perfil" 
              className="nav-link" 
              onClick={handlePerfilClick}>
              MiPerfil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
              to="/admin" 
              className="nav-link">
                <i className="bi bi-gear"></i>
              </NavLink>
            </li>
          </ul>

          {/* Menús a la derecha */}
          <ul className="navbar-nav ms-auto d-flex flex-row align-items-center">
            <li className="nav-item mx-2">
              <NavLink
                to="/favoritos"
                className="nav-link"
                style={{ textDecoration: "none" }}
              >
                <i className="bi bi-heart-fill text-danger"></i>
                <span className="ms-1 badge bg-danger">{favoritesCount}</span>
              </NavLink>
            </li>
            <li className="nav-item dropdown mx-2">
              {isLoggedIn ? (
                <>
                  {/* Icono y menú desplegable si está logueado */}
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userMenu"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ textDecoration: "none" }}
                  >
                    <i className="bi bi-person-circle"></i>
                  </a>
                  <ul 
                  className="dropdown-menu" 
                  aria-labelledby="userMenu">
                    <li>
                      <button 
                      className="dropdown-item" 
                      onClick={handleLogout}>
                      Desconectarse
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                // Redirigir al login si no está logueado
                <i
                  className="bi bi-person-circle nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={handleLoginClick}
                ></i>
              )}
            </li>
            <li className="nav-item mx-2">
              <NavLink
                to="/carrito"
                className="nav-link"
                style={{ textDecoration: "none" }}
              >
                <i className="bi bi-cart-fill"></i>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MenuApp;

