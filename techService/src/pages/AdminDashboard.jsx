import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Search,
  Phone,
  CalendarDays,
  RefreshCw,
  Users,
  Clock3,
  LoaderCircle,
  MessageCircle,
  Bell,
  X,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newBooking, setNewBooking] = useState(null);
const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("adminToken");
  navigate("/admin/login");
};
  // Stores the previous bookings
  const previousBookings = useRef([]);

  // =====================================
  // Fetch bookings
  // =====================================
 const fetchBookings = async () => {
  try {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/bookings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.status === 401) {
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
      return;
    }

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to load bookings"
      );
    }

    setBookings(data.bookings || []);
  } catch (error) {
    console.error("Bookings error:", error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
  // =====================================
  // Browser notification permission
  // =====================================
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // =====================================
  // Initial booking load
  // =====================================
  useEffect(() => {
    fetchBookings();
  }, []);

  // =====================================
  // Show new booking notification
  // =====================================
  const showNewBookingNotification = (booking) => {
    setNewBooking(booking);

    // Browser notification
    if (
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      new Notification("🔔 New TechCare Booking", {
        body: `${booking.name} booked ${booking.service}`,
      });
    }

    // Notification sound
    const audio = new Audio("/notification.mp3");

    audio.play().catch(() => {
      console.log(
        "Notification sound could not be played."
      );
    });

    // Hide banner after 8 seconds
    setTimeout(() => {
      setNewBooking(null);
    }, 8000);
  };

  // =====================================
  // Check for new bookings every 10 seconds
  // =====================================
  useEffect(() => {
    const checkForNewBookings = async () => {
      try {
        const response = await fetch(
fetch(`${import.meta.env.VITE_API_URL}/api/bookings`)        );

        const contentType =
          response.headers.get("content-type") || "";

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("adminToken");
            navigate("/admin/login");
          }
          return;
        }

        if (!contentType.includes("application/json")) {
          console.error("Booking API returned a non-JSON response.");
          return;
        }

        const data = await response.json();

        const latestBookings = data.bookings || [];

        const previousIds = previousBookings.current.map(
          (booking) => booking._id
        );

        const newBooking = latestBookings.find(
          (booking) =>
            !previousIds.includes(booking._id)
        );

        // Don't notify on first page load
        if (
          previousBookings.current.length > 0 &&
          newBooking
        ) {
          showNewBookingNotification(newBooking);
        }

        previousBookings.current = latestBookings;

        setBookings(latestBookings);
      } catch (error) {
        console.error(
          "Booking notification check failed:",
          error
        );
      }
    };

    // First snapshot
    checkForNewBookings();

    // Check every 10 seconds
    const interval = setInterval(
      checkForNewBookings,
      10000
    );

    return () => clearInterval(interval);
  }, []);

  // =====================================
  // Update booking status
  // =====================================
  const updateStatus = async (
    bookingId,
    status
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update status"
        );
      }

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? data.booking
            : booking
        )
      );

      // Keep previousBookings in sync
      previousBookings.current =
        previousBookings.current.map(
          (booking) =>
            booking._id === bookingId
              ? data.booking
              : booking
        );
    } catch (error) {
      console.error(
        "Update status error:",
        error
      );

      alert(
        "Unable to update booking status."
      );
    }
  };

  // =====================================
  // WhatsApp completion message
  // =====================================
  const sendCompletionWhatsApp = (booking) => {
    const whatsappNumber =
      booking.phone.replace(/\D/g, "");

    const message = `
Hello ${booking.name},

✅ Your service has been completed successfully.

Booking ID: ${booking.bookingId}
Service: ${booking.service}
Service Date: ${booking.date}

Thank you for choosing TechCare.

If you need any further assistance, please contact us.

- TechCare
`;

    const whatsappUrl =
      `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      whatsappUrl,
      "_blank"
    );
  };

  // =====================================
  // Search
  // =====================================
  const filteredBookings =
    bookings.filter((booking) => {
      const searchText =
        search.toLowerCase();

      return (
        booking.name
          ?.toLowerCase()
          .includes(searchText) ||
        booking.phone
          ?.includes(searchText) ||
        booking.service
          ?.toLowerCase()
          .includes(searchText) ||
        booking.bookingId
          ?.toLowerCase()
          .includes(searchText)
      );
    });

  // =====================================
  // Status counts
  // =====================================
  const pendingCount =
    bookings.filter(
      (booking) =>
        booking.status === "Pending"
    ).length;

  const assignedCount =
    bookings.filter(
      (booking) =>
        booking.status === "Assigned"
    ).length;

  const progressCount =
    bookings.filter(
      (booking) =>
        booking.status === "In Progress"
    ).length;

  const completedCount =
    bookings.filter(
      (booking) =>
        booking.status === "Completed"
    ).length;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* =====================================
          HEADER
      ====================================== */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              TechCare Admin
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Service booking management
            </p>
          </div>


          <button
            onClick={fetchBookings}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
          <button
  onClick={logout}
  className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
>
  <LogOut size={17} />
  Logout
</button>

        </div>
      </header>

      {/* =====================================
          MAIN
      ====================================== */}
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">

        {/* =====================================
            NEW BOOKING NOTIFICATION
        ====================================== */}
        {newBooking && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm">

            <div className="flex gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <Bell size={20} />
              </div>

              <div>
                <p className="font-bold text-blue-900">
                  New Booking Received
                </p>

                <p className="mt-1 text-sm text-blue-800">
                  <strong>
                    {newBooking.name}
                  </strong>{" "}
                  booked{" "}
                  <strong>
                    {newBooking.service}
                  </strong>
                </p>

                <p className="mt-1 text-xs text-blue-700">
                  Booking ID:{" "}
                  {newBooking.bookingId}
                </p>
              </div>

            </div>

            <button
              onClick={() =>
                setNewBooking(null)
              }
              className="text-blue-600 hover:text-blue-800"
            >
              <X size={18} />
            </button>

          </div>
        )}

        {/* =====================================
            STATS
        ====================================== */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

          <StatCard
            title="Total Bookings"
            value={bookings.length}
            icon={<Users size={20} />}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />

          <StatCard
            title="Pending"
            value={pendingCount}
            icon={<Clock3 size={20} />}
            iconBg="bg-yellow-100"
            iconColor="text-yellow-600"
          />

          <StatCard
            title="Assigned"
            value={assignedCount}
            icon={<Users size={20} />}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
          />

          <StatCard
            title="In Progress"
            value={progressCount}
            icon={<RefreshCw size={20} />}
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
          />

          <StatCard
            title="Completed"
            value={completedCount}
            icon={<Users size={20} />}
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />

        </div>

        {/* =====================================
            SEARCH
        ====================================== */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">

          <div className="relative max-w-md">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search customer, phone, service..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

        </div>

        {/* =====================================
            LOADING
        ====================================== */}
        {loading && (
          <div className="flex items-center justify-center py-20 text-slate-500">

            <LoaderCircle
              size={22}
              className="mr-2 animate-spin"
            />

            Loading bookings...

          </div>
        )}

        {/* =====================================
            ERROR
        ====================================== */}
        {!loading && error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
          </div>
        )}

        {/* =====================================
            TABLE
        ====================================== */}
        {!loading && !error && (
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">

            <div className="overflow-x-auto">

              <table className="min-w-[1100px] w-full text-left">

                <thead className="border-b bg-slate-50">

                  <tr>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Booking
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Service
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Date
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredBookings.map(
                    (booking) => (

                      <tr
                        key={booking._id}
                        className="hover:bg-slate-50"
                      >

                        {/* Booking */}
                        <td className="px-5 py-4">

                          <span className="font-semibold text-blue-600">
                            {booking.bookingId}
                          </span>

                          <p className="mt-1 text-xs text-slate-400">
                            {booking.address}
                          </p>

                        </td>

                        {/* Customer */}
                        <td className="px-5 py-4">

                          <p className="font-semibold text-slate-800">
                            {booking.name}
                          </p>

                          <a
                            href={`tel:${booking.phone}`}
                            className="mt-1 flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600"
                          >
                            <Phone size={14} />
                            {booking.phone}
                          </a>

                        </td>

                        {/* Service */}
                        <td className="px-5 py-4 text-sm text-slate-700">
                          {booking.service}
                        </td>

                        {/* Date */}
                        <td className="px-5 py-4">

                          <div className="flex items-center gap-2 text-sm text-slate-600">

                            <CalendarDays
                              size={16}
                            />

                            {booking.date}

                          </div>

                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">

                          <StatusBadge
                            status={
                              booking.status
                            }
                          />

                        </td>

                        {/* Action */}
                        <td className="px-5 py-4">

                          <div className="flex flex-wrap items-center gap-2">

                            <select
                              value={
                                booking.status
                              }
                              onChange={(e) =>
                                updateStatus(
                                  booking._id,
                                  e.target.value
                                )
                              }
                              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >

                              <option value="Pending">
                                Pending
                              </option>

                              <option value="Assigned">
                                Assigned
                              </option>

                              <option value="In Progress">
                                In Progress
                              </option>

                              <option value="Completed">
                                Completed
                              </option>

                            </select>

                            {booking.status ===
                              "Completed" && (
                              <button
                                type="button"
                                onClick={() =>
                                  sendCompletionWhatsApp(
                                    booking
                                  )
                                }
                                className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700"
                              >
                                <MessageCircle
                                  size={15}
                                />

                                WhatsApp
                              </button>
                            )}

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

              {filteredBookings.length === 0 && (
                <div className="p-12 text-center text-slate-500">
                  No bookings found.
                </div>
              )}

            </div>

          </div>
        )}

      </main>
    </div>
  );
};


// =====================================
// Stats Card
// =====================================
const StatCard = ({
  title,
  value,
  icon,
  iconBg,
  iconColor,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>

        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};


// =====================================
// Status Badge
// =====================================
const StatusBadge = ({ status }) => {

  const styles = {
    Pending:
      "bg-yellow-100 text-yellow-700",

    Assigned:
      "bg-purple-100 text-purple-700",

    "In Progress":
      "bg-orange-100 text-orange-700",

    Completed:
      "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ||
        "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
};

export default AdminDashboard;