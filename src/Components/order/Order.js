import React, { useState } from "react";
import "./Order.css";
import OrderTable from "./OrderTable";
// import { CustomFormInput } from "../input/input";
import { BiSearch, BiFilter } from "react-icons/bi";


const OrderComponent = () => {
  const [activeTab, setActiveTab] = useState("All Orders");

  return (
    <div className="container">
      <div>
        <h2>Order</h2>
      </div>
      <div className="tabs-contan">
        <div className="tabs">
          {["All Orders", "Pending", "Cancelled", "Delivered"].map((tab) => (
            <p
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </p>
          ))}
        </div>
        <div>
          <div className="customInput">
            <input type="text" />
            <BiSearch />
          </div>
          <h6>
            filter
            <BiFilter />
          </h6>
        </div>
      </div>
      <OrderTable filterStatus={activeTab === "All Orders" ? null : activeTab} />
    </div>
  );
};

export default OrderComponent;
