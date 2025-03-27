import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./SideNav.css";
import "../Responsiveness.css";
// import realLogo from "../assets/pneuma.png";
import { FaUser, FaHome } from "react-icons/fa";
import { BsPencilSquare, BsGrid1X2Fill, BsCart3 } from "react-icons/bs";
import { MdBarChart } from "react-icons/md";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

function SideNav() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const activeStyle = {
    color: "#068081",
  };
  const normalStyle = {
    color: "#000000",
  };

  return (
    <div>
      <div className="top-nav">
        <nav className="whole">
          <div>
            <div className="background">
              <ul className="first-ul">
                <div className="drop-command" onClick={handleClick}>
                  {click ? <HiOutlineMenuAlt1 /> : <HiOutlineMenuAlt1 />}
                  <h5>Menu</h5>
                </div>

              </ul>
            </div>
            <div className="miss">
              <ul className={click ? "main-ul active" : "main-ul "}>
                <li>
                  <NavLink
                    to="/dashboard"
                    style={({ isActive }) =>
                      isActive ? activeStyle : normalStyle
                    }
                  >
                    <FaHome />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/orders"
                    style={({ isActive }) =>
                      isActive ? activeStyle : normalStyle
                    }
                  >
                    <BsPencilSquare />
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/customers"
                    style={({ isActive }) =>
                      isActive ? activeStyle : normalStyle
                    }
                  >
                    <MdBarChart />
                    Customers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    style={({ isActive }) =>
                      isActive ? activeStyle : normalStyle
                    }
                  >
                    <BsGrid1X2Fill />
                    Products
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="side-nav">
        <nav>
          <li className="logo">
            <Link to="/dashboard">TEEFY</Link>
          </li>
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                style={({ isActive }) => (isActive ? activeStyle : normalStyle)}
              >
                <FaHome />
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/orders"
                style={({ isActive }) => (isActive ? activeStyle : normalStyle)}
              >
                <BsPencilSquare />
                Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/customers"
                style={({ isActive }) => (isActive ? activeStyle : normalStyle)}
              >
                <MdBarChart />
                Customers
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/products"
                style={({ isActive }) => (isActive ? activeStyle : normalStyle)}
              >
                <BsGrid1X2Fill />
                Products
              </NavLink>
            </li>         
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SideNav;
