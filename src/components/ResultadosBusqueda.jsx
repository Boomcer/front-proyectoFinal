import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { buscarProductos } from "../helpers/buscar.js";
import {
  addToCarrito,
  addToFavoritos,
  refreshUsuario,
} from "../helpers/apiUsuarios.js";
import "../css/CategoryProducts.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ResultadosBusqueda = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);
  const [loadingCarrito, setLoadingCarrito] = useState({});
  const [loadingFavoritos, setLoadingFavoritos] = useState({});
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchResultados = async () => {
      if (query) {
        try {
          const data = await buscarProductos(query);
          if (Array.isArray(data)) {
            setResultados(data);
          } else if (Array.isArray(data.result)) {
            setResultados(data.result);
          } else {
            setResultados([]);
          }
          setError(null);
        } catch (error) {
          setError("No se pudieron cargar los resultados. Inténtalo de nuevo.");
          setResultados([]);
        }
      }
    };
    fetchResultados();
  }, [query]);

  useEffect(() => {
    const favoritosGuardados =
      JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosGuardados.map((prod) => prod._id));
  }, []);

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
        text: "Hubo un problema al añadir el producto al carrito.",
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
        text: "Hubo un problema al añadir el producto a favoritos.",
        icon: "error",
      });
    } finally {
      setLoadingFavoritos((prev) => ({ ...prev, [productoId]: false }));
    }
  };

  return (
    <div className="category-products-container">
      <h2 className="category-title">Resultados de búsqueda para: "{query}"</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="conteinerCAT">
        {resultados.length > 0 ? (
          resultados.map((producto) => (
            <div key={producto._id} className="card-product">
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
                      onClick={() => handleAddToCarrito(producto._id)}
                      className="btn btn-outline-secondary"
                      disabled={loadingCarrito[producto._id]}
                    >
                      {loadingCarrito[producto._id]
                        ? "Cargando..."
                        : "Añadir a carrito"}
                    </button>
                    <div
                      onClick={() => handleAddToFavoritos(producto)}
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
            </div>
          ))
        ) : (
          <p className="no-products-message">No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default ResultadosBusqueda;
