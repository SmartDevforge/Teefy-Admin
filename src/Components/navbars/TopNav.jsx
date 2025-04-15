import React from 'react';
import "./SideNav.css";
import { CustomButton } from '../button/Button';
import avatar from '../../assets/svgs/avatar.svg';
import plus from '../../assets/svgs/plus.svg';
import { NavLink } from "react-router-dom";




const TopNav = ({ onClick }) => {

  return (
    <div className='topnav'>
      <div className='topnav-container'>

        <div className='topnav-flec'>
          <CustomButton img={plus} onClick={onClick}>
            Add Product
          </CustomButton>
          <NavLink
            to="/profile"

          >
            <img src={avatar} alt="" className='avatar' />

          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default TopNav
