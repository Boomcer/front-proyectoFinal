import { useState } from 'react'
import '../css/CardPage.css'

function BenefitCard({ icon, title, description, delay }) {
  return (
    <div 
      className="benefit-card fade-in" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="icon">
        {icon}
      </div>
      <h2 className="title">{title}</h2>
      <p className="description">{description}</p>
    </div>
  )
}

function CardPage() {
  const benefits = [
    {
      icon: "💰",
      title: "30% OFF Abonando en Efectivo",
      description: "Motoenvío o Retiro por taller"
    },
    {
      icon: "💳",
      title: "Paga Como Quieras",
      description: "3 Y 6 Cuotas sin interés con tarjetas de Mercadopago"
    },
    {
      icon: "🚚",
      title: "Envíos Gratis todo el PAÍS",
      description: "Superando los $15000"
    },
    {
      icon: "↩️",
      title: "Devolvelo gratis",
      description: "Si no te gustó o no te convence, la primera devolución es por nuestra cuenta."
    }
  ]

  return (
    <div className="containerr">
      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
            delay={index * 200}
          />
        ))}
      </div>
    </div>
  )
}

export default CardPage