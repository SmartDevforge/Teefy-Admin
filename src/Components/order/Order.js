import React, { useState } from "react";
import "./Order.css";
import OrderTable from "./OrderTable";
import { BiSearch, BiFilter } from "react-icons/bi";

const OrderComponent = () => {
  const [activeTab, setActiveTab] = useState("All Orders");

  return (
    <div className="order-container">
      <div className="orderTitle">
        <h2>Order</h2>
      </div>
      <div className="tabs-container">
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
        <div className="search-filter">
          <div className="customInput">
            <input type="text" placeholder="Search orders..." />
            <BiSearch />
          </div>
          <h6 className="filter-icon">
            Filter <BiFilter />
          </h6>
        </div>
      </div>
      <OrderTable filterStatus={activeTab === "All Orders" ? null : activeTab} />
    </div>
  );
};

export default OrderComponent;
