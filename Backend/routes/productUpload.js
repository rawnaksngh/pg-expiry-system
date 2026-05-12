const express = require("express");
const router = express.Router();

const multer = require("multer");
const XLSX = require("xlsx");

const pool = require("../db");

const upload = multer({
  dest: "uploads/"
});

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

          `INSERT INTO products
          (
            product_code,
            product_name,
            category,
            allowed_expiry_percent
          )

          VALUES($1,$2,$3,$4)`,

          [
            row.product_code,
            row.product_name,
            row.category,
            row.allowed_expiry_percent
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