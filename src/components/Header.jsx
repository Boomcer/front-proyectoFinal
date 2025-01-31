import { useState, useEffect } from 'react';
import '../css/header.css';
import LogoChico from '../assets/img/LogoChico.jpeg';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

        <div className="logo">
          <img src={LogoChico} alt="logo" />
        </div>

        <div className="search-bar">
          <input 
            type="text" 
            placeholder="¿Qué estás buscando?"
            aria-label="Buscar"
          />
          <button className="search-button" aria-label="Buscar">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </div>

        <div className="user-actions">
          <a href="/favoritos" className="icon-button" aria-label="Favoritos">
            <i className="bi bi-heart-fill text-danger"></i>
            <span className="badge bg-danger">0</span>
          </a>
          <a href="/perfil" className="icon-button" aria-label="Mi cuenta">
            <i className="bi bi-person-circle"></i>
          </a>
          <a href="/carrito" className="icon-button cart" aria-label="Mi carrito">
            <i className="bi bi-cart-fill"></i>
            <span className="badge bg-danger">0</span>
          </a>
        </div>
      </div>

      <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/categorias">Categorías</a></li>
          <li><a href="/nosotros">Nosotros</a></li>
          <li><a href="/admin">Admin</a></li>
        </ul>
      </nav>
      
      {isMenuOpen && (
        <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </header>
  );
}

export default Header;
