import React, { useEffect, useState } from "react";
import { getProducto } from "../helpers/apiProductos"; // Función para obtener los datos de un producto
import { getUsuario, deleteFromCarrito } from "../helpers/apiUsuarios"; // Función para obtener datos del usuario y eliminar productos del carrito
import CartApp from "../components/CartApp"; // Componente para mostrar los productos del carrito

const CartScreen = () => {
  const [carrito, setCarrito] = useState([]); // Estado para almacenar los productos del carrito
  const uid = localStorage.getItem("uid"); // Obtenemos el UID del usuario almacenado en el localStorage

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        // Obtener los datos del usuario, incluyendo el carrito
        const usuario = await getUsuario(uid);
        const carritoList = usuario.usuario.carrito || []; // Array de productos en el carrito

        console.log("Lista del carrito del usuario:", carritoList);

        // Obtener los detalles de los productos en el carrito
        const productosCarrito = await Promise.all(
          carritoList.map(async (item) => {
            const producto = await getProducto(item.productoId); // Detalles del producto
            return {
              ...producto, // Incluimos los datos completos del producto
              carritoId: item._id, // ID único del producto en el carrito
              cantidad: item.cantidad, // Cantidad del producto en el carrito
            };
          })
        );

        console.log("Productos en el carrito obtenidos:", productosCarrito);
        setCarrito(productosCarrito); // Guardar los datos completos en el estado
      } catch (error) {
        console.error("Error al obtener el carrito o productos:", error);
      }
    };

    fetchCarrito();
  }, [uid]);

  const handleDeleteCarrito = async (carritoId) => {
    try {
      console.log("ID del producto a eliminar del carrito:", carritoId);
      await deleteFromCarrito(carritoId); // Llamar a la función de eliminación del backend
      setCarrito((prevCarrito) =>
        prevCarrito.filter((producto) => producto.carritoId !== carritoId)
      ); // Actualizar la lista localmente
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  return (
    <div className="p-2">
      <h1>🛒 Carrito de Compras 🛒</h1>
      <div className=" row g-3">
        {/* Aquí usamos el componente CartApp para mostrar los productos del carrito */}
        {carrito.map(({ producto, carritoId, cantidad }) => (
 <CartApp
 key={carritoId}
 id={carritoId}
 producto={{
   ...producto,
   cantidad,
 }}
 onDeleteCarrito={handleDeleteCarrito}
/>
))}
      </div>
    </div>
  );
};

export default CartScreen;