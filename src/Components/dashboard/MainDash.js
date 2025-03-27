import React, { Fragment, useState } from "react";
import "./MainDash.css";
import { MdBarChart } from "react-icons/md";
import wallet from '../../assets/svgs/wallet.svg';
import product from '../../assets/svgs/product.svg';
import arrowDown from '../../assets/svgs/arrowDown.svg';
import TopNav from "../navbars/TopNav";
import ProductForm from '../navbars/ProductForm';
import greenChart from '../../assets/svgs/greenChart.svg';
import redChart from '../../assets/svgs/redChart.svg';
import { DoughnutCharts, LineCharts } from "./Charts";
import TopSelling from "./TopSelling";



function MainDash({onClick}) {
  // const [reach, setReach] = useState(Subscribers);
  // const [value, onChange] = useState(new Date());

  // https://www.figma.com/design/sz7F668QqVKkIf5Tg3NT58/TeeFey-E-commerce?node-id=166-899&t=vZc03O65kQVdff5r-0

  return (
    <div className="container">
      <div className="mainDash">
        <TopNav onClick={onClick}/>
      </div>
      <div className="minichart">

        <div className="minichart-container">
          <div className="minichart-a">
            <img src={wallet} alt="" />
            <div className="semi-mini-chart">
              <h6>Daily</h6>
              <img src={arrowDown} alt="" />
            </div>
          </div>
          <div className="minichart-b">
            <div>
              <h5>Sales</h5>
              <h4>3,916.00</h4>
            </div>
            <div className="colored-chart ">
              <img src={greenChart} alt='' />
              <p>Over last month 2.8%</p>
            </div>
          </div>
        </div>

        <div className="minichart-container">
          <div className="minichart-a">
            <img src={product} alt="" />
            <div className="semi-mini-chart">
              <h6>Delivered</h6>
              <img src={arrowDown} alt="" />
            </div>
          </div>
          <div className="minichart-b">
            <div>
              <h5>Order</h5>
              <h4>628</h4>
            </div>
            <div className="colored-chart ">
              <img src={redChart} alt='' />
              <p>Over last month 2.8%</p>
            </div>
          </div>
        </div>

        <div className="minichart-container">
          <DoughnutCharts />

        </div>
      </div>


      <div className="main-component">
        <div className="visit">
          <LineCharts />
          <TopSelling />
        </div>
        {/* <div className="formcontainer">
          <ProductForm />
        </div> */}



      </div>
    </div>
  );
}

export default MainDash;
