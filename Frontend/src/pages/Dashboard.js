import { useEffect, useState } from "react";
import axios from "axios";

import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {

  const [stats, setStats] = useState({
    totalRetailers: 0,
    totalProducts: 0,
    totalExpiry: 0
  });

  useEffect(() => {

    fetchDashboardStats();

  }, []);

  const fetchDashboardStats = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/dashboard/stats"
      );

      setStats(response.data);

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <MainLayout>

      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginTop: "20px"
        }}
      >

        {/* RETAILERS */}

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px"
          }}
        >

          <h3>Total Retailers</h3>

          <h1>
            {stats.totalRetailers}
          </h1>

        </div>

        {/* PRODUCTS */}

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px"
          }}
        >

          <h3>Total Products</h3>

          <h1>
            {stats.totalProducts}
          </h1>

        </div>

        {/* EXPIRY */}

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px"
          }}
        >

          <h3>Total Expiry</h3>

          <h1>
            ₹ {stats.totalExpiry}
          </h1>

        </div>

      </div>

    </MainLayout>
  );
}