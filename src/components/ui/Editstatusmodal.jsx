import { useState } from "react";

const STATUSES = [
  "Order received",
  "Processing",
  "On the way",
  "Delivered"
];

export default function EditStatusModal({ orderId = "#59217", currentStatus = "Out for Delivery", onSave, onCancel }) {
  const [selected, setSelected] = useState(currentStatus);

  const handleSave = () => {
    if (onSave) onSave(selected);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <div style={{
      position: "fixed", inset: 0,
      backgroundColor: "rgba(0,0,0,0.35)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
    }}>
     
      <div style={{
        width: "489px",
        minHeight: "424px",
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        border: "2px solid #60C8FF",
        padding: "36px 32px 36px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', sans-serif",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}>

       
        <h2 style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "#1A1A2E",
          marginBottom: "28px",
          textAlign: "center",
        }}>
          Edit Status - Order ID {orderId}
        </h2>

        {/* Status toggle rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          {STATUSES.map((status) => {
            const isOn = selected === status;
            return (
              <div
                key={status}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "15px", color: "#374151", fontWeight: 500 }}>
                  {status}
                </span>

                {/* Toggle */}
                <button
                  onClick={() => setSelected(isOn ? "" : status)}
                  style={{
                    width: "52px",
                    height: "28px",
                    borderRadius: "999px",
                    backgroundColor: isOn ? "#00B207" : "#D1D5DB",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background-color 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  <span style={{
                    position: "absolute",
                    top: "3px",
                    left: isOn ? "26px" : "3px",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    transition: "left 0.2s ease",
                    display: "block",
                  }} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
          marginTop: "24px",
        }}>
          <button
            onClick={handleCancel}
            style={{
              padding: "10px 32px",
              borderRadius: "8px",
              border: "1px solid #D1D5DB",
              backgroundColor: "#FFFFFF",
              color: "#00B207",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#F9FAFB"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#FFFFFF"}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "10px 40px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#00B207",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#009606"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#00B207"}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}


export function EditStatusModalDemo() {
  const [open, setOpen] = useState(true);
  const [savedStatus, setSavedStatus] = useState(null);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5F6FA", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      {!open && (
        <div style={{ textAlign: "center" }}>
          {savedStatus && <p style={{ marginBottom: "12px", color: "#374151" }}>Saved status: <strong>{savedStatus}</strong></p>}
          <button
            onClick={() => setOpen(true)}
            style={{ padding: "10px 24px", backgroundColor: "#00B207", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}
          >
            Open Modal
          </button>
        </div>
      )}
      {open && (
        <EditStatusModal
          orderId="#59217"
          currentStatus="Out for Delivery"
          onSave={(status) => { setSavedStatus(status); setOpen(false); }}
          onCancel={() => setOpen(false)}
        />
      )}
    </div>
  );
}