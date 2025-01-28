import React, { useEffect, useState } from "react";
import { getProducto } from "../helpers/apiProductos";
import {
  getUsuario,
  deleteFromCarrito,
  putCarrito,
  clearCarrito,
} from "../helpers/apiUsuarios";
import CartApp from "../components/CardCarrito";

const CartScreen = () => {
  const [carrito, setCarrito] = useState([]);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const usuario = await getUsuario(uid);
        const carritoList = usuario.usuario.carrito || [];

        const productosCarrito = await Promise.all(
          carritoList.map(async (item) => {
            const producto = await getProducto(item.productoId);
            return {
              ...producto, // Detalles completos del producto
              carritoId: item._id,
              cantidad: item.cantidad,
            };
          })
        );

        setCarrito(productosCarrito);
      } catch (error) {
        console.error("Error al obtener el carrito o productos:", error);
      }
    };

    fetchCarrito();
  }, [uid]);
console.log(carrito);

const calcularTotalCarrito = () => {
  return carrito.reduce((total, item) => {
    const precio = parseFloat(item.producto.precio) || 0; // Accede a producto.precio
    const cantidad = parseInt(item.cantidad, 10) || 0; // Usa item.cantidad
    const subtotal = precio * cantidad;
    return total + subtotal;
  }, 0); // Comienza desde 0
};

  

  const handleDeleteCarrito = async (carritoId) => {
    try {
      await deleteFromCarrito(carritoId);
      setCarrito((prevCarrito) =>
        prevCarrito.filter((producto) => producto.carritoId !== carritoId)
      );
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  const handleUpdateCantidad = async (carritoId, cantidad) => {
    try {
      await putCarrito(carritoId, cantidad);
      setCarrito((prevCarrito) =>
        prevCarrito.map((producto) =>
          producto.carritoId === carritoId
            ? { ...producto, cantidad }
            : producto
        )
      );
    } catch (error) {
      console.error("Error al actualizar la cantidad del producto:", error);
    }
  };

  const handleComprar = async () => {
    try {
      for (const producto of carrito) {
        await handleDeleteCarrito(producto.carritoId);
      }
      await clearCarrito(uid);
      alert("¡Compra realizada con éxito!");
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      alert("Ocurrió un error al intentar completar la compra.");
    }
  };

  return (
    <div className="p-2">
      <h1>🛒 Carrito de Compras 🛒</h1>
      <div className="row g-3">
        {carrito.map(({ producto, carritoId, cantidad }) => (
          <CartApp
            key={carritoId}
            id={carritoId}
            producto={{
              ...producto,
              cantidad,
            }}
            onDeleteCarrito={handleDeleteCarrito}
            onUpdateCantidad={handleUpdateCantidad}
          />
        ))}
      </div>
      {carrito.length > 0 && (
        <div className="text-center mt-5 mb-3">
          <h4>Total: ${calcularTotalCarrito().toFixed(2)}</h4>
          <button className="btn btn-primary mt-3" onClick={handleComprar}>
            Comprar Todo
          </button>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
