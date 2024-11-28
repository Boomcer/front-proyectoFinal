import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProducto } from '../helpers/apiProductos'

const ProductScreen = () => {
  const {id} = useParams();
  const [producto , setProducto] = useState(null);

  useEffect(() => {
    getProducto(id)
    .then((data) => {setProducto(data);
      console.log(data)

    })
    .catch((error) => {
      console.error('Error al obtener el producto:', error);
    });
    
    console.log(id)
  }, [id]);

  if (!producto) {
    return <div className="container mt-4">Cargando producto...</div>;
  }
  


  return (
    <div className="container mt-4">
      <h1>{producto.nombre}</h1>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="img-fluid my-3"
      />
      <p><strong>Precio:</strong> ${producto.precio}</p>
      <p><strong>Categoría:</strong> {producto.categoria}</p>
      <p><strong>Descripción:</strong> {producto.descripcion}</p>
    </div>
  )
}

export default ProductScreen