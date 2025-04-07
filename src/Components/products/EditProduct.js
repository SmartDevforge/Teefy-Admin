import { useState, useEffect } from "react";

const EditProduct = ({ product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = () => {
    onSave(editedProduct);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={editedProduct.name}
          onChange={handleChange}
        />

        <label>Quantity per Sale</label>
        <input
          type="number"
          name="quantity"
          value={editedProduct.quantity}
          onChange={handleChange}
        />

        <label>Price</label>
        <input
          type="text"
          name="price"
          value={editedProduct.price}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={editedProduct.description}
          onChange={handleChange}
        />

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">Cancel</button>
          <button onClick={handleSave} className="save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
