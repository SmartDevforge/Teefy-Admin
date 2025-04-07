import React, { useState } from "react";
import { products } from "./ProductData";
import "./Products.css";
import TopNav from '../../Components/navbars/TopNav';
import { BiSearch } from "react-icons/bi";
import edit from '../../assets/svgs/edit.svg';
import deleteIcon from '../../assets/svgs/delete.svg';
import { CustomFormInput } from "../input/input";


const ProductsTable = ({ onClick }) => {
  const [productList, setProductList] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // Track product being edited

  // Handle selecting/deselecting a single product
  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((prodId) => prodId !== id) : [...prev, id]
    );
  };

  // Handle selecting/deselecting all products
  const handleSelectAll = () => {
    if (selectedProducts.length === productList.length) {
      setSelectedProducts([]); // Unselect all
    } else {
      setSelectedProducts(productList.map((product) => product.id)); // Select all
    }
  };

  // Handle deleting a product
  const handleDelete = (id) => {
    setProductList((prevProducts) => prevProducts.filter((p) => p.id !== id));
    setConfirmDelete(null);
    setSelectedProducts((prev) => prev.filter((prodId) => prodId !== id)); // Remove from selected
  };

  // Handle saving edits
  const handleSaveEdit = () => {
    setProductList((prevProducts) =>
      prevProducts.map((p) => (p.id === editProduct.id ? editProduct : p))
    );
    setEditProduct(null);
  };

  // Filter products based on search
  const filteredProducts = productList.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                placeholder="Search for customer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <BiSearch />
            </div>
            <button className="bulk-delete-btn" disabled={selectedProducts.length === 0}>
              Bulk Delete
            </button>
          </div>
        </div>
      </div>
      {/* <button className="bulk-delete-btn" disabled={selectedProducts.length === 0}>
            Bulk Delete
          </button> */}
      <table className="products-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedProducts.length === productList.length}
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id} className="product-item">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </td>
                <td className="tabledataImg"><img src={product.img} alt={product.name} /><p>{product.name}</p></td>

                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td className={product.status === "Active" ? "status-active" : "status-inactive"}>
                  {product.status}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => setEditProduct(product)}><img src={edit} alt="" /></button>
                  <button className="delete-btn" onClick={() => setConfirmDelete(product.id)}>
                    <img src={deleteIcon} alt="" />
                  </button>
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

      {/* Delete Confirmation Modal */}
      {confirmDelete !== null && (
        <div className="delete-modal ">

          <div className="delete-modal-content ">
            <div>
              <img src={deleteIcon} alt="" />

            </div>
            <h5>Are you sure you want to delete this product?</h5>
            <p>Dry Fish Panda Eja kika</p>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="confirm-delete-btn" onClick={() => handleDelete(confirmDelete)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editProduct && (
        <div className="edit-modal">
          <div className="modal-content">
            <div>
              <h2>Edit Product</h2>
              <p>{editProduct.status}</p>
            </div>

            <CustomFormInput
              label="Product Name"
              value={editProduct.name}
              type="text"
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
            />

            <div className="product-image">
              <img src={editProduct.img} alt={editProduct.name} style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }} />
            </div>

            <CustomFormInput
              label="Quantity Per Sale (Size / Bunch / Piece)"
              value={editProduct.stock}
              type="number"
              onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
            />

            <CustomFormInput
              label="Price"
              value={editProduct.price}
              type="text"
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
            />

            <div className="textarea">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="4"
                value={editProduct.description}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              ></textarea>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setEditProduct(null)}>Cancel</button>
              <button className="save-btn" onClick={handleSaveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductsTable;
