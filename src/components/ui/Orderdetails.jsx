
const sampleOrderDetails = {
  paymentMethod: "UPI",
  subtotal: 429,
  discountPercent: 20,
  shipping: 0,
  total: 336,
  customer: {
    address: "2/17 SR Avenue, Kumudam nagar,\nVilankurichi road, Coimbatore - 641 045",
    email: "Sampath@gmail.com",
    phone: "+91 94436 76489",
  },
  products: [
    {
      id: 1,
      name: "Gingelly Oil",
      price: 122,
      quantity: 2,
      subtotal: 244,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=80&h=80&fit=crop",
    },
    {
      id: 2,
      name: "Kambu Noodles (Pearl Millet)",
      price: 53,
      quantity: 1,
      subtotal: 53,
      image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=80&h=80&fit=crop",
    },
    {
      id: 3,
      name: "Herbal Hair Oil",
      price: 132,
      quantity: 1,
      subtotal: 132,
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=80&h=80&fit=crop",
    },
  ],
};

export default function OrderModal({ order, onClose }) {
  const details = {
    ...sampleOrderDetails,
    orderId: order.id,
    customer: {
      ...sampleOrderDetails.customer,
      name: order.customerName,
    },
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 20, 40, 0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        backdropFilter: "blur(3px)",
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          width: "min(920px, 96vw)",
          maxHeight: "92vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 20px 60px rgba(10,20,60,0.15), 0 2px 8px rgba(10,20,60,0.08)",
          padding: "40px 40px 32px",
        }}
      >
        {/* ── Close button ── */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 32,
            height: 32,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: 22,
            color: "#374151",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
            borderRadius: "50%",
          }}
        >
          ×
        </button>

        {/* ── Top section ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr",
            gap: 0,
            marginBottom: 36,
            alignItems: "start",
          }}
        >
          {/* Left – Shipping address */}
          <div style={{ paddingRight: 40 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.8,
                color: "#9aa5b4",
                marginBottom: 18,
                textTransform: "uppercase",
                margin: "0 0 18px 0",
              }}
            >
              Shipping Address
            </p>

            <p
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#111827",
                margin: "0 0 10px 0",
                letterSpacing: -0.3,
              }}
            >
              {details.customer.name}
            </p>

            <p
              style={{
                fontSize: 14,
                color: "#4b5563",
                lineHeight: 1.65,
                whiteSpace: "pre-line",
                margin: "0 0 24px 0",
              }}
            >
              {details.customer.address}
            </p>

            <div style={{ marginBottom: 14 }}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  color: "#9aa5b4",
                  textTransform: "uppercase",
                  margin: "0 0 4px 0",
                }}
              >
                Email
              </p>
              <p style={{ fontSize: 14, color: "#111827", fontWeight: 500, margin: 0 }}>
                {details.customer.email}
              </p>
            </div>

            <div>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  color: "#9aa5b4",
                  textTransform: "uppercase",
                  margin: "0 0 4px 0",
                }}
              >
                Phone
              </p>
              <p style={{ fontSize: 14, color: "#111827", fontWeight: 500, margin: 0 }}>
                {details.customer.phone}
              </p>
            </div>
          </div>

          {/* Dashed vertical divider */}
          <div
            style={{
              background:
                "repeating-linear-gradient(to bottom, #c7d2e0 0px, #c7d2e0 5px, transparent 5px, transparent 10px)",
              width: 1,
              alignSelf: "stretch",
            }}
          />

          {/* Right – Order summary card */}
          <div style={{ paddingLeft: 40 }}>
            <div
              style={{
                border: "1.5px solid #e5e9f0",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {/* Order ID + Payment Method */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  borderBottom: "1.5px solid #e5e9f0",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    borderRight: "1.5px solid #e5e9f0",
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1.4,
                      color: "#9aa5b4",
                      textTransform: "uppercase",
                      margin: "0 0 5px 0",
                    }}
                  >
                    Order ID:
                  </p>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    {details.orderId}
                  </p>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1.4,
                      color: "#9aa5b4",
                      textTransform: "uppercase",
                      margin: "0 0 5px 0",
                    }}
                  >
                    Payment Method:
                  </p>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    {details.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Subtotal / Discount / Shipping */}
              {[
                { label: "Subtotal:", value: `₹${details.subtotal}.00`, bold: false },
                { label: "Discount",  value: `${details.discountPercent}%`, bold: false },
                {
                  label: "Shipping",
                  value: details.shipping === 0 ? "Free" : `₹${details.shipping}.00`,
                  bold: false,
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 20px",
                    borderBottom: "1px solid #f0f3f7",
                  }}
                >
                  <span style={{ fontSize: 14, color: "#6b7280" }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{value}</span>
                </div>
              ))}

              {/* Total */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 20px",
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Total</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: "#16a34a" }}>
                  ₹{details.total}.00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Products table ── */}
        <div
          style={{
            border: "1.5px solid #e5e9f0",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 140px 160px 160px",
              background: "#f8fafc",
              padding: "12px 20px",
              borderBottom: "1.5px solid #e5e9f0",
            }}
          >
            {[
              { label: "Product",  align: "left" },
              { label: "Price",    align: "center" },
              { label: "Quantity", align: "center" },
              { label: "Subtotal", align: "center" },
            ].map(({ label, align }) => (
              <p
                key={label}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#9aa5b4",
                  letterSpacing: 1.3,
                  textTransform: "uppercase",
                  textAlign: align,
                  margin: 0,
                }}
              >
                {label}
              </p>
            ))}
          </div>

          {/* Product rows */}
          {details.products.map((p, i) => (
            <div
              key={p.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 140px 160px 160px",
                padding: "14px 20px",
                alignItems: "center",
                borderBottom:
                  i < details.products.length - 1 ? "1px solid #f0f3f7" : "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fafbfc")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Product name + image */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    overflow: "hidden",
                    border: "1px solid #e5e9f0",
                    flexShrink: 0,
                    background: "#f8fafc",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.innerHTML = "🛒";
                      e.currentTarget.parentElement.style.fontSize = "22px";
                      e.currentTarget.parentElement.style.display = "flex";
                      e.currentTarget.parentElement.style.alignItems = "center";
                      e.currentTarget.parentElement.style.justifyContent = "center";
                    }}
                  />
                </div>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#1f2937" }}>
                  {p.name}
                </span>
              </div>

              {/* Price */}
              <p
                style={{
                  fontSize: 14,
                  color: "#374151",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                ₹{p.price}.00
              </p>

              {/* Quantity */}
              <p
                style={{
                  fontSize: 14,
                  color: "#374151",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                x{p.quantity}
              </p>

              {/* Subtotal */}
              <p
                style={{
                  fontSize: 14,
                  color: "#374151",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                ₹{p.subtotal}.00
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}