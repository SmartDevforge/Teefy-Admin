import React,  { useEffect } from 'react';
import SideNav from '../Components/navbars/SideNav';
import StorePage from '../Components/store/StorePage';

const Customer = () => {

//   useEffect(() => {
//     const allLi = document.querySelector('.side-nav ul')
//     .querySelectorAll("a")

//     function changeMenuActive() {
//         allLi.forEach((n) => n.classList.remove('active'));
//         this.classList.add('active');
//     }

//     allLi.forEach((n) => n.addEventListener('click', changeMenuActive))
// }, []);
  return (
    <div>
      <SideNav />
      <StorePage />
    </div>
  );
}

export default Customer;
