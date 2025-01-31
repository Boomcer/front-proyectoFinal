import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducto } from "../helpers/apiProductos";
import { getUsuario } from "../helpers/apiUsuarios";
import CartApp from "../components/CardCarrito";
// import CreditCard from '../components/CreditCard'

const CartScreen = () => {
  const [carrito, setCarrito] = useState([]);
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const usuario = await getUsuario(uid);
        const carritoList = usuario.usuario.carrito || [];

        const productosCarrito = await Promise.all(
          carritoList.map(async (item) => {
            const producto = await getProducto(item.productoId);
            return {
              ...producto, 
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

  const calcularTotalCarrito = () => {
    return carrito.reduce((total, item) => {
      const precio = parseFloat(item.producto.precio) || 0;
      const cantidad = parseInt(item.cantidad, 10) || 0;
      return total + precio * cantidad;
    }, 0);
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
          />
        ))}
      </div>
      {carrito.length > 0 && (
        <div className="text-center mt-5 mb-3">
          <h4>Total: ${Math.round(calcularTotalCarrito())}</h4>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/checkout")}
          >
            Comprar Todo
          </button>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
