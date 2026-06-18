import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import "../../../App.css";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSeller = (event) => {
    setBestSeller(event.target.value === 'true');
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    if (selectedImage) {
      setPreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!productName || !price) {
      alert("Please enter product name and price.");
      return;
    }
    if (category.length === 0) {
      alert("Please select a category.");
      return;
    }

    setLoading(true);
    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');

      if (!loginToken || !firmId) {
        alert("Please log in and add a firm first.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('bestSeller', bestSeller);
      formData.append('image', image);
      category.forEach((value) => formData.append('category', value));

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${loginToken}` },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('Product added successfully ✅');
        setProductName("");
        setPrice("");
        setCategory([]);
        setBestSeller(false);
        setImage(null);
        setPreview(null);
        setDescription("");
      } else {
        alert(data.error || 'Failed to add product');
      }
    } catch (error) {
      alert('Failed to add product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>

        <label>Product Name</label>
        <input
          type="text"
          placeholder="e.g. Masala Dosa"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label>Price (₹)</label>
        <input
          type="number"
          placeholder="e.g. 80"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="checkInp">
          <label>Category</label>
          <div className="pillGroup">
            <label className={`pillOption ${category.includes('veg') ? 'active' : ''}`}>
              <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} />
              🥦 Veg
            </label>
            <label className={`pillOption ${category.includes('non-veg') ? 'active' : ''}`}>
              <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} />
              🍗 Non-Veg
            </label>
          </div>
        </div>

        <div className="checkInp">
          <label>Bestseller</label>
          <div className="pillGroup">
            <label className={`pillOption ${bestSeller === true ? 'active' : ''}`}>
              <input type="radio" value="true" checked={bestSeller === true} onChange={handleBestSeller} />
              ⭐ Yes
            </label>
            <label className={`pillOption ${bestSeller === false ? 'active' : ''}`}>
              <input type="radio" value="false" checked={bestSeller === false} onChange={handleBestSeller} />
              No
            </label>
          </div>
        </div>

        <label>Description <span className="optionalTag">(optional)</span></label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          placeholder="Enter product description..."
        ></textarea>

        <label>Product Image</label>
        <div className="fileUploadRow">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {preview && <img src={preview} alt="preview" className="imgPreview" />}
        </div>

        <div className="btnSubmit">
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;