import React from "react";
import { CustomFormInput } from "../input/input";

const EditModal = ({ editProduct, setEditProduct, onSave, onCancel }) => {
  return (
    <div className="edit-modal">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <CustomFormInput
          label="Product Name"
          value={editProduct.productName}
          type="text"
          onChange={(e) =>
            setEditProduct({ ...editProduct, productName: e.target.value })
          }
        />
        <div className="product-image">
          <img
            src={editProduct.image}
            alt={editProduct.productName}
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "contain",
            }}
          />
        </div>
        <CustomFormInput
          label="Stock Quantity"
          value={editProduct.quantity?.piece || 0}
          type="number"
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              quantity: {
                ...editProduct.quantity,
                piece: Number(e.target.value),
              },
            })
          }
        />
        <CustomFormInput
          label="Price"
          value={editProduct.price}
          type="text"
          onChange={(e) =>
            setEditProduct({ ...editProduct, price: e.target.value })
          }
        />
        <div className="textarea">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="4"
            value={editProduct.description}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                description: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="save-btn" onClick={onSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
