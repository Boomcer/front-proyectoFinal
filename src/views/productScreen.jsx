import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProducto } from '../helpers/apiProductos'
import { Link } from 'react-router-dom'

const ProductScreen = () => {
  const {id} = useParams();
  const [producto , setProducto] = useState(null);

  useEffect(() => {
    getProducto(id)
    .then((data) => {setProducto(data);

    })
    .catch((error) => {
      console.error('Error al obtener el producto:', error);
    });

  }, [id]);

  if (!producto) {
    return <div className="container mt-4">Cargando producto...</div>;
  }



  return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src={producto.producto.img}
            alt={producto.producto.nombre}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '500px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="">{producto.producto.nombre}</h1>
          <p className="text-muted mb-4">
            <strong>Categoría:</strong> {producto.producto.categoria.nombre}
          </p>
          <p className="lead">
            <strong>Descripción:</strong> {producto.producto.descripcion}
          </p>
          <p className="h4 mt-4 text-primary">
            <strong>Precio:</strong> ${producto.producto.precio}
          </p>
          <div className="mt-4">
            <Link to={'/carrito'}>
              <button
                className="btn btn-lg btn-dark shadow">
                Agregar al carrito
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductScreen