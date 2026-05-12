const express = require("express");
const router = express.Router();

const multer = require("multer");
const XLSX = require("xlsx");

const pool = require("../db");

// FILE STORAGE
const upload = multer({
  dest: "uploads/"
});

// EXCEL DATE CONVERTER
function excelDateToJSDate(serial) {

  // If already string date
  if (typeof serial === "string") {
    return serial;
  }

  // Convert Excel serial to JS date
  const utc_days =
    Math.floor(serial - 25569);

  const utc_value =
    utc_days * 86400;

  const date_info =
    new Date(utc_value * 1000);

  return date_info
    .toISOString()
    .split("T")[0];
}

// MASTER UPLOAD
router.post(

  "/upload",

  upload.single("file"),

  async (req, res) => {

    try {

      const workbook =
        XLSX.readFile(req.file.path);

      const sheetName =
        workbook.SheetNames[0];

      const data =
        XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );

      let inserted = 0;

      for (const row of data) {

        await pool.query(

          `INSERT INTO transactions
          (
            invoice_date,
            retailer_code,
            retailer_name,
            branch,
            product_code,
            product_name,
            batch_no,
            sales_qty,
            expiry_qty,
            value
          )

          VALUES(
            $1,$2,$3,$4,$5,
            $6,$7,$8,$9,$10
          )`,

          [

            excelDateToJSDate(
              row.invoice_date
            ),

            row.retailer_code,

            row.retailer_name,

            row.branch,

            row.product_code,

            row.product_name,

            row.batch_no,

            row.sales_qty || 0,

            row.expiry_qty || 0,

            row.value || 0
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