import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ProductoForm = ({ producto, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    imagen: ''
  });
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (producto) {
      setFormData(producto);
      setPreviewImage(producto.imagen);
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'imagen') {
      setPreviewImage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: `Producto ${producto ? 'actualizado' : 'creado'} correctamente`
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al procesar el producto'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <div className="row">
        <div className="col-md-8">
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="precio" className="form-label">Precio</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className="form-control"
                    id="precio"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="stock" className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="categoria" className="form-label">Categoría</label>
            <input
              type="text"
              className="form-control"
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">URL de la imagen</label>
            <input
              type="url"
              className="form-control"
              id="imagen"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="text-center">
            <label className="form-label">Vista previa de la imagen</label>
            <div className="image-preview-container">
              <img
                src={previewImage || 'https://via.placeholder.com/200x200?text=Vista+Previa'}
                alt="Vista previa"
                className={`image-preview ${previewImage ? 'has-image' : ''}`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex gap-2 justify-content-end mt-4">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          {producto ? 'Actualizar' : 'Crear'} Producto
        </button>
      </div>
    </form>
  );
};

export default ProductoForm;