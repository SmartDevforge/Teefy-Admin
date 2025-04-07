import React, { useState } from 'react';
import SideNav from '../Components/navbars/SideNav';
import OrderComponent from '../Components/order/Order';
import ProductForm from '../Components/navbars/ProductForm';




const Order = () => {
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
      <OrderComponent />

      <div>
        {
          showForm ?

            <ProductForm onClick={handleCloseForm} />
            : null
        }
      </div>
    </div>
  );
}

export default Order;
