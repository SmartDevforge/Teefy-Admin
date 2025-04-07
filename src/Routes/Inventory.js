import React, { useState } from 'react';
import SideNav from '../Components/navbars/SideNav'
import ProductsTable from '../Components/products/Products'
import InventoryTable from '../Components/inventory/Inventory'
import ProductForm from '../Components/navbars/ProductForm';


const Inventory = () => {
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
      <InventoryTable />

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

export default Inventory
