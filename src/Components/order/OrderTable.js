import React, { useState } from "react";
import { orders } from "./productData";
import "./Order.css"; 
import { FaChevronDown, FaChevronUp, FaEllipsisV } from "react-icons/fa";


const OrderTable = ({ filterStatus }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrderDetails = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  // Show all orders by default, filter only if a specific status is selected
  const filteredOrders = filterStatus
    ? orders.filter((order) => order.status === filterStatus)
    : orders;

  return (
    <div className="orders-container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total Amount</th>
            <th>Overall Status</th>
            <th>Total Items</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <React.Fragment key={order.id}>
              <tr>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.totalAmount}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.totalItems}</td>
                <td>{order.date}</td>
                <td>
                  <FaEllipsisV className="action-icon" />
                  <button onClick={() => toggleOrderDetails(order.id)}>
                    {expandedOrder === order.id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </td>
              </tr>
              {expandedOrder === order.id && order.products.length > 0 && (
                <tr className="order-details">
                  <td colSpan="7">
                    <div className="products-list">
                      {order.products.map((product, index) => (
                        <div key={index} className="product-item">
                          <span>{product.name}</span>
                          <span>{product.price}</span>
                          <span>{product.qty} pcs</span>
                          <span className={`status ${product.status.toLowerCase()}`}>
                            {product.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
