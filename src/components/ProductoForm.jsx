import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { obtenerCategorias } from "../helpers/adminPage.js"; 

const ProductoForm = ({ producto, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    img: "",
    destacado: false,
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        categoria: producto.categoria._id,
        imagen: producto.imagen,
        destacado: producto.destacado,
      });
    }
  }, [producto]);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const categorias = await obtenerCategorias();
        setCategorias(categorias.categorias);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    cargarCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onGuardar(formData);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: `Producto ${producto ? "actualizado" : "creado"} correctamente`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al procesar el producto",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input
          type="number"
          className="form-control"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input
          type="number"
          className="form-control"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <select
          className="form-select"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria._id} value={categoria._id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Imagen</label>
        <input
          type="text"
          className="form-control"
          name="img"
          value={formData.imagen}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="destacado"
          checked={formData.destacado}
          onChange={handleChange}
        />
        <label className="form-check-label">Destacado</label>
      </div>
      <div className="d-flex gap-2 justify-content-end mt-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancelar}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          {producto ? "Actualizar" : "Crear"} Producto
        </button>
      </div>
    </form>
  );
};

ProductoForm.propTypes = {
  producto: PropTypes.object,
  onGuardar: PropTypes.func.isRequired,
  onCancelar: PropTypes.func.isRequired,
};

export default ProductoForm;
