import RiskDashboard
from "./pages/RiskDashboard";
import Analytics
from "./pages/Analytics";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Retailers from "./pages/Retailers";
import Products from "./pages/Products";
import SalesUpload from "./pages/SalesUpload";
import ExpiryUpload from "./pages/ExpiryUpload";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
  path="/analytics"
  element={<Analytics />}
/>

        <Route
          path="/retailers"
          element={<Retailers />}
        />
        <Route
          path="/risk-dashboard"
          element={<RiskDashboard />}
          />
        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/sales-upload"
          element={<SalesUpload />}
        />

        <Route
          path="/expiry-upload"
          element={<ExpiryUpload />}
        />

      </Routes>

    </BrowserRouter>
  );
}