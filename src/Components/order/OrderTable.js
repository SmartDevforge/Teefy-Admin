import React, { useState } from "react";
import { orders } from "./productData";
import "./Order.css";
import { FaChevronDown, FaChevronUp, FaEllipsisH } from "react-icons/fa";

const OrderTable = ({ filterStatus }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [menuOrderId, setMenuOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const toggleOrderDetails = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const toggleMenu = (id) => {
    setMenuOrderId(menuOrderId === id ? null : id);
  };

  const openUpdatePage = (order) => {
    setSelectedOrder(order);
  };

  // Filter orders based on selected status
  const filteredOrders = filterStatus
    ? orders.filter((order) => order.status === filterStatus)
    : orders;

  return (
    <div className="orders-container">
      {selectedOrder ? (
        <div className="order-details-page">
          <button className="back-btn" onClick={() => setSelectedOrder(null)}>
            ← Back
          </button>
          <div className="order-details-container ">
            <div className="order-details-mini-container">
              <div className="whole-product-details">
                <div className="order-details">
                  <h3>Customer Details</h3>
                  <p>{selectedOrder.customer}</p>
                  <p> {selectedOrder.email}</p>
                  <p> {selectedOrder.phone}</p>
                  <p>{selectedOrder.address}</p>


                </div>

                <div className="order-details">
                  <h3>Order Details</h3>
                  <p>{selectedOrder.id}</p>
                  <p>{selectedOrder.date}</p>
                  <p>{selectedOrder.totalAmount}</p>

                  <p>{selectedOrder.paymentStatus}</p>
                  <p>{selectedOrder.totalItems}</p>
                  <p>
                    <span className={`status ${selectedOrder.status.toLowerCase()}`}>
                      {selectedOrder.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="product-order">
                <h3>Products in This Order</h3>
                <tr className="selected-product">
                  <td colSpan="7"> 
                    <div className="expanded-content">
                      <table className="orders-table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.products.map((product, index) => (
                            <tr key={index} className="product-item">
                              <td>{product.name}</td>
                              <td>{product.qty}</td>
                              <td>{product.price}</td>
                              <td className={`status ${product.status.toLowerCase()}`}>{product.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </div>
            </div>


          </div>
        </div>
      ) : (
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
                {/* Main Order Row */}
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
                    <div className="action-menu">
                      <FaEllipsisH className="action-icon" onClick={() => toggleMenu(order.id)} />
                      {menuOrderId === order.id && (
                        <div className="dropdown-menu">
                          <p onClick={() => openUpdatePage(order)}>Update</p>
                        </div>
                      )}
                    </div>
                    <button onClick={() => toggleOrderDetails(order.id)}>
                      {expandedOrder === order.id ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </td>
                </tr>

                {/* Expanded Row with Mini-Table */}
                {expandedOrder === order.id && order.products.length > 0 && (
                  <tr className="expanded-row">
                    <td colSpan="7"> {/* Ensure it spans all columns */}
                      <div className="expanded-content">
                        <table className="products-table">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Price</th>
                              <th>Qty</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.products.map((product, index) => (
                              <tr key={index} className="product-item">
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.qty}</td>
                                <td className={`status ${product.status.toLowerCase()}`}>{product.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}


          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderTable;
