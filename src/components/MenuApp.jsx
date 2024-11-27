import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoChico from '../assets/img/LogoChico.jpeg';

const MenuApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para el login
  const [favoritesCount, setFavoritesCount] = useState(0); // Estado para el contador de favoritos

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    setIsLoggedIn(false);
    console.log("Usuario desconectado");
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
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/categorias" className="nav-link">
                Categorías
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/nosotros" className="nav-link">
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin" className="nav-link">
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
              ) : (
                <NavLink
                  to="/login"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                >
                  <i className="bi bi-person-circle"></i>
                </NavLink>
              )}
              {isLoggedIn && (
                <ul className="dropdown-menu" aria-labelledby="userMenu">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Desconectarse
                    </button>
                  </li>
                </ul>
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
