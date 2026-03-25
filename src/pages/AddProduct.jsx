import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const AddProduct = () => {
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("productName", "Test Product");
    formData.append("productDesc", "Test Desc");
    formData.append("productPrice", 999);
    formData.append("category", "Mobile");
    formData.append("brand", "Apple");

    files.forEach((file) => {
      formData.append("files", file); // ✅ MATCH BACKEND
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/products/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product added");
    } catch (err) {
      console.log(err);
      toast.error("Add product failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        multiple
        onChange={(e) => setFiles([...e.target.files])}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
