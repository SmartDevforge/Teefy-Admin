import React, { useState } from "react";
import "./Order.css";
import OrderTable from "./OrderTable";
import { BiSearch, BiFilter } from "react-icons/bi";
import { orders } from "./productData";
import TopNav from "../navbars/TopNav";

const OrderComponent = ({ onClick }) => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");

  const orderCounts = {
    All: orders.length,
    Pending: orders.filter((order) => order.status === "Pending").length,
    Cancelled: orders.filter((order) => order.status === "Cancelled").length,
    Delivered: orders.filter((order) => order.status === "Delivered").length,
  };

  return (
    <div className="order-container">
      <TopNav onClick={onClick} />
      <div className="orderTitle">
        <h2>Orders</h2>
      </div>
      <div className="tabs-container">
        <div className="tabs">
          {[
            { name: "All Orders", count: orderCounts.All },
            { name: "Pending", count: orderCounts.Pending },
            { name: "Cancelled", count: orderCounts.Cancelled },
            { name: "Delivered", count: orderCounts.Delivered },
          ].map((tab) => (
            <p
              key={tab.name}
              className={activeTab === tab.name ? "active" : ""}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name} <span className="tab-count">({tab.count})</span>
            </p>
          ))}
        </div>
        <div className="search-filter">
          <div className="customInput">
            <input
              type="text"
              placeholder="Search for customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <BiSearch />
          </div>
          <h6 className="filter-icon">
            Filter <BiFilter />
          </h6>
        </div>
      </div>
      <OrderTable
        filterStatus={activeTab === "All Orders" ? null : activeTab}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default OrderComponent;
