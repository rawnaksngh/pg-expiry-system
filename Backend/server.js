const riskAnalyticsRoutes =
require("./routes/riskAnalytics");
const transactionRoutes =
require("./routes/transactions");
const analyticsRoutes =
require("./routes/analytics");
const productUploadRoutes =
require("./routes/productUpload");
const express = require("express");
const cors = require("cors");
const pool = require("./db");

// ROUTES
const authRoutes = require("./routes/auth");
const retailerRoutes = require("./routes/retailers");
const productRoutes = require("./routes/products");
const dashboardRoutes = require("./routes/dashboard");

// TEMP TEST ROUTES
const retailerUploadRoutes =
require("./routes/retailerUpload");

const salesRoutes =
require("./routes/sales");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.use(
  "/api/transactions",
  transactionRoutes
);
// API ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/retailers", retailerRoutes);

app.use("/api/products", productRoutes);

app.use("/api/dashboard", dashboardRoutes);
app.use(
  "/api/risk",
  riskAnalyticsRoutes
);
// BULK UPLOAD ROUTES
app.use(
  "/api/retailer-upload",
  retailerUploadRoutes
);

app.use(
  "/api/sales",
  salesRoutes
);
app.use(
  "/api/analytics",
  analyticsRoutes
);
app.use(
  "/api/product-upload",
  productUploadRoutes
);

// ROOT ROUTE
app.get("/", async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT NOW()"
    );

    res.json({
      success: true,
      message:
        "Database Connected Successfully",
      serverTime: result.rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});
app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "Backend Running Successfully"
  });

});
// SERVER START
app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );
});