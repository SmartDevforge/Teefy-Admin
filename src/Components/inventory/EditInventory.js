
import { useState } from "react";
import "./Inventory.css";
import { CustomFormInput } from "../input/input";

const EditInventory = ({ item, onClose }) => {
  const [stock, setStock] = useState(item.stock);
  const [threshold, setThreshold] = useState(item.threshold);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Updated ${item.product} stock: ${stock}, threshold: ${threshold}`);
    onClose();
  };

  return (
    <div className="edit-modal-container">
      <div className="edit-box">
        <h3>Edit Inventory</h3>
        <div onSubmit={handleSubmit}>

          <CustomFormInput label={'Current Stock'} value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
          <CustomFormInput label={'Current Stock'} value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}

          />
          <CustomFormInput label={'Current Stock'} value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />

          <div className="edit-actions">
            <button type="submit">Save</button>
            <button type="button" className="cancel" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInventory;

