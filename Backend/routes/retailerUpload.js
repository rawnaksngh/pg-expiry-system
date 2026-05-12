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

          `INSERT INTO retailers
          (
            retailer_code,
            retailer_name,
            area,
            salesman,
            mobile,
            status
          )

          VALUES($1,$2,$3,$4,$5,$6)`,

          [
            row.retailer_code,
            row.retailer_name,
            row.area,
            row.salesman,
            row.mobile,
            row.status
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