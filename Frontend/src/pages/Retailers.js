import { useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

export default function Retailers() {

  const [formData, setFormData] = useState({
    retailer_code: "",
    retailer_name: "",
    area: "",
    salesman: "",
    mobile: "",
    status: "Active"
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveRetailer = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/retailers",
        formData
      );

      alert("Retailer Added");

    } catch (err) {

      console.log(err);

      alert("Error");
    }
  };

  return (

    <MainLayout>

      <h1>Retailers</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px"
        }}
      >

        <input
          name="retailer_code"
          placeholder="Retailer Code"
          onChange={handleChange}
        />

        <input
          name="retailer_name"
          placeholder="Retailer Name"
          onChange={handleChange}
        />

        <input
          name="area"
          placeholder="Area"
          onChange={handleChange}
        />

        <input
          name="salesman"
          placeholder="Salesman"
          onChange={handleChange}
        />

        <input
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
        />

        <button onClick={saveRetailer}>
          Save Retailer
        </button>

      </div>

    </MainLayout>
  );
}