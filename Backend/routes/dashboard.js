const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/stats", async (req, res) => {

  try {

    const retailerCount = await pool.query(
      "SELECT COUNT(*) FROM retailers"
    );

    const productCount = await pool.query(
      "SELECT COUNT(*) FROM products"
    );

    const expiryValue = await pool.query(
      `SELECT COALESCE(SUM(return_value),0)
       AS total_expiry
       FROM expiry_returns`
    );

    res.json({
      totalRetailers:
        retailerCount.rows[0].count,

      totalProducts:
        productCount.rows[0].count,

      totalExpiry:
        expiryValue.rows[0].total_expiry
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;