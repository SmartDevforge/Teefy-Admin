import React, { useState } from "react";
import { customerData } from "./CustomerData";
import "./Customer.css";
import TopNav from "../navbars/TopNav";
import { BiSearch, BiFilter } from "react-icons/bi";


const CustomersTable = ({ onClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter customers based on search query
  const filteredCustomers = customerData.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="customers-container">
      <TopNav onClick={onClick} />
      <div className="">
        <h2>Customers</h2>
        <div className="customers">
          <p>All Users</p>
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
      </div>

      <table className="customers-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Reg Date</th>
            <th>Total Orders</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.regDate}</td>
                <td>{customer.totalOrders}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-results">
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Section (Mock) */}
      {/* <div className="pagination">
        <button className="prev-btn">← Previous</button>
        <span className="page-number">1</span>
        <span className="dots">...</span>
        <span className="total-pages">68</span>
        <button className="next-btn">Next →</button>
      </div> */}
    </div>
  );
};

export default CustomersTable;
