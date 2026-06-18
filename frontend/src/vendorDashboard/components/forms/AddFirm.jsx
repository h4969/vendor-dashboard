import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import "../../../App.css";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
    if (selectedImage) {
      setPreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();

    if (!firmName || !area) {
      alert("Please fill in firm name and area.");
      return;
    }
    if (category.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    setLoading(true);
    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        alert("Please log in first.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file);
      category.forEach(value => formData.append('category', value));
      region.forEach(value => formData.append('region', value));

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${loginToken}` },
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.firmId) {
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
        setPreview(null);

        localStorage.setItem('firmId', data.firmId);
        alert("Firm added successfully ✅");
      } else if (data.message === "vendor can have only one firm") {
        alert("Firm already exists. Only 1 firm is allowed.");
      } else {
        alert("Failed to add firm. Please try again.");
      }
    } catch (error) {
      console.error("Failed to add firm:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>

        <label>Firm Name</label>
        <input
          type="text"
          name="firmName"
          placeholder="e.g. Hema's Kitchen"
          value={firmName}
          onChange={(e) => setFirmName(e.target.value)}
        />

        <label>Area</label>
        <input
          type="text"
          name="area"
          placeholder="e.g. Indiranagar, Bengaluru"
          value={area}
          onChange={(e) => setArea(e.target.value)}
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

        <label>Offer <span className="optionalTag">(optional)</span></label>
        <input
          type="text"
          name="offer"
          placeholder="e.g. 20% off on orders above ₹299"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />

        <div className="checkInp">
          <label>Cuisine / Region</label>
          <div className="pillGroup">
            {["south-indian", "north-indian", "chinese", "bakery"].map((item) => (
              <label key={item} className={`pillOption ${region.includes(item) ? 'active' : ''}`}>
                <input type="checkbox" value={item} checked={region.includes(item)} onChange={handleRegionChange} />
                {item.replace("-", " ")}
              </label>
            ))}
          </div>
        </div>

        <label>Firm Image</label>
        <div className="fileUploadRow">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {preview && <img src={preview} alt="preview" className="imgPreview" />}
        </div>

        <div className="btnSubmit">
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Firm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;