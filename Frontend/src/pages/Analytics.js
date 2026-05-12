import { useEffect, useState } from "react";

import axios from "axios";

import MainLayout
from "../layouts/MainLayout";

export default function Analytics() {

  const [analytics, setAnalytics] =
  useState([]);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const response =
      await axios.get(

        "http://localhost:5000/api/analytics/monthly-retailer-product"

      );

      setAnalytics(
        response.data.data
      );

    } catch (err) {

      console.log(err);
    }
  };

  const getRiskColor = (percent) => {

    if (percent > 10)
      return "red";

    if (percent > 5)
      return "orange";

    return "green";
  };

  return (

    <MainLayout>

      <h1>
        Retailer Expiry Analytics
      </h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          marginTop: "20px",
          width: "100%",
          background: "white"
        }}
      >

        <thead>

          <tr>

            <th>Month</th>

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

            analytics.map((item, index) => {

              const expiry =
              parseFloat(
                item.expiry_percent
              );

              return (

                <tr key={index}>

                  <td>
                    {item.month}
                  </td>

                  <td>
                    {item.retailer_code}
                  </td>

                  <td>
                    {item.product_code}
                  </td>

                  <td>
                    {item.total_sales}
                  </td>

                  <td>
                    {item.total_expiry}
                  </td>

                  <td>
                    {item.expiry_percent}%
                  </td>

                  <td>

                    <span
                      style={{
                        color:
                        getRiskColor(expiry),

                        fontWeight: "bold"
                      }}
                    >

                      {

                        expiry > 10
                        ? "Critical"

                        : expiry > 5
                        ? "High"

                        : "Normal"

                      }

                    </span>

                  </td>

                </tr>
              );
            })
          }

        </tbody>

      </table>

    </MainLayout>
  );
}