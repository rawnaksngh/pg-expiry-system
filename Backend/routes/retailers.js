const express = require("express");
const router = express.Router();
const pool = require("../db");

// CREATE RETAILER
router.post("/", async (req, res) => {

  try {

    const {
      retailer_code,
      retailer_name,
      area,
      salesman,
      mobile,
      status
    } = req.body;

    const retailer = await pool.query(
      `INSERT INTO retailers
      (retailer_code, retailer_name, area, salesman, mobile, status)

      VALUES($1,$2,$3,$4,$5,$6)

      RETURNING *`,
      [
        retailer_code,
        retailer_name,
        area,
        salesman,
        mobile,
        status
      ]
    );

    res.json({
      success: true,
      retailer: retailer.rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// GET ALL RETAILERS
router.get("/", async (req, res) => {

  try {

    const retailers = await pool.query(
      "SELECT * FROM retailers ORDER BY id DESC"
    );

    res.json({
      success: true,
      retailers: retailers.rows
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;