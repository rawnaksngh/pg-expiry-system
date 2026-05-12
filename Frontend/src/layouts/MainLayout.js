import { Link } from "react-router-dom";

export default function MainLayout({ children }) {

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh"
      }}
    >

      {/* SIDEBAR */}

      <div
        style={{
          width: "250px",
          background: "#1e293b",
          color: "white",
          padding: "20px"
        }}
      >

        <h2>P&G ERP</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "30px"
          }}
        >

          <Link
            to="/dashboard"
            style={{ color: "white" }}
          >
            Dashboard
          </Link>

          <Link
            to="/retailers"
            style={{ color: "white" }}
          >
            Retailers
          </Link>

          <Link
            to="/products"
            style={{ color: "white" }}
          >
            Products
          </Link>
<Link
  to="/risk-dashboard"
  style={{ color: "white" }}
>
  Risk Dashboard
</Link>
          <Link
            to="/sales-upload"
            style={{ color: "white" }}
          >
            Sales Upload
          </Link>
          <Link
  to="/analytics"
  style={{ color: "white" }}
>
  Analytics
</Link>

          <Link
            to="/expiry-upload"
            style={{ color: "white" }}
          >
            Expiry Upload
          </Link>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div
        style={{
          flex: 1,
          padding: "20px",
          background: "#f1f5f9"
        }}
      >

        {children}

      </div>

    </div>
  );
}