const express = require("express");
const router = express.Router();

const pool = require("../db");

// MONTHLY RETAILER + PRODUCT ANALYTICS
router.get(
  "/monthly-retailer-product",
  async (req, res) => {

    try {

      const result = await pool.query(

        `
        SELECT

          TO_CHAR(
            s.invoice_date,
            'YYYY-MM'
          ) AS month,

          s.retailer_code,

          s.product_code,

          SUM(s.qty) AS total_sales,

          COALESCE(
            SUM(er.qty_returned),
            0
          ) AS total_expiry,

          ROUND(

            (
              COALESCE(
                SUM(er.qty_returned),
                0
              )::numeric

              /

              NULLIF(
                SUM(s.qty),
                0
              )

            ) * 100,

            2

          ) AS expiry_percent

        FROM sales s

        LEFT JOIN expiry_returns er

        ON s.retailer_code =
           er.retailer_code

        AND s.product_code =
            er.product_code

        GROUP BY

          month,
          s.retailer_code,
          s.product_code

        ORDER BY
          expiry_percent DESC
        `
      );

      res.json({
        success: true,
        data: result.rows
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  }
);

module.exports = router;