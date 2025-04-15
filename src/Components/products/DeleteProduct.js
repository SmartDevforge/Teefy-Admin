import React from "react";
import { FiTrash2 } from "react-icons/fi";

const DeleteModal = ({ confirmDelete, onCancel, onConfirm }) => {
  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        <div>
          <FiTrash2 />
        </div>
        <h5>Are you sure you want to delete this product?</h5>
        <p>{confirmDelete.productName}</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
