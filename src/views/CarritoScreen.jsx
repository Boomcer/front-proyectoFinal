import React, {useEffect, useState} from 'react'
import '../css/cart.css'
import CartApp from '../components/CartApp'
import ModalCartApp from '../components/ModalCartApp'
import {destacados} from '../helpers/apiProductos'


const carritoScreen = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() =>{
      async function cargarProductos() {
          const productosData = await destacados();
          setProductos(productosData);
      }
      cargarProductos();
  }, []);

  useEffect(() => {
      // Recalcular el total cuando cambia la lista de productos
      const sumaPrecios = productos.reduce((acc, producto) => acc + producto.precio, 0);
      setTotal(sumaPrecios);
    }, [productos]);

  return (
    <div className='container'>
        <div className="row">
            <h1 className='text-center mt-5'>
                🛒Carrito De Compras🛒
            </h1>
        </div>
        <div >
          <CartApp productos={productos} total={total} />
        </div>
        <div className="row">
            <div className="col text-center mb-5 mt-0">
                <ModalCartApp total={total} />
            </div>
        </div>


    </div>
  )
}

export default carritoScreen