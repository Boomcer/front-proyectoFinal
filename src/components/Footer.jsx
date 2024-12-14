import React from 'react';
import '../css/Footer.css';
import { NavLink, Link } from 'react-router-dom';
import LogoChico from '../assets/img/LogoChico.jpeg';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-cta pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="fas fa-map-marker-alt"></i>
                <div className="cta-text">
                  <h4>General Paz Moda</h4>
                  <span>Gral. José María Paz 576</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="fas fa-phone"></i>
                <div className="cta-text">
                  <h4>Contacto</h4>
                  <span>3815783030</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="far fa-envelope-open"></i>
                <div className="cta-text">
                  <h4>Correo</h4>
                  <span>generalpazmoda@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-content pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <Link to="/">
                    <img className="w-50" id="Logo" src={LogoChico} alt="Logo" />
                  </Link>
                </div>
                <div className="footer-text">
                  <p>
                    General Paz Moda
                    Tu tienda de moda en línea para encontrar las últimas tendencias y estilos. Nos especializamos en ofrecer ropa moderna y accesible para todas las ocasiones. ¡Compra fácil, rápido y seguro desde cualquier lugar!
                  </p>
                </div>
                <div className="footer-social-icon">
                  <span>Siguenos</span>
                  <Link to="*">
                    <i className="fab fa-facebook-f facebook-bg"></i>
                  </Link>
                  <Link to="*">
                    <i className="fab fa-twitter twitter-bg"></i>
                  </Link>
                  <Link to="*">
                    <i className="fab fa-google-plus-g google-bg"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Navegacion</h3>
                </div>
              <div className="footerlist">
                <ul>
                  <li><Link to="/">Inicio</Link></li>
                  <li><Link to="/nosotros">Sobre Nosotros</Link></li>
                  <li><Link to="/">Productos</Link></li>
                  <li><Link to="*">Preguntas</Link></li>
                  <li><Link to="*">Contacto</Link></li>
                  <li><Link to="*">Politicas</Link></li>
                </ul>
              </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
              <div className="copyright-text">
                <p>
                  General Paz Moda &copy; 2024, Todos los derechos reservados{' '}
                  <a href="https://codepen.io/anupkumar92/">Aqui</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
