import React, { useState, useEffect } from 'react';
import '../css/AboutUs.css';

const teamMembers = [
  { name: "José Simón Díaz", role: "programador FullStack", image: "https://i.pinimg.com/736x/7b/35/5f/7b355fcce47c1def8d8d6adf11d97741.jpg" },
  { name: "Leon Matias", role: "programador FullStack", image: "https://i.pinimg.com/736x/7b/35/5f/7b355fcce47c1def8d8d6adf11d97741.jpg" },
  { name: "Nicolas Gallardo", role: "programador FullStack", image: "https://i.pinimg.com/736x/7b/35/5f/7b355fcce47c1def8d8d6adf11d97741.jpg" },
  { name: "Carlos Daniel Ledesma", role: "programador FullStack", image: "https://i.pinimg.com/736x/7b/35/5f/7b355fcce47c1def8d8d6adf11d97741.jpg" },
  { name: "Nicolas Rodriguez", role: "programador FullStack", image: "https://i.pinimg.com/736x/7b/35/5f/7b355fcce47c1def8d8d6adf11d97741.jpg" },
  { name: "Guillermo Andres Zurita", role: "programador FullStack", image: "https://i.pinimg.com/736x/7b/35/5f/7b355fcce47c1def8d8d6adf11d97741.jpg" }
];

const AboutScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="about-us-container">
      <div className={`about-section ${isVisible ? 'fade-in' : ''}`}>
        <h1>Sobre Nosotros</h1>
        <div className="description">
          <p>
            Bienvenidos a General Paz Moda, tu destino de moda preferido. Nacimos con la visión
            de transformar la manera en que las personas compran moda en línea, ofreciendo una
            experiencia única y personalizada.
          </p>
          <p>
            Nuestro compromiso es brindar las últimas tendencias en moda con la mejor calidad
            y precios accesibles. Trabajamos incansablemente para asegurar que cada cliente
            encuentre exactamente lo que busca.
          </p>
        </div>
      </div>

      <div className="team-section">
        <h2>Nuestro Equipo</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={`team-member ${isVisible ? 'slide-up' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;
