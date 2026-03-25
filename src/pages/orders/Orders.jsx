import { useEffect, useState } from "react";
import { Edit2, Maximize2, Search, ChevronDown } from "lucide-react";
import EditStatusModal from "../../components/ui/Editstatusmodal";
import OrderModal from "../../components/ui/Orderdetails";
import {
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../../api/order.api";

const statusConfig = {
  "Out for delivery": {
    bg: "#E0F7FA",
    text: "#00838F",
    border: "#80DEEA",
  },
  Shipped: {
    bg: "#E8F5E9",
    text: "#2E7D32",
    border: "#A5D6A7",
  },
  Returned: {
    bg: "#FCE4EC",
    text: "#C62828",
    border: "#F48FB1",
  },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || {
    bg: "#F5F5F5",
    text: "#616161",
    border: "#E0E0E0",
  };

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

const PAGE_SIZE = 10; // rows per page

export default function Orders() {
  const [ordersData, setOrdersData] = useState([]);
  const [searchField, setSearchField] = useState("Order ID");
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const [fieldDropdownOpen, setFieldDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDetailOrder, setSelectedDetailOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  const fields = ["Order ID", "Customer Name", "Tracking ID"];
  const statuses = ["All", "Order received", "Processing", "On the way", "Delivered"];

  const formatOrderForUI = (order) => ({
    id: order._id,
    displayId:
      order.orderNumber || `#${String(order._id).slice(-5).toUpperCase()}`,
    status: order.orderStatus || "Out for delivery",
    item: order.totalItems || order.items?.length || 0,
    customerId: order.userId?._id || order.userId || "-",
    customerName: order.shippingAddress
      ? `${order.shippingAddress.firstName || ""} ${order.shippingAddress.lastName || ""}`.trim()
      : "-",
    orderValue: `₹${order.totalAmount || 0}/-`,
    trackingId: order.trackingId || "-",
    raw: order,
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Fetch all orders at once — pagination is handled on the frontend
      const res = await getAllOrders({ page: 1, limit: 10000 });

      const ordersArray = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.orders)
            ? res.orders
            : Array.isArray(res?.docs)
              ? res.docs
              : Array.isArray(res?.data?.docs)
                ? res.data.docs
                : [];

      setOrdersData(ordersArray.map(formatOrderForUI));
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrdersData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ── Reset to page 1 whenever search/filter changes ──────────────────────
  useEffect(() => {
    setPage(1);
  }, [searchValue, searchField, statusFilter]);

  // ── Filter all orders ────────────────────────────────────────────────────
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      searchValue === "" ||
      (searchField === "Order ID" &&
        (order.displayId || "")
          .toLowerCase()
          .includes(searchValue.toLowerCase())) ||
      (searchField === "Customer Name" &&
        (order.customerName || "")
          .toLowerCase()
          .includes(searchValue.toLowerCase())) ||
      (searchField === "Tracking ID" &&
        (order.trackingId || "")
          .toLowerCase()
          .includes(searchValue.toLowerCase()));

    const matchesStatus =
      !statusFilter || statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ── Frontend pagination ──────────────────────────────────────────────────
  const totalItems = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const columns = [
    "Order ID",
    "STATUS",
    "Item",
    "Customer ID",
    "Customer Name",
    "Order Value",
    "Tracking ID",
    "Actions",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "#1A1A2E",
          marginBottom: "24px",
        }}
      >
        Orders
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative" }}>
          <button
            onClick={() => {
              setFieldDropdownOpen((prev) => !prev);
              setStatusDropdownOpen(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #E3E6EF",
              background: "#fff",
              fontSize: "13px",
              color: "#374151",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {searchField}
            <ChevronDown size={14} />
          </button>
          {fieldDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                background: "#fff",
                border: "1px solid #E3E6EF",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                zIndex: 50,
                minWidth: "150px",
                overflow: "hidden",
              }}
            >
              {fields.map((f) => (
                <div
                  key={f}
                  onClick={() => {
                    setSearchField(f);
                    setFieldDropdownOpen(false);
                  }}
                  style={{
                    padding: "9px 14px",
                    fontSize: "13px",
                    color: "#374151",
                    cursor: "pointer",
                    backgroundColor:
                      searchField === f ? "#F0FFF4" : "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#F9FAFB")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      searchField === f ? "#F0FFF4" : "transparent")
                  }
                >
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            position: "relative",
            flex: "1",
            minWidth: "180px",
            maxWidth: "280px",
          }}
        >
          <Search
            size={14}
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9CA3AF",
            }}
          />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Search by ${searchField}`}
            style={{
              width: "100%",
              paddingLeft: "32px",
              paddingRight: "12px",
              paddingTop: "8px",
              paddingBottom: "8px",
              borderRadius: "8px",
              border: "1px solid #E3E6EF",
              fontSize: "13px",
              color: "#374151",
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => {
              setStatusDropdownOpen((prev) => !prev);
              setFieldDropdownOpen(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #E3E6EF",
              background: "#fff",
              fontSize: "13px",
              color: "#374151",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {statusFilter && statusFilter !== "All" ? statusFilter : "Status"}
            <ChevronDown size={14} />
          </button>
          {statusDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                background: "#fff",
                border: "1px solid #E3E6EF",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                zIndex: 50,
                minWidth: "170px",
                overflow: "hidden",
              }}
            >
              {statuses.map((s) => (
                <div
                  key={s}
                  onClick={() => {
                    setStatusFilter(s === "All" ? "" : s);
                    setStatusDropdownOpen(false);
                  }}
                  style={{
                    padding: "9px 14px",
                    fontSize: "13px",
                    color: "#374151",
                    cursor: "pointer",
                    backgroundColor:
                      statusFilter === s || (s === "All" && !statusFilter)
                        ? "#F0FFF4"
                        : "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#F9FAFB")
                  }
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      statusFilter === s || (s === "All" && !statusFilter)
                        ? "#F0FFF4"
                        : "transparent";
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          border: "1px solid #E3E6EF",
          overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid #E3E6EF",
                  backgroundColor: "#EAF8E7",
                }}
              >
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
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    style={{
                      padding: "32px",
                      textAlign: "center",
                      color: "#9CA3AF",
                      fontSize: "14px",
                    }}
                  >
                    Loading orders...
                  </td>
                </tr>
              ) : paginatedOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    style={{
                      padding: "32px",
                      textAlign: "center",
                      color: "#9CA3AF",
                      fontSize: "14px",
                    }}
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order, idx) => (
                  <tr
                    key={order.id || idx}
                    style={{
                      borderBottom: "1px solid #F0F2F7",
                      transition: "background 0.15s",
                      backgroundColor: "#FFFFFF",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#FAFAFA")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#FFFFFF")
                    }
                  >
                    <td style={{ padding: "11px 20px", borderRight: "1px solid #F0F2F7" }}>
                      {order.displayId}
                    </td>
                    <td style={{ padding: "11px 20px", borderRight: "1px solid #F0F2F7" }}>
                      <StatusBadge status={order.status} />
                    </td>
                    <td style={{ padding: "11px 20px", borderRight: "1px solid #F0F2F7" }}>
                      {order.item}
                    </td>
                    <td style={{ padding: "11px 20px", borderRight: "1px solid #F0F2F7" }}>
                      {order.id}
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
                        <button
                          title="Edit Status"
                          style={{
                            padding: "4px",
                            color: "#9CA3AF",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "4px",
                            display: "flex",
                          }}
                          onClick={() => {
                            setSelectedOrder(order);
                            setEditModalOpen(true);
                          }}
                        >
                          <Edit2 size={15} />
                        </button>

                        <button
                          title="View Order Details"
                          style={{
                            padding: "4px",
                            color: "#9CA3AF",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "4px",
                            display: "flex",
                          }}
                          onClick={async () => {
                            try {
                              const res = await getSingleOrder(order.id);
                              const fullOrder = res?.data || res;
                              setSelectedDetailOrder(formatOrderForUI(fullOrder));
                              setDetailModalOpen(true);
                            } catch (error) {
                              console.error("Failed to fetch order details:", error);
                            }
                          }}
                        >
                          <Maximize2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-6 text-sm flex-wrap gap-3">
        {/* LEFT TEXT */}
        <div className="text-gray-500">
          Showing {totalItems === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to{" "}
          {Math.min(page * PAGE_SIZE, totalItems)} of {totalItems} results
        </div>

        {/* RIGHT PAGINATION */}
        <div className="flex items-center gap-2 flex-wrap">
          {(() => {
            const visiblePages = 3;

            return (
              <>
                {[...Array(Math.min(visiblePages, totalPages))].map((_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`
                        w-10 h-10 flex items-center justify-center
                        rounded text-sm transition text-[15px]
                        ${
                          page === pageNumber
                            ? "bg-[#C1E6BA] text-[#023337] font-bold"
                            : "text-[#023337] hover:bg-gray-100 border border-[#D1D5DB] font-medium"
                        }
                      `}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {totalPages > visiblePages && (
                  <span className="w-10 h-10 flex items-center justify-center rounded border border-[#D1D5DB] text-[#023337] text-[15px] font-bold">
                    ....
                  </span>
                )}

                {totalPages > visiblePages && (
                  <button
                    onClick={() => setPage(totalPages)}
                    className="px-4 h-10 flex items-center rounded border border-[#D1D5DB] text-[#023337] text-[15px] font-medium"
                  >
                    Last page
                  </button>
                )}
              </>
            );
          })()}
        </div>
      </div>

      {editModalOpen && selectedOrder && (
        <EditStatusModal
          orderId={selectedOrder.id}
          currentStatus={selectedOrder.status}
          onSave={async (status) => {
            try {
              await updateOrderStatus(selectedOrder.id, status);
              setOrdersData((prev) =>
                prev.map((order) =>
                  order.id === selectedOrder.id ? { ...order, status } : order,
                ),
              );
              setEditModalOpen(false);
            } catch (error) {
              console.error("Failed to update order status:", error);
            }
          }}
          onCancel={() => setEditModalOpen(false)}
        />
      )}

      {detailModalOpen && selectedDetailOrder && (
        <OrderModal
          order={selectedDetailOrder}
          onClose={() => setDetailModalOpen(false)}
        />
      )}
    </div>
  );
}