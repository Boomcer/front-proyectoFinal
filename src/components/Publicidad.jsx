import React from 'react'
import imgPublicidad from '../assets/img/publicidad.jpg'
import imgPublicidad1 from '../assets/img/publicidad1.jpg'
import imgPublicidad2 from '../assets/img/publicidad2.jpg'
import '../css/publicidad.css'

const publicidad = () => {
  return (
    <div className='containerImgPublicidad'>
      <div className="cardpublicidad">
        <img className='imgPublicidad' id='img' src={imgPublicidad} alt="imgPublicidad" />
      </div>
      <div className="cardpublicidad">
        <img className='imgPublicidad' src={imgPublicidad1} alt="imgPublicidad" />
      </div>
      <div className="cardpublicidad">
        <img className='imgPublicidad' src={imgPublicidad2} alt="imgPublicidad" />
      </div>
    </div>
  )
}

export default publicidad