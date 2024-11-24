import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoChico from '../assets/img/LogoChico.jpeg';


const MenuApp = () => {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div  id="Menu" className="container-fluid">
          <Link className="nav-link" to="/" target='_blank'>
         
         <img className="w-50" id="Logo" src={LogoChico}/>
        
         </Link>

         <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation">

      <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse container" id="navbarNav">
          <ul id='ContenedorMenu' className="navbar-nav">
          <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/nosotros" className="nav-link">
            Nosotros
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin" className="nav-link">
            Admin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/favoritos" className="nav-link">
            Favoritos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/carrito" className="nav-link">
            Carrito
          </NavLink>
        </li>
         </ul>
          </div>
      </div>
    </nav>
  )
};

export default MenuApp;