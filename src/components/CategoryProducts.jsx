import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerCategorias } from '../helpers/apiProductos.js';
import '../css/CategoryProducts.css';

function CategoryProducts() {
  const { categoryId } = useParams(); // Obtiene el ID de la categoría desde la URL
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await obtenerCategorias(categoryId, 20, 0);
        setProductos(data.productos || []);
      } catch (error) {
        setError(error.message);
      }
    };

    if (categoryId) fetchProductos();
  }, [categoryId]);

  return (
    <div className="products-container">
      <h2 className="products-title">Productos de la Categoría</h2>

      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <div className="products-grid">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <div key={producto._id} className="product-card">
                <img 
                  src={producto.imagen || 'https://via.placeholder.com/200'} 
                  alt={producto.nombre} 
                  className="product-image"
                />
                <h3 className="product-name">{producto.nombre}</h3>
                <p className="product-price">${producto.precio}</p>
              </div>
            ))
          ) : (
            <p className="no-products">No hay productos en esta categoría.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;
