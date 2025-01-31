import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { buscarProductos } from '../helpers/buscar.js';

const ResultadosBusqueda = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResultados = async () => {
      if (query) {
        try {
          const data = await buscarProductos(query);
          setResultados(data.result);
          setError(null);
        } catch (error) {
          setError("No se pudieron cargar los resultados. Inténtalo de nuevo.");
          setResultados([]);
        }
      }
    };

    fetchResultados();
  }, [query]);

  return (
    <div className="resultados-busqueda">
      <h2>Resultados de búsqueda para: "{query}"</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="resultados">
        {resultados.length > 0 ? (
          resultados.map((producto) => (
            <div key={producto._id} className="producto-card">
              <img src={producto.img} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p>Precio: ${producto.precio}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default ResultadosBusqueda;