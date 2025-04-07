// src/components/admin/InventoryTable.jsx

import { useState } from "react";
import { inventory } from "./InventoryData";
import "./Inventory.css";
import { FaEdit } from "react-icons/fa";
import EditInventory from "./EditInventory";
import TopNav from "../navbars/TopNav";
import { BiSearch, BiFilter } from "react-icons/bi";


const getStatus = (stock, threshold) => {
  if (stock === 0) return "No Stock";
  if (stock <= threshold) return "Low Stock";
  return "In Stock";
};

const InventoryTable = ({onClick}) => {
  const [filter, setFilter] = useState("all");
  const [editingItem, setEditingItem] = useState(null);

  const filteredData = inventory.filter((item) => {
    const status = getStatus(item.stock, item.threshold);
    if (filter === "all") return true;
    return status === filter;
  });

  const totalStock = inventory.length;
  const lowStock = inventory.filter(item => getStatus(item.stock, item.threshold) === "Low Stock").length;
  const noStock = inventory.filter(item => getStatus(item.stock, item.threshold) === "No Stock").length;

  return (
    <div className="inventory-container">
        <TopNav onClick={onClick}/>

      <div className="tabs-container">
        <div className="inventory-filters">
          <button onClick={() => setFilter("all")}>My Stocks ({totalStock})</button>
          <button onClick={() => setFilter("Low Stock")}>Low Stock ({lowStock})</button>
          <button onClick={() => setFilter("No Stock")}>No Stock ({noStock})</button>
        </div>
        <div className="search-filter">
          <div className="customInput">
            <input
              type="text"
              placeholder="Search for customer name..."
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
            />
            <BiSearch />
          </div>
          <h6 className="filter-icon">
            Filter <BiFilter />
          </h6>
        </div>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Current Stock</th>
            <th>Restock Threshold</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => {
            const status = getStatus(item.stock, item.threshold);
            return (
              <tr key={item.id}>
                <td>
                  <div className="product-info">
                    <img src={item.img} alt={item.product} />
                    <span>{item.product}</span>
                  </div>
                </td>
                <td>{item.stock}</td>
                <td>{item.threshold}</td>
                <td>
                  <span className={`status ${status.replace(" ", "").toLowerCase()}`}>
                    {status}
                  </span>
                </td>
                <td>{item.lastUpdated}</td>
                <td>
                  <FaEdit
                    className="edit-icon"
                    onClick={() => setEditingItem(item)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {editingItem && (
        <EditInventory
          item={editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
};

export default InventoryTable;
