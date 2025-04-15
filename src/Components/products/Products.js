import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import TopNav from "../../Components/navbars/TopNav";
import { BiSearch } from "react-icons/bi";
import edit from "../../assets/svgs/edit.svg";
import deleteIcon from "../../assets/svgs/delete.svg";
import { FiTrash2 } from "react-icons/fi";
import { CustomFormInput } from "../input/input";
import { BASE_URL, API_KEY } from "../../api/apiConfig";
import EditModal from "./EditProduct";
import DeleteModal from "./DeleteProduct";


// ... All imports remain the same

const ProductsTable = ({ onClick }) => {
  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v1/products`, {
        headers: {
          "x-api-key": API_KEY,
        },
        params: searchQuery ? { search: searchQuery } : {},
      });

      setProductList(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allSelected = selectedProducts.length === productList.length;
    setSelectedProducts(allSelected ? [] : productList.map((p) => p._id));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/v1/products/delete/${id}`, {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      setProductList((prev) => prev.filter((p) => p._id !== id));
      setSelectedProducts((prev) => prev.filter((pid) => pid !== id));
      setConfirmDelete(null);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleBulkDelete = async () => {
    const deletePromises = selectedProducts.map((id) =>
      axios.delete(`${BASE_URL}/v1/products/delete/${id}`, {
        headers: {
          "x-api-key": API_KEY,
        },
      })
    );

    try {
      await Promise.all(deletePromises);
      setProductList((prev) =>
        prev.filter((p) => !selectedProducts.includes(p._id))
      );
      setSelectedProducts([]);
    } catch (error) {
      console.error("Bulk delete failed:", error);
    }
  };

  const handleSaveEdit = async () => {
    if (
      !editProduct?.productName ||
      !editProduct?.price ||
      !editProduct?.quantity?.piece
    ) return;
  
    try {
      const accessToken = localStorage.getItem('access_token');
  
      const formData = new FormData();
      formData.append("productName", editProduct.productName);
      formData.append("price", editProduct.price);
      formData.append("description", editProduct.description || "");
      formData.append("quantity[piece]", editProduct.quantity.piece);
      formData.append("noOfQuantity", editProduct.quantity.noOfQuantity || 0);
      formData.append("noOfUnits", editProduct.quantity.noOfUnits || 0);
  
      await axios.put(
        `${BASE_URL}/v1/products/update/${editProduct._id}`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "x-api-key": API_KEY,
          },
        }
      );
  
      // Update the UI
      setProductList((prev) =>
        prev.map((p) => (p._id === editProduct._id ? editProduct : p))
      );
      setEditProduct(null);
    } catch (error) {
      console.error("Error updating product:", error.response || error.message);
      alert("Failed to update product. Please make sure you’re logged in.");
    }
  };
  
  return (
    <div className="products-container">
      <TopNav onClick={onClick} />
      <div className="product-header">
        <h2>Products</h2>
        <div className="products">
          <p>Products</p>
          <div className="search-filter">
            <div className="customInput">
              <input
                type="text"
                placeholder="Search for product name or price..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <BiSearch />
            </div>
            <button
              className="bulk-delete-btn"
              disabled={selectedProducts.length === 0}
              onClick={handleBulkDelete}
            >
              Bulk Delete
            </button>
          </div>
        </div>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  selectedProducts.length === productList.length &&
                  productList.length > 0
                }
              />
            </th>
            <th>Product</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.length > 0 ? (
            productList.map((product) => (
              <tr key={product._id} className="product-item">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleSelectProduct(product._id)}
                  />
                </td>
                <td className="tabledataimage">
                  <img src={product.image} alt={product.productName} />
                  <p>{product.productName}</p>
                </td>
                <td>{product.price || 0}</td>
                <td>{product.quantity?.piece || 0}</td>
                <td className="status-active">Active</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => setEditProduct(product)}
                  >
                    <img src={edit} alt="edit" />
                  </button>
                  {/* <button
                    className="delete-btn"
                    onClick={() => setConfirmDelete(product)}
                  >
                    <img src={deleteIcon} alt="delete" />
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-results">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {confirmDelete && (
        <DeleteModal
          confirmDelete={confirmDelete}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete._id)}
        />
      )}

      {editProduct && (
        <EditModal
          editProduct={editProduct}
          setEditProduct={setEditProduct}
          onCancel={() => setEditProduct(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default ProductsTable;
