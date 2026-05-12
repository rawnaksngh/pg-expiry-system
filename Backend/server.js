const express = require("express");
const cors = require("cors");
const path = require("path");

const pool = require("./db");

const app = express();

// ROUTES
const authRoutes = require("./routes/auth");
const retailerRoutes = require("./routes/retailers");
const productRoutes = require("./routes/products");
const dashboardRoutes = require("./routes/dashboard");

const retailerUploadRoutes =
require("./routes/retailerUpload");

const productUploadRoutes =
require("./routes/productUpload");

const salesRoutes =
require("./routes/sales");

const analyticsRoutes =
require("./routes/analytics");

const riskAnalyticsRoutes =
require("./routes/riskAnalytics");

const transactionRoutes =
require("./routes/transactions");

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// API ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/retailers", retailerRoutes);

app.use("/api/products", productRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/risk", riskAnalyticsRoutes);

app.use(
  "/api/retailer-upload",
  retailerUploadRoutes
);

app.use(
  "/api/product-upload",
  productUploadRoutes
);

app.use("/api/sales", salesRoutes);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/transactions",
  transactionRoutes
);

// FRONTEND BUILD
app.use(
  express.static(
    path.join(__dirname, "build")
  )
);

// REACT ROUTES
app.get("/*", (req, res) => {

  res.sendFile(

    path.join(
      __dirname,
      "build",
      "index.html"
    )
  );
});

// SERVER START
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});