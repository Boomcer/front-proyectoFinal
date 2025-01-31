import React, { useState, useEffect, useRef } from "react";
import { obtenerCategorias } from "../helpers/adminPage.js";
import { useNavigate } from "react-router-dom";
import "../css/CardCategori.css";

const defaultImages = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=200&h=200&fit=crop",
];

const CategoriasScreen = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await obtenerCategorias(20, 0);
        const categoriasConImagen = data.categorias.map((category, index) => ({
          ...category,
          image: defaultImages[index % defaultImages.length],
        }));
        setCategories(categoriasConImagen);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (!categoryId) {
      console.error("Error: El ID de la categoría es inválido.");
      return;
    }
    navigate(`/categoria/${categoryId}`);
  };

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h2 className="categories-title">Categorías</h2>
      </div>

      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <div className="carousel-container">
          <button
            className="scroll-button prev"
            onClick={() => scroll("left")}
            aria-label="Anterior"
          >
            ←
          </button>

          <div className="categories-carousel" ref={carouselRef}>
            {categories.map((category) => (
              <div
                key={category._id}
                className="category-card"
                onMouseEnter={() => setHoveredCategory(category._id)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => handleCategoryClick(category._id)}
                style={{
                  transform:
                    hoveredCategory === category._id
                      ? "translateY(-4px)"
                      : "translateY(0)",
                  cursor: "pointer",
                }}
              >
                <div
                  className="category-image"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <h3 className="category-name">{category.nombre}</h3>
              </div>
            ))}
          </div>

          <button
            className="scroll-button next"
            onClick={() => scroll("right")}
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoriasScreen;
