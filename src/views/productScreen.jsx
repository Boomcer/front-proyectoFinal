import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProducto } from '../helpers/apiProductos'

const productScreen = () => {
  const {id} = useParams();
  const [producto , setProducto] = useState();
  const [loading , setLoading] = useEffect(true);

  useEffect(() => {
    
  })

  return (
    <div>productScreen</div>
  )
}

export default productScreen