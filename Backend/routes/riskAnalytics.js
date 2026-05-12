const express = require("express");
const router = express.Router();

const pool = require("../db");

// DETAILED RISK ANALYTICS
router.get(
  "/retailer-risk",

  async (req, res) => {

    try {

      const result = await pool.query(

        `
        SELECT

          invoice_date,

          retailer_code,

          retailer_name,

          product_code,

          product_name,

          sales_qty,

          expiry_qty,

          ROUND(

            (
              expiry_qty::numeric
              /

              NULLIF(
                sales_qty,
                0
              )

            ) * 100,

            2

          ) AS expiry_percent,

          CASE

            WHEN
            (
              expiry_qty::numeric
              /

              NULLIF(
                sales_qty,
                0
              )

            ) * 100 > 10

            THEN 'Critical'

            WHEN
            (
              expiry_qty::numeric
              /

              NULLIF(
                sales_qty,
                0
              )

            ) * 100 > 5

            THEN 'High'

            ELSE 'Normal'

          END AS risk_level

        FROM transactions

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