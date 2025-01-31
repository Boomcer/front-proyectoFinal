import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';
import LogoChico from '../assets/img/LogoChico.jpeg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const updateFavoritesCount = () => {
      const favorites = JSON.parse(localStorage.getItem('favoritos')) || [];
      setFavoritesCount(favorites.length);
    };

    updateFavoritesCount();
    window.addEventListener('storage', updateFavoritesCount);

    return () => {
      window.removeEventListener('storage', updateFavoritesCount);
    };
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('carrito')) || [];
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handlePerfilClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/perfil");
    } else {
      alert("Debe iniciar sesión para poder ingresar a este área");
      navigate('/login');
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <button 
          className={`menu-button ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <Link className="logo" to="/">
          <img src={LogoChico} alt="Logo" />
        </Link>

        <div className="search-bar">
          <input 
            type="text" 
            placeholder="¿Qué estás buscando?" 
            aria-label="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" aria-label="Buscar" onClick={handleSearch}>
            <i className="bi bi-search"></i>
          </button>
        </div>

        <div className="user-actions">
          <NavLink to="/favoritos" className="icon-button" aria-label="Favoritos">
            <i className="bi bi-heart-fill text-danger"></i>
            <span className="badge bg-danger">{favoritesCount}</span>
          </NavLink>
          <div className="icon-button" aria-label="Mi cuenta">
            {isLoggedIn ? (
              <>
                <i className="bi bi-person-circle dropdown-toggle" data-bs-toggle="dropdown"></i>
                <ul className="dropdown-menu">
                  <li><button className="dropdown-item" onClick={handleLogout}>Desconectarse</button></li>
                </ul>
              </>
            ) : (
              <i className="bi bi-person-circle" onClick={() => navigate('/login')}></i>
            )}
          </div>
          <NavLink to="/carrito" className="icon-button cart" aria-label="Mi carrito">
            <i className="bi bi-cart-fill"></i>
            <span className="badge bg-danger">{cartCount}</span>
          </NavLink>
        </div>
      </div>

      <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/categorias">Categorías</NavLink></li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
          <li><NavLink to="/perfil" onClick={handlePerfilClick}>Mi Perfil</NavLink></li>
          <li><NavLink to="/admin">Admin</NavLink></li>
        </ul>
      </nav>

      {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </header>
  );
};

export default Header;
