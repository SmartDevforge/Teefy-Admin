import React, { useState } from 'react';
import "./SideNav.css";
import { CustomButton } from '../button/Button';
import { CustomInput } from '../input/input';
import avatar from '../../assets/svgs/avatar.svg';
import search from '../../assets/svgs/search.svg';
import plus from '../../assets/svgs/plus.svg';




const TopNav = ({onClick}) => {
  // const [showForm, setShowForm] = useState(false);
  // const handleShowForm = () => {
  //   setShowForm(true)
  // }
  // const handleCloseForm = () => {
  // }
  return (
    <div className='topnav'>
      <div className='topnav-container'>
        <div >
          <CustomInput img={search} type={'text'} placeholder={'Search for products categories or brands...'} />
        </div>
        <div className='topnav-flec'>
          <CustomButton img={plus} onClick={onClick}>
            Add Product
          </CustomButton>
          <img src={avatar} alt="" />
        </div>
      </div>
    </div>
  )
}

export default TopNav
