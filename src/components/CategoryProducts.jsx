import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { getProductosPorCategoria } from "../helpers/adminPage.js";
import {
  addToCarrito,
  addToFavoritos,
  refreshUsuario,
} from "../helpers/apiUsuarios.js";
import "../css/CategoryProducts.css";

function CategoryProducts() {
  const { categoryId } = useParams();
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [loadingCarrito, setLoadingCarrito] = useState({});
  const [loadingFavoritos, setLoadingFavoritos] = useState({});
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    if (!categoryId) {
      setError("El ID de la categoría no es válido.");
      return;
    }

    const fetchProductos = async () => {
      try {
        const data = await getProductosPorCategoria(categoryId);
        if (data && Array.isArray(data.productos)) {
          setProductos(data.productos);
        } else {
          setProductos([]);
        }
      } catch (error) {
        setError(error.message);
        setProductos([]);
      }
    };

    fetchProductos();

    const favoritosGuardados =
      JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosGuardados.map((prod) => prod._id));
  }, [categoryId]);

  const handleAddToCarrito = async (productoId) => {
    setLoadingCarrito((prev) => ({ ...prev, [productoId]: true }));
    try {
      await addToCarrito(productoId, 1);
      await refreshUsuario();

      Swal.fire({
        title: "¡Añadido al carrito!",
        text: "El producto se ha añadido correctamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error.message.includes("UID") || error.message.includes("token")
            ? "Por favor, inicie sesión nuevamente."
            : "Hubo un problema al añadir el producto al carrito.",
        icon: "error",
      });
    } finally {
      setLoadingCarrito((prev) => ({ ...prev, [productoId]: false }));
    }
  };

  const handleAddToFavoritos = async (producto) => {
    const productoId = producto._id;
    setLoadingFavoritos((prev) => ({ ...prev, [productoId]: true }));

    try {
      await addToFavoritos(productoId);
      await refreshUsuario();

      let nuevosFavoritos;
      if (favoritos.includes(productoId)) {
        // Si ya está en favoritos, quitarlo
        nuevosFavoritos = favoritos.filter((id) => id !== productoId);
        Swal.fire({
          title: "Eliminado de favoritos",
          text: "Se ha eliminado de tu lista.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        nuevosFavoritos = [...favoritos, productoId];
        Swal.fire({
          title: "¡Añadido a favoritos!",
          text: "El producto se ha añadido correctamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      setFavoritos(nuevosFavoritos);
      localStorage.setItem(
        "favoritos",
        JSON.stringify(nuevosFavoritos.map((id) => ({ _id: id })))
      );
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error.message.includes("UID") || error.message.includes("token")
            ? "Por favor, inicie sesión nuevamente."
            : "Hubo un problema al añadir el producto a favoritos.",
        icon: "error",
      });
    } finally {
      setLoadingFavoritos((prev) => ({ ...prev, [productoId]: false }));
    }
  };

  return (
    <div className="category-products-container">
      <h2 className="category-title">Productos de la Categoría</h2>
      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : productos.length === 0 ? (
        <p className="no-products-message">
          No hay productos en esta categoría.
        </p>
      ) : (
        <div className="conteinerCAT">
          {productos.map((producto) => (
            <div key={producto._id} className="card-product">
              <Link
                className="nav-link conteiner_card"
                to={`/producto/${producto._id}`}
              >
                <div className="card d-flex align-items-center justify-content-center text-center border-2 shadow bg-dark">
                  <div className="content-img align-items-center">
                    <img
                      src={producto.img}
                      className="card-img-top"
                      alt={producto.nombre}
                    />
                  </div>
                  <div className="card-body text-light">
                    <h6 className="card-title">{producto.nombre}</h6>
                    <p className="card-text">$ {producto.precio}</p>
                    <div className="card-actions d-flex align-items-center justify-content-around">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCarrito(producto._id);
                        }}
                        className="btn btn-outline-secondary"
                        disabled={loadingCarrito[producto._id]}
                      >
                        {loadingCarrito[producto._id]
                          ? "Cargando..."
                          : "Añadir a carrito"}
                      </button>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          if (!loadingFavoritos[producto._id]) {
                            handleAddToFavoritos(producto);
                          }
                        }}
                        style={{
                          fontSize: "2em",
                          color: favoritos.includes(producto._id)
                            ? "red"
                            : "#E0E0E0",
                          cursor: loadingFavoritos[producto._id]
                            ? "not-allowed"
                            : "pointer",
                        }}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;
