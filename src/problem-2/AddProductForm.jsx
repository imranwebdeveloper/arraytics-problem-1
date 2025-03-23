import { useState } from "react";

const AddProductForm = ({ addProduct }) => {
  // Remove  multiple states
  const [formData, setFormData] = useState({ name: "", price: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Modified this function
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, price } = formData;

    // Add this line for common validation
    if (!name || !price) {
      alert("Please enter a valid product name and price.");
      return;
    }

    // Sanitize user input
    const trimmedName = name.trim();
    const parsedPrice = parseFloat(price);

    addProduct({ name: trimmedName, price: parsedPrice });
    setFormData({ name: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        // Modified this line for product name
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="number"
        // Modified this line for product price
        name="price"
        placeholder="Product Price"
        value={formData.price}
        onChange={handleChange}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
