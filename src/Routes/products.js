import React, { useState } from 'react';
import SideNav from '../Components/navbars/SideNav'
import ProductsTable from '../Components/products/Products'
import ProductForm from '../Components/navbars/ProductForm';



const Products = () => {
   const [showForm, setShowForm] = useState(false);
    const handleShowForm = () => {
      setShowForm(true)
      console.log('Mata clicked me')
    }
    const handleCloseForm = () => {
      setShowForm(false)
  
      console.log('them unclick oo')
    }
  return (
    <div>
      <SideNav />
      <ProductsTable onClick={handleShowForm} />

      <div>
        {
          showForm ?

            <ProductForm onClick={handleCloseForm} />
            : null
        }
      </div>
      
    </div>
  )
}

export default Products
