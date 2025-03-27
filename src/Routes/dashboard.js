import React, { useState } from 'react';
import MainDash from '../Components/dashboard/MainDash';
import SideNav from '../Components/navbars/SideNav';
import ProductForm from '../Components/navbars/ProductForm';




const Dashboard = () => {

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
      <MainDash onClick={handleShowForm} />

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

export default Dashboard;
