import React from 'react';

const Paginacion = ({ total, limite, desde, onCambiarPagina }) => {
  const totalPaginas = Math.ceil(total / limite);
  const paginaActual = Math.floor(desde / limite) + 1;

  return (
    <nav aria-label="Navegación de páginas">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onCambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>
        </li>
        
        {[...Array(totalPaginas)].map((_, index) => (
          <li
            key={index}
            className={`page-item ${paginaActual === index + 1 ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => onCambiarPagina(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onCambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginacion;