import React, { useState } from 'react';
import SideNav from '../Components/navbars/SideNav';
import CustomersTable from '../Components/customers/Customers';
import ProductForm from '../Components/navbars/ProductForm';


const Customer = () => {

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
      <CustomersTable onClick={handleShowForm} />


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

export default Customer;
