import { useEffect, useState } from "react";

import axios from "axios";

import MainLayout
from "../layouts/MainLayout";

export default function RiskDashboard() {

  const [data, setData] =
  useState([]);

  useEffect(() => {

    fetchRiskData();

  }, []);

  const fetchRiskData = async () => {

    try {

      const response =
      await axios.get(

        "http://localhost:5000/api/risk/retailer-risk"

      );

      setData(
        response.data.data
      );

    } catch (err) {

      console.log(err);
    }
  };

  const getColor = (risk) => {

    if (risk === "Critical")
      return "red";

    if (risk === "High")
      return "orange";

    return "green";
  };

  return (

    <MainLayout>

      <h1>
        Retailer Risk Dashboard
      </h1>

      <table

        border="1"

        cellPadding="10"

        style={{
          width: "100%",
          marginTop: "20px",
          background: "white"
        }}
      >

        <thead>

  <tr>

    <th>Date</th>

    <th>Retailer</th>

    <th>Product</th>

    <th>Sales Qty</th>

    <th>Expiry Qty</th>

    <th>Expiry %</th>

    <th>Risk</th>

  </tr>

</thead>

        <tbody>

{
  data.map((item, index) => (

    <tr key={index}>

      <td>
        {
          new Date(
            item.invoice_date
          ).toLocaleDateString()
        }
      </td>

      <td>
        {item.retailer_name}
      </td>

      <td>
        {item.product_name}
      </td>

      <td>
        {item.sales_qty}
      </td>

      <td>
        {item.expiry_qty}
      </td>

      <td>
        {item.expiry_percent}%
      </td>

      <td>

        <span
          style={{
            color:
            getColor(
              item.risk_level
            ),

            fontWeight:
            "bold"
          }}
        >

          {item.risk_level}

        </span>

      </td>

    </tr>
  ))
}

</tbody>

      </table>

    </MainLayout>
  );
}