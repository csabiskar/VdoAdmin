import { useState } from "react";
import { Edit2, Maximize2, Search, ChevronDown } from "lucide-react";
import EditStatusModal from "../../components/ui/Editstatusmodal";

const statusConfig = {
  "Out for delivery": {
    bg: "#E0F7FA",
    text: "#00838F",
    border: "#80DEEA",
  },
  "Shipped": {
    bg: "#E8F5E9",
    text: "#2E7D32",
    border: "#A5D6A7",
  },
  "Returned": {
    bg: "#FCE4EC",
    text: "#C62828",
    border: "#F48FB1",
  },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || { bg: "#F5F5F5", text: "#616161", border: "#E0E0E0" };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 12px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 500,
        backgroundColor: cfg.bg,
        color: cfg.text,
        border: `1px solid ${cfg.border}`,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

export default function Orders() {

  const [ordersData, setOrdersData] = useState([
    { id: "#59217", status: "Out for delivery", item: 1, customerId: "1234567890", customerName: "Raghu", orderValue: "₹4000/-", trackingId: "94001001093611300313" },
    { id: "#59213", status: "Out for delivery", item: 2, customerId: "1234567890", customerName: "Abiskar", orderValue: "₹4000/-", trackingId: "94001001093611300313" },
    { id: "#59219", status: "Shipped", item: 12, customerId: "1234567890", customerName: "Harish", orderValue: "₹4000/-", trackingId: "94001001093611300313" },
    { id: "#59220", status: "Returned", item: 22, customerId: "1234567890", customerName: "Raghu", orderValue: "₹4000/-", trackingId: "94001001093611300313" },
  ]);

  const [searchField, setSearchField] = useState("Order ID");
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [fieldDropdownOpen, setFieldDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fields = ["Order ID", "Customer Name", "Tracking ID"];
  const statuses = ["All", "Out for delivery", "Shipped", "Returned"];

  const filteredOrders = ordersData.filter((order) => {

    const matchesSearch =
      searchValue === "" ||
      (searchField === "Order ID" && order.id.toLowerCase().includes(searchValue.toLowerCase())) ||
      (searchField === "Customer Name" && order.customerName.toLowerCase().includes(searchValue.toLowerCase())) ||
      (searchField === "Tracking ID" && order.trackingId.includes(searchValue));

    const matchesStatus =
      !statusFilter || statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;

  });

  const columns = [
    "Order ID",
    "STATUS",
    "Item",
    "Customer ID",
    "Customer Name",
    "Order Value",
    "Tracking ID",
    "Actions"
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "20px", fontFamily: "'Segoe UI', sans-serif" }}>

      <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#1A1A2E", marginBottom: "24px" }}>
        Orders
      </h1>

      <div style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        border: "1px solid #E3E6EF",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
      }}>

        {/* TABLE */}
        <div style={{ overflowX: "auto" }}>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>

            <thead>
              <tr style={{ borderBottom: "1px solid #E3E6EF", backgroundColor: "#EAF8E7" }}>
                {columns.map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "12px 20px",
                      textAlign: "left",
                      color: "#374151",
                      fontWeight: 600,
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                      borderRight: "1px solid #E3E6EF",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>

              {filteredOrders.map((order, idx) => (

                <tr
                  key={idx}
                  style={{
                    borderBottom: "1px solid #F0F2F7",
                    transition: "background 0.15s",
                    backgroundColor: "#FFFFFF"
                  }}
                >

                  <td style={{ padding: "11px 20px", borderRight: "1px solid #F0F2F7" }}>
                    {order.id}
                  </td>

                  <td style={{ padding: "11px 20px", borderRight: "1px solid #F0F2F7" }}>
                    <StatusBadge status={order.status} />
                  </td>

                  <td style={{ padding: "11px 20px", borderRight: "1px solid #F0F2F7" }}>
                    {order.item}
                  </td>

                  <td style={{ padding: "11px 20px", borderRight: "1px solid #F0F2F7" }}>
                    {order.customerId}
                  </td>

                  <td style={{ padding: "11px 20px", borderRight: "1px solid #F0F2F7" }}>
                    {order.customerName}
                  </td>

                  <td style={{ padding: "11px 20px", borderRight: "1px solid #F0F2F7" }}>
                    {order.orderValue}
                  </td>

                  <td style={{ padding: "11px 20px", borderRight: "1px solid #F0F2F7" }}>
                    {order.trackingId}
                  </td>

                  <td style={{ padding: "11px 20px" }}>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

                      {/* EDIT BUTTON */}
                      <button
                        style={{
                          padding: "4px",
                          color: "#9CA3AF",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          borderRadius: "4px",
                          display: "flex"
                        }}
                        onClick={() => {
                          setSelectedOrder(order);
                          setEditModalOpen(true);
                        }}
                      >
                        <Edit2 size={15} />
                      </button>

                      <button
                        style={{
                          padding: "4px",
                          color: "#9CA3AF",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          borderRadius: "4px",
                          display: "flex"
                        }}
                      >
                        <Maximize2 size={15} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* EDIT STATUS MODAL */}
      {editModalOpen && selectedOrder && (

        <EditStatusModal
          orderId={selectedOrder.id}
          currentStatus={selectedOrder.status}

          onSave={(status) => {

            setOrdersData((prev) =>
              prev.map((order) =>
                order.id === selectedOrder.id
                  ? { ...order, status: status }
                  : order
              )
            );

            setEditModalOpen(false);
          }}

          onCancel={() => setEditModalOpen(false)}
        />

      )}

    </div>
  );
}