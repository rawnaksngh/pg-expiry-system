const express = require("express");
const router = express.Router();

const multer = require("multer");
const XLSX = require("xlsx");

const pool = require("../db");

const upload = multer({
  dest: "uploads/"
});

// SALES BULK UPLOAD
router.post(
  "/upload",
  upload.single("file"),

  async (req, res) => {

    try {

      const workbook =
        XLSX.readFile(req.file.path);

      const sheetName =
        workbook.SheetNames[2];

      const data =
        XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );

      let inserted = 0;

      for (const row of data) {

        await pool.query(

          `INSERT INTO sales
          (
            invoice_no,
            invoice_date,
            retailer_code,
            product_code,
            batch_no,
            qty,
            value
          )

          VALUES($1,$2,$3,$4,$5,$6,$7)`,

          [
            row.invoice_no,
            row.invoice_date,
            row.retailer_code,
            row.product_code,
            row.batch_no,
            row.qty,
            row.value
          ]
        );

        inserted++;
      }

      res.json({
        success: true,
        inserted
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