import React, { useState, useEffect } from "react";
import { getUsuario } from "../helpers/apiUsuarios"; // Asumimos que esta función ya está definida
import CardProductApp from "../components/CardProductApp"; // Reutilizamos este componente para productos

const CartApp = () => {
  const [carrito, setCarrito] = useState([]); // Estado para los productos del carrito
  const [productos, setProductos] = useState([]); // Estado para los datos completos de los productos
  const [total, setTotal] = useState(0); // Estado para el total del carrito
  const uid = localStorage.getItem("uid"); // Obtener el UID desde el localStorage

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        // Traemos los datos del usuario, incluyendo el carrito
        const usuario = await getUsuario(uid);
        setCarrito(usuario.carrito || []); // Asumimos que `usuario.carrito` es un array de objetos con productoId y cantidad

        // Calculamos el total basado en los precios y cantidades de los productos del carrito
        if (usuario.carrito) {
          const sumaTotal = usuario.carrito.reduce(
            (acc, item) => acc + item.producto.precio * item.cantidad,
            0
          );
          setTotal(sumaTotal);
        }
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };
    fetchCarrito();
  }, [uid]);

  const eliminarProducto = async (productoId) => {
    try {
      // Implementar la lógica para eliminar productos del carrito en el backend
      // Actualizar el carrito después de la eliminación
      const nuevoCarrito = carrito.filter((item) => item.productoId !== productoId);
      setCarrito(nuevoCarrito);
      // Recalcular el total
      const sumaTotal = nuevoCarrito.reduce(
        (acc, item) => acc + item.producto.precio * item.cantidad,
        0
      );
      setTotal(sumaTotal);
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  return (
    <div className="mt-3">
      <ul>
        {carrito.length === 0 ? (
          <div>
            <div className="col text-center carrito-vacio">
              <p>El carrito está vacío</p>
            </div>
          </div>
        ) : (
          carrito.map((item) => (
            <li key={item.productoId} className="producto-item">
              <div className="producto-contenedor reducido bg-secondary">
                <div className="producto-imagen me-5">
                  <img
                    src={item.producto.img}
                    alt={`Imagen de ${item.producto.nombre}`}
                    className="imagen"
                  />
                </div>

                <div className="producto-detalles">
                  <h6 className="nombre">{item.producto.nombre}</h6>
                  <p className="descripcion">{item.producto.descripcion}</p>
                  <p className="precio">
                    Precio: ${item.producto.precio} x {item.cantidad}
                  </p>
                </div>

                <div className="producto-boton">
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarProducto(item.productoId)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="row text-center">
        <h2>Total: ${total}</h2>
      </div>
    </div>
  );
};

export default CartApp;
