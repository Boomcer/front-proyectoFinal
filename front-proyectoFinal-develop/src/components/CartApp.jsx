import React, {useState, useEffect} from 'react'
// import {destacados} from '../helpers/apiProductos'

const CartApp = ({productos, total}) => {
    // const [productos, setProductos] = useState([]);
    // const [total, setTotal] = useState(0);

    // useEffect(() =>{
    //     async function cargarProductos() {
    //         const productosData = await destacados();
    //         setProductos(productosData);
    //     }
    //     cargarProductos();
    // }, []);

    // useEffect(() => {
    //     // Recalcular el total cuando cambia la lista de productos
    //     const sumaPrecios = productos.reduce((acc, producto) => acc + producto.precio, 0);
    //     setTotal(sumaPrecios);
    //   }, [productos]);

  return (
    <div className='mt-3'>
        <ul>
            {
               productos.length === 0 ? (
                <div>
                    <div className="col text-center carrito-vacio">
                        <p >El carrito está vacío</p>
                    </div>
                </div>
               ) : (
                productos.map((producto) => (
                    <li key={producto.id} className="producto-item">
                      <div className="producto-contenedor reducido bg-secondary">

                        <div className="producto-imagen me-5">
                          <img
                            src={producto.img}
                            alt={`Imagen de ${producto.nombre}`}
                            className="imagen"
                          />
                        </div>

                        <div className="producto-detalles">
                          <h6 className="nombre">{producto.nombre}</h6>
                          <p className="descripcion">{producto.descripcion}</p>
                          <p className="precio">Precio: ${producto.precio}</p>
                        </div>

                        <div className="producto-boton">
                          <button className="btn-eliminar" onClick={() => eliminarProducto(producto.id)}>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))



               )
            }
        </ul>

        <div className="row text-center">

                <h2>Total: ${total}</h2>

                <div className="mt-3">
                    {productos.length !== 0 && (
                        <div>




                        </div>

                    )}

                </div>



      </div>



    </div>
  )
}

export default CartApp